import styled, { css } from 'styled-components/native';

import { text_align, _color } from './constants';
import { TypographyProps } from './types';

export const Text = styled.Text`
  ${({ textalign = 'left', color = 'white' }: TypographyProps) => css`
    text-align: ${text_align[textalign]};
    color: ${_color[color]};
  `};

  font-size: 15px;
`;
