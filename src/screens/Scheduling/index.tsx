import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import { BackButton, Button, Calendar } from '../../components';
import ArrowSvg from '../../assets/arrow.svg';

function Scheduling() {
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('SchedulingDetail');
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <S.Header>
        <BackButton onPress={() => {}} />

        <S.Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue></S.DateValue>
          </S.DateInfo>
          <ArrowSvg />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
}

export default Scheduling;
