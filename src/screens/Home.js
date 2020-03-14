import React, { useState, useEffect, useReducer } from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Icon, ListItem, Header} from 'react-native-elements';
import axios from '../api/axios'
import Spacer from './Spacer';

const Home = () => {
  
  const defaultValue = []

  const tagReducer = (state, action) => {
    switch(action.type) {
      case 'get_tag_info':
        return [...state, ...action.payload]
        case 'clear_state':
          return [...defaultValue]
      default:
        return state;
    }
  }
  const [userName, setUserName] = useState('')
  const [state, dispatch] = useReducer(tagReducer, defaultValue)


  const getUserData = async () => {
    try {
      const tagInfo = await axios.get('/nfctag')
      const userInfo = await axios.get('/')
      // console.log(tagInfo.data)
      // console.log(userInfo.data.email)
      setUserName(userInfo.data.email)
      dispatch({ type: 'clear_state' })
      dispatch({ type: 'get_tag_info', payload: tagInfo.data})
      // console.log(state)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    getUserData()
  }, [])

const list = [...state]

/////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View>
      <Header
        leftComponent={<Icon
          name='phonelink_ring'
          type='material'
          color='#fff'
        />}
        centerComponent={{text: 'My Records', style: {fontSize: 25, color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      <Spacer />
      <Text h4 style={style.header}>
        Hi, {userName}
      </Text>

      <Spacer />
      {list.map((l, i) => (
        <ListItem
          key={i}
          leftIcon={'flight-takeoff'}
          title={l.tag_id}
          subtitle={l.dateSent}
          bottomDivider
          chevron
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 15,
    marginLeft: 15,
  },
});

export default Home;
