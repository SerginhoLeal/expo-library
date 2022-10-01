import * as Native from 'react-native';
import Modal from 'react-native-modal';
import styled, { css } from 'styled-components/native';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

export const Container = styled(Modal)`
  position: relative;
  margin: 0;
  background-color: #303030;
  justify-content: center;
  align-items: center;
`;
