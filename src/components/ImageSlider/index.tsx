import React, { useState, useRef } from 'react';
import { ViewToken } from 'react-native';

import * as S from './styles';

export type ImageSliderProps = {
  imagesUrl: string[];
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
      <S.ImageIndexs>
        {imagesUrl.map((item, index) => (
          <S.ImageIndex key={item} active={index === imageIndex} />
        ))}
      </S.ImageIndexs>

      <S.CardSlider
        pagingEnabled={true}
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <S.CardImageWrapper>
            <S.CardImage source={{ uri: item }} resizeMode="contain" />
          </S.CardImageWrapper>
        )}
        onViewableItemsChanged={indexChanged.current}
      />
    </S.Container>
  );
}

export default ImageSlider;
