import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import * as S from './styles';
import { Yup, schemaEditProfileValidation } from './schemaValidation';
import { BackButton, Button, Input } from '../../components';
import { useAuth } from '../../hooks/auth';

type Option = 'dataEdit' | 'passwordEdit';

function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user, signOut, updateUser } = useAuth();
  const netInfo = useNetInfo();

  const [option, setOption] = useState<Option>('dataEdit');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driver_license, setDriverLicence] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(user.avatar);

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: Option) {
    if (!netInfo.isConnected && optionSelected === 'passwordEdit') {
      Alert.alert(
        'Sem conexão',
        'Você precisar estar conectado a internet para alterar a sua senha.'
      );
    } else {
      setOption(optionSelected);
    }
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const data = {
        name,
        email,
        driver_license
      };

      await schemaEditProfileValidation.validate(data, { abortEarly: false });

      await updateUser({
        ...user,
        ...data,
        avatar
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.errors[0]);
      }

      Alert.alert('Não foi possível atualizar o perfil');
    }
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: 'Confirmar',
          onPress: () => signOut()
        }
      ]
    );
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
              {!!avatar && <S.Photo source={{ uri: avatar }} />}

              <S.PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>

          <S.Content style={{ marginBottom: useBottomTabBarHeight() + 30 }}>
            <S.Options>
              <S.Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <S.OptionTitle active={option === 'dataEdit'}>
                  Dados
                </S.OptionTitle>
              </S.Option>
              <S.Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
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

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Profile;
