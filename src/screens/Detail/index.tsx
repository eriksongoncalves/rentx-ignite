import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';

import * as S from './styles';
import { BackButton, ImageSlider, Accessory, Button } from '../../components';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/models/Car';
import { ICarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

type RouteParams = {
  car: ModelCar;
};

function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();
  const { car } = route.params as RouteParams;
  const netInfo = useNetInfo();

  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP)
  }));

  const sliderCarAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0])
  }));

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirm() {
    if (netInfo.isConnected) {
      navigation.navigate('Scheduling', {
        car
      });
    } else {
      Alert.alert(
        'Sem conexão',
        'Você precisar estar conectado a internet para realizar um agendamento.'
      );
    }
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      try {
        const response = await api.get(`/cars/${car.id}`);

        setCarUpdated(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('ERROR fetchCarUpdated - ', error);
      }
    }

    if (netInfo.isConnected) {
      fetchCarUpdated();
    }
  }, [car.id, netInfo.isConnected]);

  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <S.Header>
        <BackButton color="dark" onPress={handleBack} />
      </S.Header>

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secundary }
        ]}
      >
        <Animated.View style={[sliderCarAnimation]}>
          <S.CardImages>
            <ImageSlider
              imagesUrl={
                carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </S.CardImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>
          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {netInfo.isConnected ? car.price : '...'}</S.Price>
          </S.Rent>
        </S.Details>

        {carUpdated.accessories && (
          <S.Accessories>
            {carUpdated.accessories.map(item => (
              <Accessory
                key={item.type}
                name={item.name}
                icon={getAccessoryIcon(item.type)}
              />
            ))}
          </S.Accessories>
        )}

        <S.About>{car.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
        {netInfo.isConnected && (
          <S.OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden'
  }
});

export default Detail;
