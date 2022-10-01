import * as React from 'react';
import * as Styles from './styles';

import { Masonry, ModalScreen } from '@common';

import { useFocusEffect } from '@react-navigation/native';
import { useMedia } from '@hooks';

type ItemsProps = {
  id?:string;
  uri?:string;
  index:number;
  width?:number;
  height?:number;
  albumId?:string;
  duration?:number;
  filename?:string;
  mediaType?:string;
  creationTime?:number;
  modificationTime?:number;
};

const Folder = () => {
  const [media, setMedia] = React.useState<Array<object>>([]);
  const [state, setState] = React.useState({ index:0, modal:false });

  const handleSelectItem = (item: ItemsProps) => setState({...state, index: item.index, modal: true});

  const refreshAssets = () => useMedia({ screens: 'perfil' }).then(setMedia)

  useFocusEffect(React.useCallback(() => {refreshAssets()}, []));

  return (
    <Styles.Container>
      <Masonry screen='local' data={media} handleSelectItem={handleSelectItem} />
      <ModalScreen
        data={media}
        state={state}
        screen='local'
        onBackButtonPress={() => setState({ ...state, modal: false })}
      />
    </Styles.Container>
  );
};

export default Folder;


// https://github.com/Joshandrews43/media-library-issue/blob/main/useGetAssets.ts