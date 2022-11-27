import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import { Video } from '@common';
import { useContext } from '@context';

import { OnViewableItemsChangedProps } from './types';


import { RootStackParamList } from '@types';

type Props = NativeStackScreenProps<RootStackParamList, 'Slider'>;
type ProfileScreenNavigationProp = Props['route'];

const SliderScreen = () => {
  const { media } = useContext();
  const { params } = useRoute<ProfileScreenNavigationProp>();

  const mediaRefs = React.useRef([]);
  const listRef = React.useRef<Native.FlatList>(null);
  const scrollY = React.useRef(new Native.Animated.Value(0)).current;
  const onViewableItemsChanged = React.useRef(({ changed }: OnViewableItemsChangedProps) => {
    changed.forEach(({ key, isViewable, item, index, section }) => {
      const cell = mediaRefs.current[Number(key)];
      if(cell){
        if(isViewable){
          cell.play();
        }else{
          cell.stop();
        };
      };
    });
  });

  const { width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE } = Native.useWindowDimensions();

  const getItemLayout = React.useCallback((_: any, index: number) => {
    return { length: HEIGHT_FOR_IMAGE, offset: HEIGHT_FOR_IMAGE * index, index };
  },[]);

  const renderItem = ({item, index} : any) => {
    if(item.mediaType === 'photo'){
      return <Native.Image resizeMode='contain' source={{ uri: item.uri }} style={{ flex: 1, width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE }} />
    };

    return <Video posts={item} ref={PostSingleRef => (mediaRefs.current[index] = PostSingleRef)} />
  };

  React.useEffect(() => {
    return listRef.current?.scrollToOffset({ offset: HEIGHT_FOR_IMAGE * params.index });
  }, [params.index]);

  return (
    <GestureHandlerRootView style={{ flex: 1, width: '100%', height: HEIGHT_FOR_IMAGE }}>
      <Native.View style={Native.StyleSheet.absoluteFillObject}>
        {media.map(({ preview }: any, index) => {
          const inputRange = [(index - 1) * HEIGHT_FOR_IMAGE, index * HEIGHT_FOR_IMAGE, (index + 1) * HEIGHT_FOR_IMAGE];
          const opacity = scrollY.interpolate({ inputRange, outputRange: [0,1,0] });
          return (
            <Native.Animated.Image
              blurRadius={5}
              key={`image-${index}`}
              source={{ uri: preview }}
              style={[ Native.StyleSheet.absoluteFillObject, { opacity: opacity } ]}
            />
          )
        })}
      </Native.View>
      <Native.Animated.FlatList
        data={media}
        ref={listRef}
        pagingEnabled
        windowSize={1}
        removeClippedSubviews
        initialNumToRender={0}
        maxToRenderPerBatch={1}
        decelerationRate='normal'
        scrollEventThrottle={32}
        getItemLayout={getItemLayout}
        initialScrollIndex={params?.index}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={renderItem}
        onScroll={Native.Animated.event(
          [{ nativeEvent:{ contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />
    </GestureHandlerRootView>
  );
};

export default SliderScreen;