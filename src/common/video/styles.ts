import * as Native from 'react-native';
import styled from 'styled-components/native';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${WIDTH_FOR_IMAGE}px;
  height: ${HEIGHT_FOR_IMAGE}px;
`;

export const Actions = styled.View`
  position: absolute;
  top:0;
  bottom: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #3030305a;
`;