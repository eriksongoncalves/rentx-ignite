import React from 'react';

import * as S from './styles';

type ImageSliderProps = {
  imagesUrl: string[];
};

function ImageSlider({ imagesUrl }: ImageSliderProps) {
  return (
    <S.Container>
      <S.ImageIndexs>
        <S.ImageIndex active />
        <S.ImageIndex />
        <S.ImageIndex />
        <S.ImageIndex />
      </S.ImageIndexs>

      <S.CardImageWrapper>
        <S.CardImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
      </S.CardImageWrapper>
    </S.Container>
  );
}

export default ImageSlider;
