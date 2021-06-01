import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

type ButtonProps = {
  title: string;
  color?: string;
} & RectButtonProps;

function BackButton({ color, title, ...rest }: ButtonProps) {
  return (
    <S.Container {...rest} color={color}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}

export default BackButton;
