import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled(Animated.View)`
  position: absolute;
  bottom: -250px;

  width: 100%;
  height: 300px;

  background-color: #ffffff5a;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  height: 60px;
`;

export const Buttons = styled.TouchableOpacity`
  ${({ display }:{display: boolean}) => css`
    display: ${display ? 'flex': 'none'};
  `};
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
`;

export const Content = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Tags = styled.View`
  margin: 5px 2px;
  flex-grow: 1;

  padding: 10px;

  align-items: center;
  justify-content: center;

  /* max-width: 100px; */
  height: 50px;

  background-color: #fff;

  border-radius: 2px;
`;
