import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  ${({ theme }) => css`
    width: 80px;
    height: 56px;
    background-color: ${theme.colors.shape_dark};
    align-items: center;
    justify-content: center;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.medium};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.shape};
  `}
`;
