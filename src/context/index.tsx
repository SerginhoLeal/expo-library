import * as React from 'react';
import * as Props from './types';

import { useMedia } from '@hooks';

import Images from '../json/images.json';

const Context = React.createContext<Props.ContextProps>({} as Props.ContextProps);

export const ContextProvider: React.FC<Props.ContextProvider> = ({children}) => {
  const [media, setMedia] = React.useState<Array<object>>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true)
    useMedia({
      array:Images,
      screens:'home',
      folder:'Storage'
    })
      .then(setMedia)
      .finally(() => setLoading(false));
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
