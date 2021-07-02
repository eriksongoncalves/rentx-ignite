import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';
import LogoSvg from '../../../assets/logo_background_gray.svg';
import DoneSvg from '../../../assets/done.svg';
import { ConfirmButton } from '../../../components';

function SignUpComplete() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('SignIn');
  }

  return (
    <S.Container>
      <LogoSvg width={width} />
      <S.Content>
        <DoneSvg width={80} height={80} />
        <S.Title>Conta criada!</S.Title>
      </S.Content>
      <S.Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </S.Footer>
    </S.Container>
  );
}

export default SignUpComplete;
