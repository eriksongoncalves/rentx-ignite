import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    width: 109px;
    height: 92px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.background_primary};
    padding: 16px;
    margin-bottom: 8px;
  `}
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.medium};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.text};
    margin-top: 2px;
  `}
`;
