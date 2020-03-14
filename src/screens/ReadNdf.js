import React from 'react';
import {View, TouchableOpacity, Vibration} from 'react-native';
import {Text, Button, Overlay, Header} from 'react-native-elements';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

// import { Context } from '../context/tagContext'
import axios from '../api/axios'
import Spacer from './Spacer';


const DURATION = 1000;

class AppV2 extends React.Component {

  state = {
    tag_id: '',
    isVisible: false,
  };

  handleTagon = async () => {
    try {
      const response = await axios.post('/nfctag', { tag_id: this.state.tag_id })
      console.log(response.data, typeof(response.data))
    } catch (err) {
      console.log({ error: 'something wrong with Tag On' })
    }
  }

  handleMessage = () => {
    this.setState({
      tag_id: '',
    });
  };

  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('tag', tag);
      this.setState({
        tag_id: tag.id,
        isVisible: true,
      });
      this.handleTagon();
      Vibration.vibrate(DURATION);
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{text: 'NFC TAG', style: {fontSize: 25, color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <Spacer />
        <Text h4>Confirm your work today</Text>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Button style={{padding: 20}} title="Enable Tag" onPress={this._test} />
        <Spacer />
        <Button title="Disable Tag" disabled='true' onPress={this._cancel} />
        <Spacer />
        {/* <Text h5>{this.state.tag}</Text>
        <Spacer /> */}
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({isVisible: false})}>
          <Spacer />
          <Text h3>You're Tagged!!</Text>
          <Spacer />
          <Text h4>ID : {this.state.tag_id}</Text>
          <Spacer />
          <Text h4>Welcome to the Site</Text>
          <Spacer />
          <Text h4>Have a good day</Text>
          <Spacer />
          <Button
            title="Remove"
            onPress={() => this.setState({isVisible: false})}
          />
        </Overlay>
      </View>
    );
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  _test = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };
}

export default AppV2;
