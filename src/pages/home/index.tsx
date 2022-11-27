import * as React from 'react';
import * as Styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Masonry } from '@common';
import { useContext } from '@context';
import { RootStackParamList } from '@types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ProfileScreenNavigationProp = Props['navigation'];

export default function Home(){
  const { media } = useContext();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleSelectItem = (item: any) => navigation.navigate('Slider', { index: item.index })

  return (
    <Styles.Container>
      <Masonry screen='home' data={media} handleSelectItem={handleSelectItem} />
    </Styles.Container>
  );
};
