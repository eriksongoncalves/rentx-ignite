import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

import { PhotoProps } from '.';

export const Container = styled.View``;

export const CardImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;
  justify-content: center;
  align-items: center;
`;

export const CardImage = styled(FastImage)`
  width: 280px;
  height: 132px;
`;

export const CardSlider = styled(
  FlatList as new () => FlatList<PhotoProps>
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``;

export const BulletWrapper = styled.View`
  margin-right: 24px;
`;
