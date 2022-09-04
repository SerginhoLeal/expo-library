import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';

type Props = {
  array?: object[];
  screens: 'home' | 'perfil';
  folder: string;
};

export const useMedia = async({ array = [], screens = 'home', folder = 'Example' }: Props) => {
  const { granted } = await MediaLibrary.requestPermissionsAsync();
  if(granted) await MediaLibrary.getAlbumsAsync();

  const album = await MediaLibrary.getAlbumAsync(folder);

  const { assets } = await MediaLibrary.getAssetsAsync({
    mediaType: ["video", "photo"],
    album,
  });

  if(screens === 'perfil'){
    return assets.map((item, index) => ({ ...item, index }))
  };

  const mappingAssets = assets.map(data => data.filename.slice(0, 1));

  const data = array.map((images: any, index) => ({
    ...images,
    downloaded: mappingAssets.includes(`${images.id}`),
    index
  }))

  return data;
};