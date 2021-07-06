import { FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { DataProps } from '.';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    align-items: center;
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 325px;
    background-color: ${theme.colors.header};
    justify-content: center;
    padding: 25px;
    padding-top: ${getStatusBarHeight() + 30}px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.semibold};
    font-size: ${RFValue(30)}px;
    color: ${theme.colors.shape};
    margin-top: 24px;
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.regular};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.shape};
    margin-top: 24px;
  `}
`;

export const Content = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

export const AppointmentTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.regular};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.text};
  `}
`;

export const AppointmentQuantity = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.medium};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.title};
  `}
`;

export const CardList = styled(FlatList as new () => FlatList<DataProps>).attrs(
  {
    showsVerticalScrollIndicator: false
  }
)``;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding: 12px;
    margin-top: -10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors.background_secundary};
  `}
`;

export const CarFooterTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.medium};
    font-size: ${RFValue(10)}px;
    color: ${theme.colors.text_detail};
  `}
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.regular};
    font-size: ${RFValue(13)}px;
    color: ${theme.colors.title};
  `}
`;
