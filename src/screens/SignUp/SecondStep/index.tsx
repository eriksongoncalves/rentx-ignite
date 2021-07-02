import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import * as S from './styles';

import { schemaValidation, Yup } from './schemaValidation';
import { Button, Input, Bullet, BackButton } from '../../../components';

function SignUpSecondStep() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit() {
    try {
      await schemaValidation.validate(
        { password, confirmPassword },
        { abortEarly: false }
      );

      navigation.navigate('SignUpComplete');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.errors[0]);
      }
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
          />

          <S.Header>
            <BackButton color="dark" onPress={handleBack} />

            <Bullet qtdItems={2} currentItem={1} />
          </S.Header>

          <S.Form>
            <S.FormTitle>02. Senha</S.FormTitle>

            <Input
              placeholder="Senha"
              iconName="lock"
              autoCorrect={false}
              autoCapitalize="none"
              isPasswordInput
              value={password}
              onChangeText={setPassword}
            />

            <Input
              placeholder="Repetir senha"
              iconName="lock"
              autoCorrect={false}
              autoCapitalize="none"
              isPasswordInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </S.Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleSubmit}
            loading={false}
          />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export default SignUpSecondStep;
