import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';

export const Container = styled.View``;

export const CardImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;
  justify-content: center;
  align-items: center;
`;

export const CardImage = styled.Image`
  width: 280px;
  height: 132px;
`;

export const CardSlider = styled(FlatList as new () => FlatList<string>).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false
})``;

export const BulletWrapper = styled.View`
  margin-right: 24px;
`;
