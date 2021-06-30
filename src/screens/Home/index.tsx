import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import * as S from './styles';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { ICarDTO } from '../../dtos/CarDTO';
import { CardCar, Loading } from '../../components';

function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<ICarDTO[]>('/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleCarDetail(car: ICarDTO) {
    navigation.navigate('Detail', { car });
  }

  function handleMyCars() {
    navigation.navigate('MyCars');
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
          <S.TotalCar>Total de {cars.length} carros</S.TotalCar>
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <Loading />
      ) : (
        <S.CardList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardCar data={item} onPress={() => handleCarDetail(item)} />
          )}
        />
      )}

      <S.MyCarsButton onPress={handleMyCars}>
        <Ionicons name="ios-car-sport" size={32} color="#fff" />
      </S.MyCarsButton>
    </S.Container>
  );
}

export default Home;
