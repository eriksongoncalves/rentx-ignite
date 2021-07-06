import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';

import * as S from './styles';
import { Car as ModelCar } from '../../database/models/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

type CardCarProps = {
  data: ModelCar;
} & RectButtonProps;

function CardCar({ data, ...rest }: CardCarProps) {
  const netInfo = useNetInfo();
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <S.Container {...rest}>
      <S.Detail>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.period}</S.Period>
            <S.Price>R$ {netInfo.isConnected ? data.price : '...'}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>
      </S.Detail>

      {/* <FastImage
        style={{ width: 200, height: 200 }}
        source={{
            uri: 'https://unsplash.it/400/400?image=1',
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
    /> */}

      <S.CarImage
        source={{
          uri: data.thumbnail
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </S.Container>
  );
}

export default CardCar;
