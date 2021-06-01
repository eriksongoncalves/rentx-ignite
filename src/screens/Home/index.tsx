import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { CardCar } from '../../components';

import * as S from './styles';

function Home() {
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
          <S.TotalCar>Total de 12 carros</S.TotalCar>
        </S.HeaderContent>
      </S.Header>

      <S.CardList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={item => String(item)}
        renderItem={() => (
          <CardCar
            data={{
              brand: 'Audi',
              name: 'RS 5 Coupé',
              rent: { period: 'Ao dia', price: 120 },
              thumbnail:
                'https://e7.pngegg.com/pngimages/889/380/png-clipart-audi-sportback-concept-car-audi-a3-2018-audi-a5-coupe-audi-compact-car-sedan.png'
            }}
          />
        )}
      />
    </S.Container>
  );
}

export default Home;
