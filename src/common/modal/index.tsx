import * as React from 'react';
import * as Styles from './styles';
import * as Native from 'react-native';

import { useContext } from '@context';

import { OnViewableItemsChangedProps } from './types';

import Video from '../video';

const { width: WIDTH_FOR_IMAGE } = Native.Dimensions.get('window');

export const ModalScreen: React.FC<any> = ({ state }: any) => {
  const { media } = useContext();

  const mediaRefs = React.useRef<any[]>([]);
  const listRef = React.useRef<Native.FlatList>(null);
  const scrollX = React.useRef(new Native.Animated.Value(0)).current;

  const onViewableItemsChanged = React.useRef(({ changed }: OnViewableItemsChangedProps) => {
    changed.forEach(({ key, isViewable }) => {
      const cell = mediaRefs.current[Number(key)];
      if(cell){
        // console.log(
        //   element.isViewable
        //   ? `id-${element.item.id} | ${element.isViewable} | ${element.key}`
        //   : `id-${element.item.id} removed`
        // );

        if(isViewable){
          cell.play();
        }else{
          cell.stop();
        };
      };
    });
  });

  React.useEffect(() => {
    return listRef.current?.scrollToOffset({ offset: WIDTH_FOR_IMAGE * state.status })
  }, []);

  return (
    <Styles.Container>
      <Native.View style={Native.StyleSheet.absoluteFillObject}>
        {media.data.map((image, index) => {
          const inputRange = [(index - 1) * WIDTH_FOR_IMAGE, index * WIDTH_FOR_IMAGE, (index + 1) * WIDTH_FOR_IMAGE];
          const opacity = scrollX.interpolate({ inputRange, outputRange: [0,1,0] });
          return (
            <Native.Animated.Image
              blurRadius={5}
              key={`image-${index}`}
              source={{ uri: image.preview }}
              style={[ Native.StyleSheet.absoluteFillObject, { opacity: opacity } ]}
            />
          )
        })}
      </Native.View>
      <Native.Animated.FlatList
        data={media.data}
        ref={listRef}

        horizontal
        pagingEnabled
        windowSize={4}
        removeClippedSubviews
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        decelerationRate='normal'
        keyExtractor={(_, i) => i.toString()}
        viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        // onContentSizeChange={() => listRef.current?.scrollToOffset({ offset: WIDTH_FOR_IMAGE * status })}
        onScrollToIndexFailed={() => {}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Video
              posts={item}
              ref={PostSingleRef => (mediaRefs.current[index] = PostSingleRef) }
            />
          )
        }}
        onScroll={Native.Animated.event(
          [{ nativeEvent:{ contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </Styles.Container>
  )
};
