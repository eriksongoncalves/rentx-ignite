import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    width: 100%;
    height: ${RFValue(126)}px;
    background-color: ${theme.colors.background_secundary};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${RFValue(24)}px;
    margin-bottom: ${RFValue(16)}px;
  `}
`;

export const Detail = styled.View``;

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
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.title};
  `}
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${RFValue(16)}px;
`;

export const Rent = styled.View`
  margin-right: ${RFValue(24)}px;
`;

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
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.main};
    text-transform: uppercase;
  `}
`;

export const Type = styled.View``;

export const CarImage = styled(FastImage)`
  width: 167px;
  height: 85px;
`;
