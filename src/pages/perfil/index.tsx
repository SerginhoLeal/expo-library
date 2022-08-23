import * as React from 'react';
import * as Native from 'react-native';
import * as Styles from './styles';
import * as MediaLibrary from 'expo-media-library';

import { Icon, Masonry } from '@common';

import { useFocusEffect } from '@react-navigation/native';

type Props = {
  quantity: number;
  response: any[];
  status: string | null;
};

const Folder: React.FC = () => {
  const [folder, setFolder] = React.useState<Props>({
    quantity: 0,
    response: [],
    status: null,
  });

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
      .then(response => setFolder({
        ...folder,
        quantity: response.assets.length,
        response: response.assets,
      }))
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
        <Masonry data={[folder]} handleSelectItem={() => {}} />
      )}
    </Styles.Container>
  );
};

export default Folder;


// https://github.com/Joshandrews43/media-library-issue/blob/main/useGetAssets.ts