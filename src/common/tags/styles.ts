import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled(Animated.View)`
  position: absolute;
  bottom: 50px;

  width: 90%;
  height: 100px;

  justify-content: center;

  background-color: #ffffff5a;

  border-radius: 2px;
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
  /* width: 50px;
  height: 50px; */
  padding: 20px;
`;

export const SliderContainer = styled.View`
  width: 100%;

  padding: 10px;

  flex-direction: row;
  justify-content: space-between;
`;

// export const PrettoSlider = styled(Slider)({
//   color: '#52af77',
//   height: 8,
//   '& .MuiSlider-track': {
//     border: 'none',
//   },
//   '& .MuiSlider-thumb': {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
//       boxShadow: 'inherit',
//     },
//     '&:before': {
//       display: 'none',
//     },
//   },
//   '& .MuiSlider-valueLabel': {
//     lineHeight: 1.2,
//     fontSize: 12,
//     background: 'unset',
//     padding: 0,
//     width: 32,
//     height: 32,
//     borderRadius: '50% 50% 50% 0',
//     backgroundColor: '#52af77',
//     transformOrigin: 'bottom left',
//     transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
//     '&:before': { display: 'none' },
//     '&.MuiSlider-valueLabelOpen': {
//       transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
//     },
//     '& > *': {
//       transform: 'rotate(45deg)',
//     },
//   },
// });

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
