import styled, { css } from 'styled-components/native';

import { text_align } from './constants';
import { TypographyProps } from './types';

export const Text = styled.Text`
  ${({ textalign = 'left' }: TypographyProps) => css`
    text-align: ${text_align[textalign]};
  `};

  font-size: 15px;
  color: #888;
`;
