import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

import GasolineSvg from '../../assets/gasoline.svg';
import { ICarDTO } from '../../dtos/CarDTO';

type CardCarProps = {
  data: ICarDTO;
} & RectButtonProps;

function CardCar({ data, ...rest }: CardCarProps) {
  return (
    <S.Container {...rest}>
      <S.Detail>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>R$ {data.rent.price}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSvg />
          </S.Type>
        </S.About>
      </S.Detail>

      <S.CarImage
        source={{
          uri: data.thumbnail
        }}
        resizeMode="contain"
      />
    </S.Container>
  );
}

export default CardCar;
