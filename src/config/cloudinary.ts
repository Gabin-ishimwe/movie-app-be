import { v2 as cloudinary } from 'cloudinary';
import authConfig from './authConfig';

cloudinary.config({
  cloud_name: authConfig().cloudinaryName,
  api_key: authConfig().cloudinaryApiKey,
  api_secret: authConfig().cloudinaryApiSecret,
});

export default cloudinary;
