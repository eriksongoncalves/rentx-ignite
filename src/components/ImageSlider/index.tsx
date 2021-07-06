import React, { useState, useRef } from 'react';
import { ViewToken } from 'react-native';
import FastImage from 'react-native-fast-image';

import * as S from './styles';
import Bullet from '../Bullet';

export type PhotoProps = {
  id: string;
  photo: string;
};

export type ImageSliderProps = {
  imagesUrl: PhotoProps[];
};

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

function ImageSlider({ imagesUrl }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <S.Container>
      <S.BulletWrapper>
        <Bullet qtdItems={imagesUrl.length} currentItem={imageIndex} />
      </S.BulletWrapper>

      <S.CardSlider
        pagingEnabled={true}
        data={imagesUrl}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <S.CardImageWrapper>
            <S.CardImage
              source={{ uri: item.photo }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </S.CardImageWrapper>
        )}
        onViewableItemsChanged={indexChanged.current}
      />
    </S.Container>
  );
}

export default ImageSlider;
