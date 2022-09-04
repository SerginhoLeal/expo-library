import * as React from 'react';
import * as Styles from './styles';
import * as Native from 'react-native';

import Video from '../video';

import { OnViewableItemsChangedProps, StateProps } from './types';

const { width: WIDTH_FOR_IMAGE } = Native.Dimensions.get('window');

export const ModalScreen: React.FC<StateProps> = ({ data, state, onBackButtonPress }: StateProps) => {
  const mediaRefs = React.useRef<any[]>([]);
  const listRef = React.useRef<Native.FlatList>(null);
  const scrollX = React.useRef(new Native.Animated.Value(0)).current;

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

  const getItemLayout = React.useCallback((_: any, index: number) => {
    return { length: WIDTH_FOR_IMAGE, offset: WIDTH_FOR_IMAGE * index, index };
  },[]);

  React.useEffect(() => {
    listRef.current?.scrollToOffset({ offset: WIDTH_FOR_IMAGE * state.index })
  }, []);

  return (
    <Styles.Container
      statusBarTranslucent
      animationIn="fadeIn"
      isVisible={state.modal}
      onBackButtonPress={onBackButtonPress}
    >
      <Native.View style={Native.StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [(index - 1) * WIDTH_FOR_IMAGE, index * WIDTH_FOR_IMAGE, (index + 1) * WIDTH_FOR_IMAGE];
          const opacity = scrollX.interpolate({ inputRange, outputRange: [0,1,0] });
          return (
            <Native.Animated.Image
              blurRadius={5}
              key={`image-${index}`}
              source={{ uri: image?.preview }}
              style={[ Native.StyleSheet.absoluteFillObject, { opacity: opacity } ]}
            />
          )
        })}
      </Native.View>
      <Native.Animated.FlatList
        data={data}
        ref={listRef}
        horizontal
        pagingEnabled
        windowSize={4}
        removeClippedSubviews
        initialNumToRender={0}
        maxToRenderPerBatch={2}
        decelerationRate='normal'
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        initialScrollIndex={state.index}
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={({item, index}) => <Video posts={item} ref={PostSingleRef => (mediaRefs.current[index] = PostSingleRef)} />}
        onScroll={Native.Animated.event(
          [{ nativeEvent:{ contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </Styles.Container>
  );
};
