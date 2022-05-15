const authConfig = {
  secretSession: process.env.APP_SECRET || '',
  expiresIn: '1d',

  secretSocialKey: process.env.APP_SOCIAL_KEY || '',
};

export default authConfig;
