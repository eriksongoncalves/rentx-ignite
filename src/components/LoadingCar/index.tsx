import React from 'react';
import LottieView from 'lottie-react-native';

import * as S from './styles';
import lottieAnimation from '../../assets/load_animated.json';

function Loading() {
  return (
    <S.Container>
      <LottieView
        source={lottieAnimation}
        autoPlay
        resizeMode="contain"
        loop
        style={{ height: 200 }}
      />
    </S.Container>
  );
}

export default Loading;
