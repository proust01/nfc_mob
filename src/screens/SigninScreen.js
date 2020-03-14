import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import Spacer from './Spacer'
import { Context } from '../context/authContext'

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={style.container}>
            <Spacer />
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <Text h3>Sign In for NFC</Text>
            <Spacer />
            <Input label="Email" value={email} onChangeText={setEmail}/>
            <Spacer />
            <Input secureTextEntry label="Password" value={password} onChangeText={setPassword} />
            <Spacer />
            {state.errorMessage ? <Text style={style.errorMessage}>{state.errorMessage}</Text> : null}
            <Spacer />
            <Button title="Sign In" onPress={() => signin({email, password})}/>
            <Spacer />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={style.link}>Haven't Signed Up? Go to Sign Up</Text>
            </TouchableOpacity>
        </View>
     );
}

SigninScreen.navigationOptions = () => {
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
 
export default SigninScreen;