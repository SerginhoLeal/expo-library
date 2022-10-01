import * as React from 'react';
import * as Native from 'react-native';
import * as ExpoAv from 'expo-av';
import * as Styles from './styles';

import { Icon } from '../svg';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

type PostsProps = {
  posts: {
    url: string;
    uri: string;
    tags: Array<string>;
    mediaType: string;
  },
}

export const Video = React.forwardRef(({ posts }: PostsProps, parentRef) => {
  const ref = React.useRef<any>(null);

  const [isPlaying, setIsPlaying] = React.useState<boolean | null>(false);

  React.useImperativeHandle(parentRef, () => ({ play, stop, unload }));
  React.useEffect(() => {
    return function(){unload()}
  }, []);

  const play = async() => {
    if (ref.current == null) return;

    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) return;

    try {
      await ref.current.playAsync();
    } catch (e) {
      console.log(e)
    }
  };

  const stop = async() => {
    setIsPlaying(false);
    if (ref.current == null) return;

    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) return;

    try {
      await ref.current.stopAsync();
    } catch (e) {
      console.log(e)
    };
  };

  const unload = async() => {
    if (ref.current == null) return;

    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log(e)
    };
  };

  const handlePlayVideo = async() => {
    if(posts.mediaType === 'photo') return;
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying){
      await ref.current.pauseAsync();
      setIsPlaying(true);
    } else {
      await ref.current.playAsync();
      setIsPlaying(false);
    }
  };

  return (
    <Styles.Container activeOpacity={1} onPress={handlePlayVideo}>
      <ExpoAv.Video
        ref={ref}
        isLooping
        usePoster
        shouldPlay={false}
        source={{ uri: posts.uri }}
        posterSource={{ uri: posts.uri }}
        resizeMode={ExpoAv.ResizeMode.CONTAIN}
        style={{ flex: 1, width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE }}
      />
      {isPlaying && posts.mediaType === 'video' && (
        <Styles.Actions>
          <Icon name='play' color='#fff' />
        </Styles.Actions>
      )}
    </Styles.Container>
  );
});

export default Video;