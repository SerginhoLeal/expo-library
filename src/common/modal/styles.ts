import styled, { css } from 'styled-components/native';
import * as Native from 'react-native';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

export const Container = styled.SafeAreaView`
  position: relative;
  flex: 1;
  /* justify-content: center;
  align-items: center; */
`;

export const Actions = styled.View`
  ${({ display, width, height }: any) => css`
    display: ${display ? 'flex' : 'none'};
    width: ${width}px;
    height: ${height}px;
  `};

  flex-direction: row;
  position: absolute;
  /* bottom: 0; */
  align-items: center;
  justify-content: center;
  background-color: #303030aa;
`;