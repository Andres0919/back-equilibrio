import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  console.log('process.env.PORT:', process.env.PORT);
  return {
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '5000', 10),
  };
});
