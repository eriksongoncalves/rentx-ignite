import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import * as S from './styles';
import { BackButton, Input } from '../../components';
import { useAuth } from '../../hooks/auth';

function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driver_license, setDriverLicence] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <S.Header>
            <S.HeaderTop>
              <BackButton color="light" onPress={handleBack} />
              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
              <S.LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.LogoutButton>
            </S.HeaderTop>

            <S.PhotoContainer>
              <S.Photo
                source={{ uri: 'https://github.com/rodrigorgtic.png' }}
              />

              <S.PhotoButton>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content style={{ marginBottom: useBottomTabBarHeight() + 30 }}>
            <S.Options>
              <S.Option
                active={option === 'dataEdit'}
                onPress={() => setOption('dataEdit')}
              >
                <S.OptionTitle active={option === 'dataEdit'}>
                  Dados
                </S.OptionTitle>
              </S.Option>
              <S.Option
                active={option === 'passwordEdit'}
                onPress={() => setOption('passwordEdit')}
              >
                <S.OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </S.OptionTitle>
              </S.Option>
            </S.Options>

            <S.Section>
              {option === 'dataEdit' ? (
                <>
                  <Input
                    placeholder="Nome"
                    iconName="user"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={name}
                    onChangeText={setName}
                    defaultValue={user.name}
                  />

                  <Input
                    placeholder="E-mail"
                    iconName="mail"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    defaultValue={user.email}
                  />

                  <Input
                    placeholder="CNH"
                    iconName="credit-card"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={driver_license}
                    onChangeText={setDriverLicence}
                    defaultValue={user.driver_license}
                  />
                </>
              ) : (
                <>
                  <Input
                    placeholder="Senha atual"
                    iconName="lock"
                    autoCorrect={false}
                    autoCapitalize="none"
                    isPasswordInput
                    value={oldPassword}
                    onChangeText={setOldPassword}
                  />

                  <Input
                    placeholder="Nova senha"
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
                </>
              )}
            </S.Section>
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Profile;
