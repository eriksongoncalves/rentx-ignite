import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    padding: 0 24px;
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 25}px;
  margin-bottom: 35px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.semibold};
    font-size: ${RFValue(40)}px;
    color: ${theme.colors.title};
  `}
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.regular};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.text};
    line-height: ${RFValue(25)}px;
    margin-top: 16px;
  `}
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0 8px;
`;

export const FormTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.semibold};
    font-size: ${RFValue(20)}px;
    color: ${theme.colors.title};
    margin-bottom: 24px;
  `}
`;
