import React from 'react';

import * as S from './styles';

type BulletProps = {
  qtdItems: number;
  currentItem?: number;
};

function Bullet({ qtdItems, currentItem = 0 }: BulletProps) {
  return (
    <S.Container>
      {new Array(qtdItems).fill(null).map((_, idx) => (
        <S.Item key={idx} active={idx === currentItem} />
      ))}
    </S.Container>
  );
}

export default Bullet;
