import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

type OptionProps = {
  active: boolean;
};

export const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.background_primary};
  `}
`;

export const Header = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 227px;
    background-color: ${theme.colors.header};
    padding: 0 24px;
    align-items: center;
  `}
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(25)}px;
    font-family: ${theme.fonts.family.archivo.semibold};
    color: ${theme.colors.background_secundary};
  `}
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  ${({ theme }) => css`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    background-color: ${theme.colors.shape};
    margin-top: 48px;
  `}
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  ${({ theme }) => css`
    width: 40px;
    height: 40px;
    background-color: ${theme.colors.main};
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 10px;
    right: 10px;
  `}
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  ${({ theme }) => css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.line}
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 24px;
  `}
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  ${({ theme, active }) => css`
    padding: 14px;

    ${active &&
    css`
      border-bottom-width: 3px;
      border-bottom-color: ${theme.colors.main};
    `}
  `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  ${({ theme, active }) => css`
    font-size: ${RFValue(20)}px;
    font-family: ${theme.fonts.family.archivo.medium};
    color: ${theme.colors.text_detail};

    ${active &&
    css`
      font-family: ${theme.fonts.family.archivo.semibold};
      color: ${theme.colors.header};
    `}
  `}
`;

export const Section = styled.View``;
