// In your navigator configuration file
import React from 'react';
import ProfileLoginButton from './ProfileLoginButton';

export const getScreenOptions = (navigation) => ({
  headerRight: () => <ProfileLoginButton navigation={navigation} />,
});
