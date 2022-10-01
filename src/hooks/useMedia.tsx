import * as MediaLibrary from 'expo-media-library';

type Props = {
  array?: object[];
  screens: 'home' | 'perfil';
};

const NAME_FOLDER = 'Storage';

export const useMedia = async({ array = [], screens = 'home' }: Props) => {
  const { granted } = await MediaLibrary.requestPermissionsAsync();
  if(granted) await MediaLibrary.getAlbumsAsync();

  const album = await MediaLibrary.getAlbumAsync(NAME_FOLDER);

  if(album === null && screens === 'perfil'){
    return [];
  };

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