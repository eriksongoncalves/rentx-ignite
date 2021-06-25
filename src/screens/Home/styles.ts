import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from 'react-native';

import { ICarDTO } from '../../dtos/CarDTO';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 113px;
    background-color: ${theme.colors.header};
    justify-content: flex-end;
    padding: 32px 24px;
  `}
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCar = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(15)}px;
    font-family: ${theme.fonts.family.inter.regular};
    color: ${theme.colors.text};
  `}
`;

export const CardList = styled(FlatList as new () => FlatList<ICarDTO>).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showsVerticalScrollIndicator: false
})``;

export const MyCarsButton = styled(RectButton)`
  ${({ theme }) => css`
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 22px;
    right: 22px;
    background-color: ${theme.colors.main};
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  `}
`;
