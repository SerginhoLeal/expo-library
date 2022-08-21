import * as React from 'react';
import * as ExpoAv from 'expo-av';
import * as Styled from './styles';
import * as Native from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import Modal from 'react-native-modal';

import { Icon, Masonry } from '@common';

import { normalie } from '@mocks';

const ModalContent = ({ state }: any) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  if(state.type === 'video'){
    return  <ExpoAv.Video ref={video} source={{ uri: state.url }} style={{ flex: 1 }} useNativeControls resizeMode="contain" isLooping onPlaybackStatusUpdate={status => setStatus(() => status)} />
  };
  return <Native.Image style={{ flex: 1 }} resizeMode='contain' source={{ uri: state.url }} />;
};

const Home: React.FC = () => {
  const [state, setState] = React.useState({ url:'', creator:'', modal:false, type:'' });

  const handleDownload = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync()
    if(granted) await MediaLibrary.getAlbumsAsync();

    const fileUri: string = `${FileSystem.documentDirectory}${state.creator}${state.type === 'video' ? '.mp4' : '.png'}`;
    const { uri, status }: FileSystem.FileSystemDownloadResult = await FileSystem.downloadAsync(state.url, fileUri);
    // console.log('uri: ', uri);
    

    // let options = { encoding: FileSystem.EncodingType.Base64 };
    // FileSystem.readAsStringAsync(fileUri, options).then(data => {
    //   const base64 = 'data:image/jpg;base64' + data;
    //   console.log(base64);
      
    //   resolve(base64); // are you sure you want to resolve the data and not the base64 string? 
    // }).catch(err => {
    //   console.log("​getFile -> err", err);
    //   reject(err) ;
    // });

    if(status === 200){

    }

    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
    // console.log('asset: ', asset);
      const album = await MediaLibrary.getAlbumAsync('Storage');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Storage', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch (e) {}
  };

  const handleSelectItem = (item: any) => setState({ ...state, modal: true, creator: item.createby, url: item.url, type: item.type });

  return (
    <React.Fragment>
      <Styled.Container>
        <Masonry data={normalie} handleSelectItem={handleSelectItem} />
      </Styled.Container>

      <Modal animationIn="fadeIn" style={{ padding: 0, margin: 0, backgroundColor: '#fff' }} isVisible={state.modal} onBackButtonPress={() => setState({ ...state, modal: false })}>
        <ModalContent state={state} />
        <Native.TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10, padding: 10, borderRadius: 2, backgroundColor: '#505050aa' }} onPress={handleDownload}>
          <Icon name='download' size='50' />
        </Native.TouchableOpacity>
      </Modal>

    </React.Fragment>
  );
};

export default Home;
