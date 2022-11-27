export type Props = {
  posts: any;
  isPlaying: boolean;
  handlePlayVideo: () => void;
  handleSliderProgress: (value: number, type: 'start' | 'end') => void;
};