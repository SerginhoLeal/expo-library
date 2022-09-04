import * as Native from 'react-native';

export type OnViewableItemsChangedProps = {
  changed: Native.ViewToken[];
  viewableItems: Native.ViewToken[];
};

type dataProps = {
  id: number;
  url:string;
  mediaType:string;
  index: number;
  modal:boolean;
  creator:string;
  downloaded:boolean;
};

export type StateProps = {
  data: Array<object>;
  state: dataProps;
  onBackButtonPress: () => void;
};