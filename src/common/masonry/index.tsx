import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';

type Props = {
  data: any[];
  handleSelectItem: ({}: any) => void;
};

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

const Image = ({ item }: any) => {
  const width = WIDTH_FOR_IMAGE / 2.04;
  const height = item.height / (item.width / width);

  return <Native.Image style={{ width: width, height: height, marginBottom: 2, borderRadius: 2 }} source={{ uri: (item.preview || item.uri) }} />;
};

export const Masonry: React.FC<Props> = ({
  data,
  handleSelectItem
}: Props) => {
  return (
    <Native.FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Styles.Content>
          <Native.View>
            {item.images.filter((_: any, i: number) => Number.isInteger(i / 2)).map((item: any, index: any) => (
              <Native.TouchableOpacity activeOpacity={1} key={index} onPress={() => handleSelectItem(item)}>
                <Image item={item} />
              </Native.TouchableOpacity>
            ))}
          </Native.View>
          <Native.View>
            {item.images.filter((_: any, i: number) => !Number.isInteger(i / 2)).map((item: any, index: any) => (
              <Native.TouchableOpacity activeOpacity={1} key={index} onPress={() => handleSelectItem(item)}>
                <Image item={item} />
              </Native.TouchableOpacity>
            ))}
          </Native.View>
        </Styles.Content>
      )}
    />
  );
};
