import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

/**
 * Teste
 */
type DownloadProps = {
  url: string;
  creator: string;
  mediaType: string;
};

const NAME_FOLDER = 'Storage';

export const useDownloads = async ({ url, creator, mediaType }: DownloadProps) => {
  const downloadResumable: FileSystem.DownloadResumable = FileSystem.createDownloadResumable(
    url, `${FileSystem.documentDirectory}${creator}${mediaType}`, {}, //callback
  );

  const album = await MediaLibrary.getAlbumAsync(NAME_FOLDER);

  const { uri, status }: any = await downloadResumable.downloadAsync();
  const asset = await MediaLibrary.createAssetAsync(uri);

  if(status === 200){};

  try {
    if (album == null) {
      await MediaLibrary.createAlbumAsync(NAME_FOLDER, asset, false);
      return({ status: 200, response: true })
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      return({ status: 200, response: true })
    };
  } catch (e) {
    return({ status: 400, response: false })
  };
};
