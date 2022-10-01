import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';

import { Icon } from '../svg';
import { Empty } from '../empty';
import { Image } from '../image';

type Props = {
  data: Array<object>;
  screen: 'home' | 'local';
  handleSelectItem: ({}: any) => void;
};

const { width: WIDTH_FOR_IMAGE } = Native.Dimensions.get('window');
const width = WIDTH_FOR_IMAGE / 2.04;

export const Masonry: React.FC<Props> = ({ data, screen, handleSelectItem }: Props) => {
  if(data.length === 0 && screen === 'home') {
    return <Icon name='loading' color='#888' />
  };

  if(data.length === 0 && screen === 'local'){
    return <Empty />
  };

  return (
    <Native.FlatList
      data={[data]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Styles.Content>
          <Native.View style={{ width: width }}>
            {item.filter((_: any, i: number) => Number.isInteger(i / 2)).map((item: any, ind: any) => (
              <Image key={ind} item={item} type='masonry' onPress={() => handleSelectItem(item)} />
            ))}
          </Native.View>
          <Native.View style={{ width: width }}>
            {item.filter((_: any, i: number) => !Number.isInteger(i / 2)).map((item: any, ind: any) => (
              <Image key={ind} item={item} type='masonry' onPress={() => handleSelectItem(item)} />
            ))}
          </Native.View>
        </Styles.Content>
      )}
    />
  );
};
