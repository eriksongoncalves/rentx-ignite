import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import * as S from './styles';

import { schemaValidation, Yup } from './schemaValidation';
import { Button, Input, Bullet, BackButton } from '../../../components';

function SignUpFirstStep() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driver_license, setDriverLicence] = useState('');

  async function handleSubmit() {
    const data = { name, email, driver_license };

    try {
      await schemaValidation.validate(data, { abortEarly: false });

      navigation.navigate('SignUpSecondStep', {
        user: data
      });
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

            <Bullet qtdItems={2} currentItem={0} />
          </S.Header>

          <S.Title>
            Crie sua{'\n'}
            conta
          </S.Title>
          <S.Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </S.Subtitle>

          <S.Form>
            <S.FormTitle>1. Dados</S.FormTitle>

            <Input
              placeholder="Nome"
              iconName="user"
              autoCorrect={false}
              autoCapitalize="none"
              value={name}
              onChangeText={setName}
            />

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
              placeholder="CNH"
              iconName="credit-card"
              keyboardType="number-pad"
              autoCorrect={false}
              autoCapitalize="none"
              value={driver_license}
              onChangeText={setDriverLicence}
            />
          </S.Form>

          <Button title="Próximo" onPress={handleSubmit} loading={false} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export default SignUpFirstStep;
