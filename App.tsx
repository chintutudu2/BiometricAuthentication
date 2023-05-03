import {SafeAreaView, Button, Alert} from 'react-native';
import React from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

const App = () => {
  const onBiometricLibraryPressed = async () => {
    const {available, biometryType} = await rnBiometrics.isSensorAvailable();
    if (available && biometryType === BiometryTypes.FaceID) {
      rnBiometrics
        .simplePrompt({promptMessage: 'Authenticate with your biometrics'})
        .then(resultObject => {
          const {success} = resultObject;

          if (success) {
            Alert.alert('successful biometrics provided');
          } else {
            Alert.alert('user cancelled biometric prompt');
          }
        })
        .catch(() => {
          Alert.alert('biometrics failed');
        });
    }
  };

  // const onBiometricNativePressed = () => {
  //   console.log('Native');
  // };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Biometric With Library"
        onPress={onBiometricLibraryPressed}
      />
      {/* <Button
        title="Biometric With Native"
        onPress={onBiometricNativePressed}
      /> */}
    </SafeAreaView>
  );
};

export default App;
