import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as S from './styles';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components';

type RouteParams = {
  title: string;
  message?: string;
  nextScreenRoute: string;
};

function Confirmation() {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation();
  const { title, message, nextScreenRoute } = route.params as RouteParams;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <S.Container>
      <LogoSvg width={width} />
      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>{title}</S.Title>
        {!!message && <S.Message>{message}</S.Message>}
      </S.Content>
      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
}

export default Confirmation;
