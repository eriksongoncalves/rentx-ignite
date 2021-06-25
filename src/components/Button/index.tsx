import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';

import * as S from './styles';

type ButtonProps = {
  title: string;
  color?: string;
  loading?: boolean;
} & RectButtonProps;

function Button({ color, title, loading, ...rest }: ButtonProps) {
  return (
    <S.Container {...rest} color={color}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <S.Title>{title}</S.Title>
      )}
    </S.Container>
  );
}

export default Button;
