import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

type ConfirmButtonProps = {
  title: string;
} & RectButtonProps;

function ConfirmButton({ title, ...rest }: ConfirmButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}

export default ConfirmButton;
