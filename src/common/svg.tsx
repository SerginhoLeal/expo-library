import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import styled from 'styled-components/native';

const StyledSvg = styled(Svg)``;
const StyledPath = styled(Path)``;

type Props = {
  name: 'home' | 'user' | 'download';
  size?: string;
};

export const Icon: React.FC<Props> = ({ name = 'user', size = '60' }: Props) => {
  switch (name) {
    case 'home':
      return (
        <StyledSvg width={size} height={size} viewBox="0 0 50 50">
          <StyledPath d="M18.1 34C18.0448 34 18 33.9552 18 33.9V22.9804C18 22.4389 18.4389 22 18.9804 22C18.9912 22 19 22.0088 19 22.0196V33.9C19 33.9552 18.9552 34 18.9 34H18.1Z" fill="#888"/>
          <StyledPath d="M34.8599 25.8656C34.673 26.0448 34.37 26.0448 34.1832 25.8656L24.7098 16.7831C24.5229 16.604 24.5229 16.3135 24.7098 16.1344C24.8966 15.9552 25.1996 15.9552 25.3864 16.1344L34.8599 25.2169C35.0467 25.396 35.0467 25.6865 34.8599 25.8656Z" fill="#888"/>
          <StyledPath d="M15.1401 25.8656C14.9533 25.6865 14.9533 25.396 15.1401 25.2169L24.6136 16.1344C24.8004 15.9552 25.1034 15.9552 25.2902 16.1344C25.4771 16.3135 25.4771 16.604 25.2902 16.7831L15.8168 25.8656C15.63 26.0448 15.327 26.0448 15.1401 25.8656Z" fill="#888"/>
          <StyledPath d="M31.1 34C31.0448 34 31 33.9552 31 33.9V22.0196C31 22.0088 31.0088 22 31.0196 22C31.5611 22 32 22.4389 32 22.9804V33.9C32 33.9552 31.9552 34 31.9 34H31.1Z" fill="#888"/>
        </StyledSvg>
      );

    case 'user':
      return (
        <StyledSvg width={size} height={size} viewBox="0 0 50 50">
          <StyledPath fillRule="evenodd" clipRule="evenodd" d="M29 21C29 23.2091 27.2091 25 25 25C22.7909 25 21 23.2091 21 21C21 18.7909 22.7909 17 25 17C27.2091 17 29 18.7909 29 21ZM28 21C28 22.6569 26.6569 24 25 24C23.3431 24 22 22.6569 22 21C22 19.3431 23.3431 18 25 18C26.6569 18 28 19.3431 28 21Z" fill="#888"/>
          <StyledPath d="M19.2724 29.2724C17.7534 30.7915 16.9 32.8517 16.9 35H16C16 34.6643 16.0188 34.3305 16.0557 34C16.2814 31.981 17.1856 30.0865 18.636 28.636C20.3239 26.9482 22.6131 26 25 26C27.3869 26 29.6761 26.9482 31.364 28.636C32.8144 30.0865 33.7186 31.981 33.9443 34C33.9812 34.3305 34 34.6643 34 35H33.1C33.1 32.8517 32.2466 30.7915 30.7276 29.2724C29.2085 27.7534 27.1483 26.9 25 26.9C22.8517 26.9 20.7915 27.7534 19.2724 29.2724Z" fill="#888"/>
        </StyledSvg>
      );

    case 'download':
      return (
        <StyledSvg width={size} height={size} viewBox="0 0 43 43">
          <StyledPath d="M21.5 15V25.7426L25.9497 21.2929L26.6569 22L21.7105 26.9463L21.714 26.9497L21.0069 27.6569L21.0034 27.6534L21 27.6569L20.2929 26.9497L20.2963 26.9463L15.35 22L16.0571 21.2929L20.5 25.7358V15H21.5Z" fill="#888"/>
          <StyledPath d="M29 30V29H13V30H29Z" fill="#888"/>
        </StyledSvg>
      )

    default:
      break;
  }
  return null;
};
