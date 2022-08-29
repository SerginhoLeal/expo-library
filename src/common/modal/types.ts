import * as Native from 'react-native';

export type OnViewableItemsChangedProps = {
  changed: Native.ViewToken[];
  viewableItems: Native.ViewToken[];
};