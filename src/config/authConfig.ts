export default () => ({
  secret: process.env.SECRET_KEY,
  signInToken: process.env.SIGNIN_TOKEN,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryApiEnvVariable: process.env.CLOUDINARY_API_ENV_VARIABLE,
  port: process.env.PORT,
});
