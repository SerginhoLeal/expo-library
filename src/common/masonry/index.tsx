import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';

import { Icon } from '../svg';
import { Empty } from '../empty';

type Props = {
  data: Array<object>;
  screen: 'data' | 'local';
  handleSelectItem: ({}: any) => void;
};

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');
const width = WIDTH_FOR_IMAGE / 2.04;

const Image = ({ item }: any) => {
  const height = item.height / (item.width / width);

  return <Styles.Image source={{ uri: (item.preview || item.uri)}} width={width} height={height} />
};

export const Masonry: React.FC<Props> = ({ screen, data, handleSelectItem }: Props) => {
  if(data.length === 0) {
    return <Empty />
  };

  return (
    <Native.FlatList
      data={[data]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Styles.Content>
          <Native.View style={{ width: width }}>
            {item.filter((_: any, i: number) => Number.isInteger(i / 2)).map((item: any, ind: any) => (
              <Native.TouchableOpacity activeOpacity={1} key={ind} onPress={() => handleSelectItem(item)}>
                <Image item={item} />
              </Native.TouchableOpacity>
            ))}
          </Native.View>
          <Native.View style={{ width: width }}>
            {item.filter((_: any, i: number) => !Number.isInteger(i / 2)).map((item: any, ind: any) => (
              <Native.TouchableOpacity activeOpacity={1} key={ind} onPress={() => handleSelectItem(item)}>
                <Image item={item} />
              </Native.TouchableOpacity>
            ))}
          </Native.View>
        </Styles.Content>
      )}
    />
  );
};
