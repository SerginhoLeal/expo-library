import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Actions = styled.View`
  ${({ display, width, height }: { display: boolean, width: string, height:string }) => css`
    display: ${display ? 'flex' : 'none'};
    width: ${width}px;
    height: ${height}px;
  `};

  flex-direction: row;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #5050505a;
`;