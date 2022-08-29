import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';
import * as MediaLibrary from 'expo-media-library';

import Modal from 'react-native-modal';

import { Icon, Masonry, ModalScreen } from '@common';

import { useFocusEffect } from '@react-navigation/native';

type Props = {
  quantity: number;
  data: any[];
  status: string | null;
};

const Folder: React.FC = () => {
  const [folder, setFolder] = React.useState<Props>({
    quantity: 0,
    data: [],
    status: null,
  });

  const [state, setState] = React.useState({ id: 0, downloaded: false, url:'', creator:'', modal:false, type:'', index: 0 });

  const handleSelectItem = (item: any) => {
    setState({
      ...state,
      id: item.id,
      modal: true,
      creator: `${item.id}_${item.createby}`,
      url: item.uri,
      type: item.type,
      downloaded: item.downloaded,
      index: item.index
    });
  };

  const refreshAssets = async (numAssets = 50) => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if(granted) await MediaLibrary.getAlbumsAsync();

    const album = await MediaLibrary.getAlbumAsync('Storage');

    if(album === null){
      return setFolder({ ...folder, status: 'empty' });
    };

    await MediaLibrary.getAssetsAsync({
      mediaType: ["video", "photo"],
      first: numAssets,
      album,
    })
      .then(data => {
        setFolder({
          ...folder,
          quantity: data.assets.length,
          data: data.assets,
        })
      })
  };

  useFocusEffect(React.useCallback(() => {refreshAssets()}, []));

  return (
    <Styles.Container>
      {folder.status === 'empty' ? (
        <Native.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name='download' />
          <Native.Text>Faça um download</Native.Text>
        </Native.View>
      ) : (
        <Masonry data={[folder]} handleSelectItem={handleSelectItem} />
      )}
      <Modal
        style={{ margin: 0, backgroundColor: '#FFF' }}
        statusBarTranslucent
        animationIn="fadeIn"
        isVisible={state.modal}
        onBackButtonPress={() => setState({ ...state, modal: false })}>
          <ModalScreen state={state} />
      </Modal>
    </Styles.Container>
  );
};

export default Folder;


// https://github.com/Joshandrews43/media-library-issue/blob/main/useGetAssets.ts