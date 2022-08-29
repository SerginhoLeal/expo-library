import * as React from 'react';
import * as Native from 'react-native';
import * as ExpoAv from 'expo-av';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

export const Video = React.forwardRef(({ posts, refScroll }: any, parentRef) => {
  const ref = React.useRef<any>(null);
  React.useImperativeHandle(parentRef, () => ({ play, stop, unload }));

  React.useEffect(() => {
    return function(){unload()}
  }, []);

  const play = async() => {
    if (ref.current == null) return;

    // if video is already playing return
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) return;

    try {
      await ref.current.playAsync();
    } catch (e) {
      console.log(e)
    }
  };

  const stop = async() => {
    if (ref.current == null) {
      return;
    };

    // if video is already stopped return
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) return;

    try {
      await ref.current.stopAsync();
    } catch (e) {
      console.log(e)
    }
  };

  const unload = async() => {
    // console.log('unload');
    if (ref.current == null) return;

    // if video is already stopped return
    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log(e)
  }
  };

  return (
    <ExpoAv.Video
      ref={ref}
      shouldPlay={false}
      isLooping
      usePoster
      posterSource={{ uri: posts.url }}
      source={{ uri: posts.url }}
      style={{ flex: 1, width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE }}
      resizeMode={ExpoAv.ResizeMode.CONTAIN}
    />
  );
});

export default Video;