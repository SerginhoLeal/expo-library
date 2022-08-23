import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';

import { Images } from '@mocks';

type ContextProvider = { children: React.ReactNode };

type ContextProps = {
  media: any[];
  loading: boolean;
};

const Context = React.createContext<ContextProps>({} as ContextProps);

export const ContextProvider: React.FC<ContextProvider> = ({children}) => {

  const [media, setMedia] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const checkingDownloadedItems = async() => {
    setLoading(true)
    const album = await MediaLibrary.getAlbumAsync('Storage');

    if(album === null){
      return console.log('album === null');
    };

    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: ["video", "photo"],
      album,
    });

    const mappingAssets = assets.map(response => response.filename.slice(0, 1));

    const response: any[] = Images.map(images => ({
      ...images,
      downloaded: mappingAssets.includes(`${images.id}`)
    }));

    return ({ response });
  };

  React.useEffect(() => {
    checkingDownloadedItems()
      .then(setMedia)
      .finally(() => setLoading(false))
  }, []);

  const contexts = {
    media,
    loading,
  };

  return (
    <Context.Provider value={contexts}>
      {children}
    </Context.Provider>
  );
};

export const useContext = () => {
  const context = React.useContext(Context);
  return context;
};
