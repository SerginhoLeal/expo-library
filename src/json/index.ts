const images = require('./images.json');
type ImagesProps = {
  id:string;
  width:number;
  height:number;
  mediaType:string;
  filename:string;

  uri:string;
  index:number;
  albumId:string;
  duration:number;
  creationTime:number;
  modificationTime:number;
};

export {
  images,
  ImagesProps
};