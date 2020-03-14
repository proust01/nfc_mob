import React, { useContext } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import MapView from 'react-native-maps'
import {Text, Button, Header} from 'react-native-elements';
import Spacer from './Spacer';
import { Context } from '../context/authContext'

const Account = () => {
  const { signout } = useContext(Context)

  return (
    <View>
      <Header
        leftComponent={{icon: 'menu', color: '#fff'}}
        centerComponent={{text: 'My Account', style: {fontSize: 25, color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <Button title="Sign Out" onPress={signout} />
      <Spacer />
    </View>
  );
};

const style = StyleSheet.create({
    map: {
        height: 300
    }
})

export default Account;
