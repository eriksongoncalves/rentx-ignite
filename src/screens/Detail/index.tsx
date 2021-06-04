import React from 'react';
import { BackButton, ImageSlider, Accessory, Button } from '../../components';
import { useNavigation } from '@react-navigation/native';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import * as S from './styles';

function Detail() {
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('Scheduling');
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton color="dark" onPress={() => {}} />
      </S.Header>

      <S.CardImages>
        <ImageSlider
          imagesUrl={[
            'https://e7.pngegg.com/pngimages/889/380/png-clipart-audi-sportback-concept-car-audi-a3-2018-audi-a5-coupe-audi-compact-car-sedan.png',
            'https://e7.pngegg.com/pngimages/889/380/png-clipart-audi-sportback-concept-car-audi-a3-2018-audi-a5-coupe-audi-compact-car-sedan.png'
          ]}
        />
      </S.CardImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>
          <S.Rent>
            <S.Period>Ao dia</S.Period>
            <S.Price>R$ 580,00</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 Pessoas" icon={peopleSvg} />
        </S.Accessories>

        <S.About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
}

export default Detail;
