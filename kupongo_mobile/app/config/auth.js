/**
 * Handles remembering if the user was logged in.
 */

import { AsyncStorage } from "react-native";
export const onSignIn = (userInfo) => AsyncStorage.setItem('login', JSON.stringify(userInfo));
export const onSignOut = () => AsyncStorage.removeItem('login');
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('login')
        .then(res => {
          if (res !== null) {
            resolve(JSON.parse(res));
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
  });
};
