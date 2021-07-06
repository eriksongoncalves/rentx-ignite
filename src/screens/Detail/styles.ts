import styled, { css } from 'styled-components/native';
import {
  getStatusBarHeight,
  getBottomSpace
} from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.background_secundary};
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
  z-index: 2;
`;

export const CardImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Details = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 38px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.medium};
    font-size: ${RFValue(10)}px;
    color: ${theme.colors.text_detail};
    text-transform: uppercase;
  `}
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.medium};
    font-size: ${RFValue(25)}px;
    color: ${theme.colors.title};
  `}
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.medium};
    font-size: ${RFValue(10)}px;
    color: ${theme.colors.text_detail};
    text-transform: uppercase;
  `}
`;

export const Price = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.archivo.medium};
    font-size: ${RFValue(25)}px;
    color: ${theme.colors.main};
  `}
`;

export const About = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.regular};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.text_detail};
    text-align: justify;
    margin-top: 23px;
    line-height: 25px;
  `}
`;

export const Accessories = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const Footer = styled.View`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.colors.background_secundary};
    padding: 24px 24px ${getBottomSpace() + 24}px;
  `}
`;

export const OfflineInfo = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.regular};
    font-size: ${RFValue(10)}px;
    color: ${theme.colors.main};
    text-align: center;
  `}
`;
