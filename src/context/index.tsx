import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';

import { Images } from '@mocks';

type ContextProvider = { children: React.ReactNode };
/**
 * Teste de interface, quando você passar o mouse em cima da propriedade, esse texto aparece
 */
interface ContextProps {
  media: {
    data: any[]
  };
  setMedia: (media: any) => void;
  loading: boolean;
};

const Context = React.createContext<ContextProps>({} as ContextProps);

export const ContextProvider: React.FC<ContextProvider> = ({children}) => {

  const [media, setMedia] = React.useState<{ data: Array<object> }>({
    data: []
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const checkingDownloadedItems = async() => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if(granted) await MediaLibrary.getAlbumsAsync();

    setLoading(true);
    const album = await MediaLibrary.getAlbumAsync('Storage');

    if(album === null){
      return ({
        status: 404,
        message: "Arquivo não encontrado",
        data: Images.map((images, index) => ({ ...images, downloaded: false, index }))
      })
    };

    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: ["video", "photo"],
      album,
    });

    const mappingAssets = assets.map(data => data.filename.slice(0, 1));

    const data: any[] = Images.map((images, index) => ({
      ...images,
      downloaded: mappingAssets.includes(`${images.id}`),
      index
    }));

    return ({
      status: 200,
      data
    });
  };

  React.useEffect(() => {
    checkingDownloadedItems()
      .then(setMedia)
      .finally(() => setLoading(false))
  }, []);

  const contexts = {
    media,
    setMedia,
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
