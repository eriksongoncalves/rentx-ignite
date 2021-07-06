import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import * as S from './styles';
import api from '../../services/api';
import { BackButton, CardCar, Loading } from '../../components';
import { Car as ModelCar } from '../../database/models/Car';

export type DataProps = {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
};

function MyCars() {
  const navigation = useNavigation();
  const screenIsFocus = useIsFocused();
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    api
      .get<DataProps[]>('/rentals')
      .then(response => {
        const dataFormatted = response.data.map(data => ({
          ...data,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
        }));

        setCars(dataFormatted);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        Alert.alert('Ocorreu um erro ao carregar os dados');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [screenIsFocus]);

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
                    <S.CarFooterDate>{item.start_date}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color="#aeaeb3"
                      style={{ marginHorizontal: 11 }}
                    />
                    <S.CarFooterDate>{item.end_date}</S.CarFooterDate>
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
