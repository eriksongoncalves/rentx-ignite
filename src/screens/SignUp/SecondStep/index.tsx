import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import api from '../../../services/api';

type RouteParams = {
  user: {
    name: string;
    email: string;
    driver_license: string;
  };
};

function SignUpSecondStep() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const theme = useTheme();

  const { user } = params as RouteParams;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit() {
    try {
      await schemaValidation.validate(
        { password, confirmPassword },
        { abortEarly: false }
      );

      await api.post('/users', {
        ...user,
        password
      });

      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: 'Agora é só fazer login\ne aproveitar',
        nextScreenRoute: 'SignIn'
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.errors[0]);
      }

      return Alert.alert('Ops', 'Não foi possível cadastrar');
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
