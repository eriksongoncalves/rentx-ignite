import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { ICarDTO } from '../../dtos/CarDTO';
import { CardCar, LoadingCar } from '../../components';

function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api
      .get<ICarDTO[]>('/cars')
      .then(response => {
        if (isMounted) {
          setCars(response.data);
        }
      })
      .catch(() => {
        Alert.alert('Ocorreu um erro ao carregar a lista de carros');
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function handleCarDetail(car: ICarDTO) {
    navigation.navigate('Detail', { car });
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <S.TotalCar>Total de {cars.length} carros</S.TotalCar>}
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <LoadingCar />
      ) : (
        <S.CardList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardCar data={item} onPress={() => handleCarDetail(item)} />
          )}
        />
      )}
    </S.Container>
  );
}

export default Home;
