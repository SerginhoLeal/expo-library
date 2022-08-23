import styled, { css } from 'styled-components/native';
import Modal from 'react-native-modal';

export const Container = styled.TouchableOpacity`
  position: relative;
  flex: 1;
`;

export const Actions = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #000000aa;
`;