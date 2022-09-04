import * as React from 'react';
import * as Styles from './styles';

import { useContext } from '@context';

import { Masonry, ModalScreen } from '@common';

const Home: React.FC = () => {
  const { media } = useContext();

  const [state, setState] = React.useState({
    id:0,
    url:'',
    mediaType:'',
    index:0,
    screen: '',
    creator:'',
    modal:false,
    downloaded:false,
  });

  const handleSelectItem = (item: any) => setState({
    ...state,
    ...item,
    modal: true,
    screen: 'data',
    creator: `${item.id}_${item.createby}`,
  });

  return (
    <Styles.Container>
      <Masonry screen='data' data={media} handleSelectItem={handleSelectItem} />
      <ModalScreen
        data={media}
        state={state}
        onBackButtonPress={() => setState({ ...state, modal: false })}
      />
    </Styles.Container>
  );
};

export default Home;
