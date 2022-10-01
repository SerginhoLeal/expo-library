import * as React from 'react';
import * as Styles from './styles';

import { useContext } from '@context';

import { Masonry, ModalScreen } from '@common';

const Home: React.FC = () => {
  const { media } = useContext();

  const [state, setState] = React.useState({ index:0, modal:false });
  
  const handleSelectItem = (item: any) => setState({ ...state, index: item.index, modal: true });

  return (
    <Styles.Container>
      <Masonry screen='home' data={media} handleSelectItem={handleSelectItem} />
      <ModalScreen screen='home' data={media} state={state} onBackButtonPress={() => setState({ ...state, modal: false })} />
    </Styles.Container>
  );
};

export default Home;
