import styled, { css } from 'styled-components/native';

type ItemProps = {
  active?: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  align-self: flex-end;
`;

export const Item = styled.View<ItemProps>`
  ${({ theme, active }) => css`
    width: 6px;
    height: 6px;
    background-color: ${theme.colors.shape};
    margin-left: 8px;
    border-radius: 4px;

    ${active &&
    css`
      background-color: ${theme.colors.title};
    `}
  `}
`;
