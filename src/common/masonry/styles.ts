import styled, { css } from 'styled-components/native';

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Image = styled.Image`
  ${({ width, height }:{ width:string, height:string }) => css`
    width: ${width || 100}px;
    height: ${height || 100}px;
  `};
  margin-bottom: 2px;
  border-radius: 2px;
`;