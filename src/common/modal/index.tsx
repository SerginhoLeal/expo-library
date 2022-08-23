import * as React from 'react';
import * as ExpoAv from 'expo-av';
import * as Styles from './styles';
import * as Native from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import { Icon } from '../svg';

export const ModalScreen: React.FC<any> = ({
  state,
  progress,
  handleDownload,
}: any) => {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});
  // console.log(status.isPlaying);
  
  const [open, setOpen] = React.useState(false);

  const handlePlayPause = () => setStatus(status?.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync());
  
  const downloaded = state.downloaded ? 'check' : progress === 0 ? 'download' : progress === 1 ? 'check': 'arrow-rotate';

  return (
    <Styles.Container activeOpacity={1} onPress={() => setOpen(!open)}>
      <ExpoAv.Video
        ref={video}
        shouldPlay={true}
        isLooping
        useNativeControls={false}
        style={{ flex: 1 }}
        resizeMode="contain"
        source={{ uri: state.url }}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      {open && (
        <Styles.Actions>
          <Native.TouchableOpacity onPress={() => handleDownload(state.id)} style={{ padding: 25 }}>
            <Icon name={downloaded} />
          </Native.TouchableOpacity>
          <Native.TouchableOpacity onPress={handlePlayPause} style={{ padding: 25 }}>
            <Icon name={status.isPlaying ? 'pause' : 'play'} />
          </Native.TouchableOpacity>
        </Styles.Actions>
      )}
    </Styles.Container>
  )
};

/*<Native.Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: state.url }} />*/