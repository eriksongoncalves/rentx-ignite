import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import * as S from './styles';
import { ICarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { BackButton, CardCar, Loading } from '../../components';

export type CarProps = {
  car: ICarDTO;
  user_id: string;
  id: string;
  startDate: string;
  endDate: string;
};

function MyCars() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    api
      .get('/schedules_byuser?user_id=1')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        Alert.alert('Ocorreu um erro ao carregar os dados');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <S.Header>
        <BackButton onPress={handleBack} />

        <S.Title>Seus agendamentos, estão aqui.</S.Title>
        <S.Subtitle>Conforto, segurança e praticidade.</S.Subtitle>
      </S.Header>

      {loading ? (
        <Loading />
      ) : (
        <S.Content>
          <S.Appointments>
            <S.AppointmentTitle>Agendamentos feitos</S.AppointmentTitle>
            <S.AppointmentQuantity>
              {cars.length.toString().padStart(2, '0')}
            </S.AppointmentQuantity>
          </S.Appointments>

          <S.CardList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <CardCar data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>PERÍODO</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color="#aeaeb3"
                      style={{ marginHorizontal: 11 }}
                    />
                    <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      )}
    </S.Container>
  );
}

export default MyCars;
