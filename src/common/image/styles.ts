import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  
`;

export const Image = styled.Image`
  ${({ width, height }:{ width:string, height:string }) => css`
    width: ${width || 100}px;
    height: ${height || 100}px;
  `};
  margin-bottom: 2px;
  border-radius: 2px;
`;
