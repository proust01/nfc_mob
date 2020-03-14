import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import Spacer from './Spacer';
import { Context as AuthContext } from '../context/authContext'
import { navigate } from '../navigationRef'

const SignupScreen = ({ navigation }) => {

    const { state, signup, clearErrorMessage, tryLocalSignin } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {

        tryLocalSignin()
    }, []);

    return ( 
        <View style={style.container}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <Spacer />
            <Text h3>Signup Up for NFC</Text>
            <Spacer />
            <Input label="Email" label="Email" value={email} onChangeText={setEmail} />
            <Spacer />
            {/* <Input label="User Name" label="User Name" value={username} onChangeText={setUsername} />
            <Spacer /> */}
            <Input label="Password" secureTextEntry label="Password" value={password} onChangeText={setPassword} />
            
            {state.errorMessage ? <Text style={style.errorMessage}>{state.errorMessage}</Text> : null}
            <Spacer />
            <Button title="Sign Up" onPress={() => signup({email, password})} />
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text style={style.link}>Already signed up? Go to Sign In</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={style.link}>Go to NFC Tag?</Text>
            </TouchableOpacity> */}
        </View>
     );
}

SignupScreen.navigationOptions = () => {
    return {
      headerShown: true
    };
  };

const style = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        marginBottom: 250
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    link: {
        color: 'blue',
        marginLeft: 15,
        marginTop: 15
    }
})

export default SignupScreen;