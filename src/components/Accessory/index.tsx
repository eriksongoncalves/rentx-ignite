import React from 'react';
import { useTheme } from 'styled-components';

import * as S from './styles';
import { SvgProps } from 'react-native-svg';

type AccessoryProps = {
  name: string;
  icon: React.FC<SvgProps>;
};

function Accessory({ name, icon: Icon }: AccessoryProps) {
  const theme = useTheme();

  return (
    <S.Container>
      <Icon width={32} height={32} fill={theme.colors.header} />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
}

export default Accessory;
