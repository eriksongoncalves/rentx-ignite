import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

type BackButtonProps = {
  color?: 'light' | 'dark';
} & BorderlessButtonProps;

function BackButton({ color = 'light', ...rest }: BackButtonProps) {
  const theme = useTheme();
  const themeColor = color === 'light' ? 'background_secundary' : 'text';

  return (
    <S.Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={theme.colors[themeColor]}
      />
    </S.Container>
  );
}

export default BackButton;
