import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
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

import * as S from './styles';
import { BackButton, ImageSlider, Accessory, Button } from '../../components';
import { ICarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

type RouteParams = {
  car: ICarDTO;
};

function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();
  const { car } = route.params as RouteParams;
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
    navigation.navigate('Scheduling', {
      car
    });
  }

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
            <ImageSlider imagesUrl={car.photos} />
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
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories.map(item => (
            <Accessory
              key={item.type}
              name={item.name}
              icon={getAccessoryIcon(item.type)}
            />
          ))}
        </S.Accessories>

        <S.About>{car.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden'
  }
});

export default Detail;
