import * as React from 'react';
import * as Styles from './styles';

import { Easing, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

import { useDownloads } from '@hooks';

import { Icon } from '../svg';
import { Text } from '../typography';

export const Tags: React.FC = ({ posts }) => {
  const [progress, setProgress] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<Array<number>>([]);

  const pressed = useSharedValue(false);
  const y = useSharedValue(0);

  const statusDownload =  progress ? 'loading' : (filter.includes(posts.id) || posts.downloaded ? 'check' : 'download');

  const eventHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      pressed.value = true;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      y.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      pressed.value = false;
      if (y.value < 0 && y.value > -200) {
        y.value = withTiming(-250, { duration: 200, easing: Easing.bezier(0.5, 0.01, 0, 1)});
      }else{
        y.value = withTiming(0, { duration: 200, easing: Easing.bezier(0.5, 0.01, 0, 1)});
      }
    },
  });

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
      mediaType:posts.mediaType === 'video' ? '.mp4' : '.png'
    })
      .then(() => setFilter(old => [...old, posts.id]))
      .catch(console.log)
      .finally(() => setProgress(false))
  };

  return (
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
  );
};