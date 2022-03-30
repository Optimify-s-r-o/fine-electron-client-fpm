import axios from 'axios';

export const uploadAsync = ( link: string, file: File ) => {
  axios.put( link, file, {
    headers: {
      'Content-Type': file.type
    }
  } );
};

export const downloadAsync = () => { };
