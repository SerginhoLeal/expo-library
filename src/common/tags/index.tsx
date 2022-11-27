import * as React from 'react';
import * as Styles from './styles';

import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import Slider from '@react-native-community/slider';

import { useDownloads } from '@hooks';

import { Icon } from '../svg';
import { Text } from '../typography';

import { Props } from './types';

export const Tags: React.FC<Props> = ({ posts, isPlaying, handlePlayVideo, handleSliderProgress }: Props) => {
  const [progress, setProgress] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<Array<number>>([]);

  const y = useSharedValue(0);

  const statusDownload =  progress ? 'loading' : (filter.includes(posts.id) || posts.downloaded ? 'check' : 'download');

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
    };
  });

  const handleDownloadVideo = () => {
    setProgress(true)
    useDownloads({
      url:posts.uri,
      creator:`${posts.id}_${posts.createby}`,
      mediaType: posts.mediaType === 'video' ? '.mp4' : '.png'
    })
      .then(() => setFilter(old => [...old, posts.id]))
      .catch(console.log)
      .finally(() => setProgress(false))
  };

  return (
    <Styles.Container style={uas}>

      <Styles.Header>
        <Styles.Buttons display onPress={handleDownloadVideo} disabled={filter.includes(posts.id)}>
          <Icon name={statusDownload} color='#fff' />
        </Styles.Buttons>
        <Styles.Buttons display onPress={handlePlayVideo}>
          <Icon name={isPlaying ? 'play' : 'pause'} color='#fff' />
        </Styles.Buttons>
        <Styles.Buttons display onPress={() => {}}>
          <Icon name='tags' color='#fff' />
        </Styles.Buttons>
      </Styles.Header>

      {/* {posts.mediaType === 'video' && ()} */}
        <Styles.SliderContainer>
          <Text>00:00</Text>

          <Slider
            style={{
              flex: 1,
              height: 20,
              // backgroundColor: '#303030',
              // borderBottomRightRadius: 100,
              // borderTopRightRadius: 100
            }}
            tapToSeek
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onSlidingStart={event => handleSliderProgress(event, 'start')}
            onSlidingComplete={event => handleSliderProgress(event, 'end')}
          />

          {/* <Slider /> */}

          <Text>00:00</Text>
        </Styles.SliderContainer>

      {/* <Styles.Content>
        {posts.tags && posts?.tags?.map((item, index) => (
          <Styles.Tags key={index}>
            <Text>{item}</Text>
          </Styles.Tags>
        ))}
      </Styles.Content> */}
    </Styles.Container>
  );
};



/*

<PanGestureHandler onGestureEvent={eventHandler}>
  <Styles.Container style={uas}>
    <Styles.Header>
      <Styles.Buttons display onPress={handleDownloadVideo} disabled={filter.includes(posts.id)}>
        <Icon name={statusDownload} color='#fff' />
      </Styles.Buttons>
    </Styles.Header>
    <Styles.Content>
      {posts.tags && posts?.tags?.map((item, index) => (
        <Styles.Tags key={index}>
          <Text>{item}</Text>
        </Styles.Tags>
      ))}
    </Styles.Content>
  </Styles.Container>
</PanGestureHandler>

*/