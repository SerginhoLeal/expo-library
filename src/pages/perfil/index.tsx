import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Masonry } from '@common';
import { useFocusEffect } from '@react-navigation/native';

const {width: WIDTH_FOR_IMAGE, height: HEIGHT_FOR_IMAGE} = Native.Dimensions.get('window');

const Login = () => (
  <Styles.ContainerInput>
    <Styles.Tag>
      <Styles.Text>Insira o código</Styles.Text>
    </Styles.Tag>
    <Styles.Input placeholder='5a#5a9s*' />
  </Styles.ContainerInput>
);

const Logged = () => (<></>);

const Image = ({ item }: any) => {
  const width = WIDTH_FOR_IMAGE / 2.04;
  const height = item.height / (item.width / width);

  return <Native.Image style={{ width: width, height: height, marginBottom: 2, borderRadius: 2 }} source={{ uri: item.url }} />;
};

const Perfil: React.FC = () => {
  const auth = true;

  const [folder, setFolder] = React.useState({
    quantity: 0,
    images: []
  });
  
  const refreshAssets = async (numAssets = 50) => {
    const album = await MediaLibrary.getAlbumAsync('Storage');

    if(album === undefined){
      return console.log('não existe');
    };

    await MediaLibrary.getAssetsAsync({
      mediaType: ["video", "photo"],
      first: numAssets,
      album,
    })
      .then(response => setFolder({ ...folder, images: response.assets }))
      .catch((e) => console.log(e));
  };

  useFocusEffect(React.useCallback(() => {
    refreshAssets();
  }, []));

  return (
    <Styles.Container>

    <Masonry data={[folder]} handleSelectItem={() => {}} />

    </Styles.Container>
  );
};

export default Perfil;


// https://github.com/Joshandrews43/media-library-issue/blob/main/useGetAssets.ts