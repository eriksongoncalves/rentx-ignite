import React from 'react';

import * as S from './styles';

import GasolineSvg from '../../assets/gasoline.svg';

type CarData = {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
};

type CardCarProps = {
  data: CarData;
};

function CardCar({ data }: CardCarProps) {
  return (
    <S.Container>
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
