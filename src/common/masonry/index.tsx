import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';

type Props = {
  data: any[];
  handleSelectItem: ({}: any) => void;
};

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');
const width = WIDTH_FOR_IMAGE / 2.04;

const Image = ({ item }: any) => {
  const height = item.height / (item.width / width);

  return <Styles.Image source={{ uri: (item.preview || item.uri)}} width={width} height={height} />
};

export const Masonry: React.FC<Props> = ({
  data,
  handleSelectItem
}: Props) => {

  if(data[0].length === 0) {
    return <></>
  }

  return (
    <Native.FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Styles.Content>
          <Native.View style={{ width: width }}>
            {item.data.filter((_: any, i: number) => Number.isInteger(i / 2)).map((item: any, ind: any) => (
              <Native.TouchableOpacity activeOpacity={1} key={ind} onPress={() => handleSelectItem(item)}>
                <Image item={item} />
              </Native.TouchableOpacity>
            ))}
          </Native.View>
          <Native.View style={{ width: width }}>
            {item.data.filter((_: any, i: number) => !Number.isInteger(i / 2)).map((item: any, ind: any) => (
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
