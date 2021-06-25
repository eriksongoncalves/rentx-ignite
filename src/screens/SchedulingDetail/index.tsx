import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import * as S from './styles';
import { ICarDTO } from '../../dtos/CarDTO';
import { BackButton, ImageSlider, Accessory, Button } from '../../components';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';

type RentalPeriod = {
  start: string;
  end: string;
};

type RouteParams = {
  car: ICarDTO;
  dates: string[];
};

function SchedulingDetail() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as RouteParams;

  const rentTotal = useMemo(
    () => Number(dates.length * car.rent.price),
    [car, dates]
  );

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRental() {
    try {
      setLoading(true);
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates
      ];

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      });

      navigation.navigate('SchedulingComplete');
    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      )
    });
  }, [dates]);

  return (
    <S.Container>
      <S.Header>
        <BackButton color="dark" onPress={handleBack} />
      </S.Header>

      <S.CardImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CardImages>

      <S.Content>
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

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </S.CalendarIcon>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              R$ {car.rent.price} x{dates.length} diárias
            </S.RentalPriceQuota>
            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  );
}

export default SchedulingDetail;
