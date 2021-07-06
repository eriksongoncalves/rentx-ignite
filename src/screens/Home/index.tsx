import React, { useState, useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import * as S from './styles';
import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { CardCar, LoadingCar } from '../../components';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/models/Car';

function Home() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetail(car: ModelCar) {
    navigation.navigate('Detail', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post(`/users/sync`, user);
      }
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        Alert.alert('Ocorreu um erro ao carregar a lista de carros');
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <S.TotalCar>Total de {cars.length} carros</S.TotalCar>}
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <LoadingCar />
      ) : (
        <S.CardList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardCar data={item} onPress={() => handleCarDetail(item)} />
          )}
        />
      )}
    </S.Container>
  );
}

export default Home;
