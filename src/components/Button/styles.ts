import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

type ContainerProps = {
  color?: string;
};

export const Container = styled(RectButton)<ContainerProps>`
  ${({ theme, color }) => css`
    width: 100%;

    padding: 19px;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.main};

    ${!!color &&
    css`
      background-color: ${color};
    `}
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.family.inter.medium};
    font-size: ${RFValue(15)}px;
    color: ${theme.colors.shape};
  `}
`;
