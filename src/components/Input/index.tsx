import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import * as S from './styles';

type InputProps = {
  iconName: React.ComponentProps<typeof Feather>['name'];
  isPasswordInput?: boolean;
  value?: string;
} & TextInputProps;

function Input({
  iconName,
  isPasswordInput = false,
  value,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleVisiblePassword() {
    setIsPasswordVisible(oldValue => !oldValue);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <S.Container>
      <S.IconContainer isFocused={isFocused || isFilled}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </S.IconContainer>
      <S.InputText
        {...rest}
        secureTextEntry={isPasswordInput && isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused || isFilled}
      />

      {isPasswordInput && (
        <BorderlessButton onPress={handleVisiblePassword}>
          <S.IconContainer isFocused={isFocused || isFilled}>
            <Feather
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text_detail}
            />
          </S.IconContainer>
        </BorderlessButton>
      )}
    </S.Container>
  );
}

export default Input;
