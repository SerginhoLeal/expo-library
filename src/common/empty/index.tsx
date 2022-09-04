import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';

import { Text } from '../typography';

export const Empty: React.FC = () => {
  return (
    <Styles.Container>
      <Native.Image style={{ width: 100, height: 100, marginBottom: 30 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/2048px-Google_Photos_icon_%282020%29.svg.png' }} />
      <Text textalign='center' >Fotos e vídeos baixados por você são exibidos aqui e salvos no seu Google Fotos.</Text>
    </Styles.Container>
  );
}