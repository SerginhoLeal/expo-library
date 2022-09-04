import * as React from 'react';
import * as Styles from './styles';

import { Masonry, ModalScreen } from '@common';

import { useFocusEffect } from '@react-navigation/native';
import { useMedia } from '@hooks';

const Folder: React.FC = () => {
  const [media, setMedia] = React.useState<Array<object>>([]);

  const [state, setState] = React.useState({
    id:0,
    url:'',
    mediaType:'',
    index:0,
    creator:'',
    modal:false,
    downloaded: false,
  });

  const handleSelectItem = (item: any) => setState({
    ...state,
    ...item,
    modal: true,
    downloaded: null,
    creator: `${item.id}_${item.createby}`,
  });

  const refreshAssets = () => useMedia({ folder: 'Storage', screens: 'perfil' }).then(setMedia)

  useFocusEffect(React.useCallback(() => {refreshAssets()}, []));

  return (
    <Styles.Container>
      <Masonry screen='local' data={media} handleSelectItem={handleSelectItem} />
      <ModalScreen
        data={media}
        state={state}
        onBackButtonPress={() => setState({ ...state, modal: false })}
      />
    </Styles.Container>
  );
};

export default Folder;


// https://github.com/Joshandrews43/media-library-issue/blob/main/useGetAssets.ts