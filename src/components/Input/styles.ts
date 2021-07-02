import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css, DefaultTheme } from 'styled-components/native';
import { TextInput } from 'react-native';

type FocusedProps = {
  isFocused: boolean;
};

const focusModifiers = {
  focused: (theme: DefaultTheme) => css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `
};

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<FocusedProps>`
  ${({ theme, isFocused }) => css`
    height: 56px;
    width: 56px;
    justify-content: center;
    align-items: center;
    margin-right: 2px;
    background-color: ${theme.colors.background_secundary};

    ${isFocused && focusModifiers.focused(theme)}
  `}
`;

export const InputText = styled(TextInput)<FocusedProps>`
  ${({ theme, isFocused }) => css`
    flex: 1;
    background-color: ${theme.colors.background_secundary};
    color: ${theme.colors.text};
    font-family: ${theme.fonts.family.inter.regular};
    font-size: ${RFValue(15)}px;
    padding: 0 23px;

    ${isFocused && focusModifiers.focused(theme)}
  `}
`;
