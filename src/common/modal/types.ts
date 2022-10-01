import * as Native from 'react-native';

export type OnViewableItemsChangedProps = {
  changed: Native.ViewToken[];
  viewableItems: Native.ViewToken[];
};

type DataProps = {
  index: number;
  modal:boolean;
};

export type StateProps = {
  data: Array<any>;
  state: DataProps;
  screen: string;
  onBackButtonPress: () => void;
};