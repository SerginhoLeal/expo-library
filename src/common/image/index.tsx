import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';
import * as Props from './types';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

export const Image: React.FC<Props.ImageProps> = ({
  item,
  onPress,
  type = 'full',
}: Props.ImageProps) => {
  const width = type === 'full' ? WIDTH_FOR_IMAGE : WIDTH_FOR_IMAGE / 2.04
  const height = item.height / (item.width / width);

  return (
    <Styles.Container onPress={onPress} activeOpacity={1}>
      <Styles.Image source={{ uri: (item.preview || item.uri)}} width={width} height={height} />
    </Styles.Container>
  );
};
