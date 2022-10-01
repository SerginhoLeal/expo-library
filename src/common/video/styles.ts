import * as Native from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
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