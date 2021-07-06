import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';

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
  const netInfo = useNetInfo();
  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as RouteParams;

  const rentTotal = useMemo(
    () => Number(dates.length * car.price),
    [car, dates]
  );

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRental() {
    if (netInfo.isConnected) {
      try {
        setLoading(true);

        await api.post('/rentals', {
          user_id: 1,
          car_id: car.id,
          start_date: new Date(dates[0]),
          end_date: new Date(dates[dates.length - 1]),
          total: rentTotal
        });

        navigation.navigate('Confirmation', {
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel`,
          nextScreenRoute: 'Home'
        });

        navigation.navigate('SchedulingComplete');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('ERROR - handleConfirmRental', error);
        Alert.alert('Não foi possível confirmar o agendamento');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert(
        'Sem conexão',
        'Você precisar estar conectado a internet para realizar um agendamento.'
      );
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
      <S.Header>
        <BackButton color="dark" onPress={handleBack} />
      </S.Header>

      <S.CardImages>
        <ImageSlider
          imagesUrl={
            carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </S.CardImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>
          <S.Rent>
            <S.Period>{car.period}</S.Period>
            <S.Price>R$ {car.price}</S.Price>
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
              R$ {car.price} x{dates.length} diárias
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
        {netInfo.isConnected && (
          <S.OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </S.OfflineInfo>
        )}
      </S.Footer>
    </S.Container>
  );
}

export default SchedulingDetail;
