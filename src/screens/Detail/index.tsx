import React from 'react';
import { BackButton, ImageSlider, Accessory, Button } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ICarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import * as S from './styles';

type RouteParams = {
  car: ICarDTO;
};

function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { car } = route.params as RouteParams;

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirm() {
    navigation.navigate('Scheduling');
  }

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

        <S.About>{car.about}</S.About>
      </S.Content>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
}

export default Detail;
