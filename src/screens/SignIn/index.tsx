import React, { useState } from 'react';
import { Alert } from 'react-native';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';

import { schemaValidation, Yup } from './schemaValidation';
import { Button, Input } from '../../components';

function SignIn() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      await schemaValidation.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.message);
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer o login, verifique as credenciais'
      );
    }
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
            <S.Title>
              Estamos{'\n'}
              quase lá
            </S.Title>
            <S.Subtitle>
              Faça seu login para começar{'\n'}
              uma experiência incrivel
            </S.Subtitle>
          </S.Header>

          <S.Form>
            <Input
              placeholder="E-mail"
              iconName="mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              iconName="lock"
              autoCorrect={false}
              autoCapitalize="none"
              isPasswordInput
              value={password}
              onChangeText={setPassword}
            />
          </S.Form>

          <S.Footer>
            <Button title="Login" onPress={handleSignIn} loading={false} />
            <Button
              title="Criar conta gratuita"
              onPress={() => {}}
              color={theme.colors.background_secundary}
              loading={false}
              light
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export default SignIn;
