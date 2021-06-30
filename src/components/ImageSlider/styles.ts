import styled, { css } from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';

type ImageIndexProps = {
  active?: boolean;
};

export const Container = styled.View``;

export const ImageIndexs = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  ${({ theme, active }) => css`
    width: 6px;
    height: 6px;
    background-color: ${theme.colors.shape};
    margin-left: 8px;
    border-radius: 4px;

    ${active &&
    css`
      background-color: ${theme.colors.title};
    `}
  `}
`;

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
