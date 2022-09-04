import * as React from 'react';
import * as Native from 'react-native';
import * as ExpoAv from 'expo-av';
import * as Styles from './styles';
import { Icon } from '../svg';

import { useDownloads } from '@hooks';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

export const Video = React.forwardRef(({ posts }: any, parentRef) => {
  const ref = React.useRef<any>(null);
  const [progress, setProgress] = React.useState<'download' | 'loading' | 'check'>(posts.downloaded ? 'check' : 'download');
  const [showOptions, setShowOptions] = React.useState<boolean>(false);

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
    if (ref.current == null) return;

    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) return;

    setShowOptions(false);

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

  const handleDownloadVideo = () => {
    setProgress('loading')
    useDownloads({
      folder: 'Storage',
      url:posts.url,
      creator:`${posts.id}_${posts.createby}`,
      mediaType:posts.mediaType === 'video' ? '.mp4' : '.png'
    })
      .then(() => setProgress('check'))
      .catch(() => setProgress('download'))
  };

  const handleIsPlaying = async() => {
    if(posts.mediaType === 'photo'){
      return setShowOptions(!showOptions);
    };

    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      await ref.current.pauseAsync();
      setShowOptions(true);
    } else {
      await ref.current.playAsync();
      setShowOptions(false);
    }
  };

  return (
    <Styles.Container activeOpacity={1} onPress={handleIsPlaying}>
      <ExpoAv.Video
        ref={ref}
        isLooping
        usePoster
        shouldPlay={false}
        source={{ uri: posts.url || posts.uri }}
        posterSource={{ uri: posts.url || posts.uri }}
        resizeMode={ExpoAv.ResizeMode.CONTAIN}
        style={{ flex: 1, width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE }}
      />
      <Styles.Actions display={showOptions} width={posts.width} height={posts.height}>
        <Native.TouchableOpacity
          style={{ display: posts.downloaded !== undefined ? 'flex' : 'none' }}
          onPress={handleDownloadVideo}
          disabled={progress === 'check' || posts.downloaded}
        >
          <Icon name={progress} />
        </Native.TouchableOpacity>
      </Styles.Actions>
    </Styles.Container>
  );
});

export default Video;