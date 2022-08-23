import * as React from 'react';
import * as Styles from './styles';
import * as Native from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import Modal from 'react-native-modal';

import { Masonry, ModalScreen } from '@common';

import { useContext } from '@context';

const Home: React.FC = () => {
  const { media } = useContext();
  
  const [progress, setProgress] = React.useState<number>(0);
  const [state, setState] = React.useState({ id: 0, downloaded: false, url:'', creator:'', modal:false, type:'' });

  const handleSelectItem = (item: any) => {
    setState({
      ...state,
      id: item.id,
      modal: true,
      creator: `${item.id}_${item.createby}`,
      url: item.url,
      type: item.type,
      downloaded: item.downloaded
    });
  };

  const callback = (downloadProgress: FileSystem.DownloadProgressData) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setProgress(progress);
  };

  const downloadResumable: FileSystem.DownloadResumable = FileSystem.createDownloadResumable(
    state.url,
    `${FileSystem.documentDirectory}${state.creator}${state.type === 'video' ? '.mp4' : '.png'}`,
    {},
    callback
  );

  const handleDownload = async (id: number) => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if(granted) await MediaLibrary.getAlbumsAsync();

    const album = await MediaLibrary.getAlbumAsync('Storage');
    // const { assets } = await MediaLibrary.getAssetsAsync({ album });
    // const verifyItem = assets.find(item => item.filename === status.fileNameExist);

    const { uri, status }: any = await downloadResumable.downloadAsync();
    const asset = await MediaLibrary.createAssetAsync(uri);

    if(status === 200){};

    try {
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Storage', {...asset}, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      };
    } catch (e) {};
  };

  return (
    <Styles.Container>
      <Masonry data={[media]} handleSelectItem={handleSelectItem} />
      <Modal
        style={{ margin: 0, backgroundColor: '#FFF' }}
        statusBarTranslucent
        animationIn="fadeIn"
        isVisible={state.modal}
        onBackButtonPress={() => setState({ ...state, modal: false })}>
          <ModalScreen progress={progress} state={state} handleDownload={handleDownload} />
      </Modal>
    </Styles.Container>
  );
};

export default Home;
