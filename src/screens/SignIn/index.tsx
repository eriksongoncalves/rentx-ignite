import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { useAuth } from '../../hooks/auth';

function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      await schemaValidation.validate(
        { email, password },
        { abortEarly: false }
      );

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.errors[0]);
      }

      Alert.alert('Erro na autenticação', error.message);
    }
  }

  function handleNavigateSignUp() {
    navigation.navigate('SignUpFirstStep');
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
              onPress={handleNavigateSignUp}
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
