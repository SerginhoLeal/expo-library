import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

/**
 * Teste
 */
type DownloadProps = {
  url: string;
  creator: string;
  mediaType: string;
  folder: string;
};

export const useDownloads = async ({ folder, url, creator, mediaType }: DownloadProps) => {
  const downloadResumable: FileSystem.DownloadResumable = FileSystem.createDownloadResumable(
    url, `${FileSystem.documentDirectory}${creator}${mediaType}`, {}, //callback
  );

  const album = await MediaLibrary.getAlbumAsync(folder);

  const { uri, status }: any = await downloadResumable.downloadAsync();
  const asset = await MediaLibrary.createAssetAsync(uri);

  if(status === 200){};

  try {
    if (album == null) {
      await MediaLibrary.createAlbumAsync(folder, asset, false);
      return({ status: 200, response: true })
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      return({ status: 200, response: true })
    };
  } catch (e) {
    return({ status: 400, response: false })
  };
};
