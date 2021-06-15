import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import * as S from './styles';
import { BackButton, Button } from '../../components';
import Calendar, {
  DayProps,
  MarkedDatesProps
} from '../../components/Calendar';
import { generateInterval } from '../../components/Calendar/generateInterval';
import ArrowSvg from '../../assets/arrow.svg';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { ICarDTO } from '../../dtos/CarDTO';

type RentalPeriodProps = {
  startFormatted: string;
  endFormatted: string;
};

type RouteParams = {
  car: ICarDTO;
};

function Scheduling() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirm() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o intervalo para alugar');
    } else {
      navigation.navigate('SchedulingDetail', {
        car,
        dates: Object.keys(markedDates)
      });
    }
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    });
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <S.Header>
        <BackButton onPress={handleBack} />

        <S.Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.startFormatted}</S.DateValue>
          </S.DateInfo>
          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.endFormatted}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
}

export default Scheduling;
