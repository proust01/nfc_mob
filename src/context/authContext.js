import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import axios from '../api/axios'
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error-message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
}

const signup = (dispatch) => async ({email, password}) => {
    try { 
        const response = await axios.post('/signup', {email, password})
        console.log(response.data)
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ type: 'signin', payload: response.data.token})

        navigate('Home')

    } catch (err) {
        dispatch({ type: 'add_error', payload: 'something wrong with signup'})
    }
}
const signin = (dispatch) => async ({email, password}) => {
    try { 
        const response = await axios.post('/signin', {email, password})
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ type: 'signin', payload: response.data.token})

        navigate('Home')
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'something wrong with signin'})
    }
}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    if(token) {
        dispatch({ type: 'signin', payload: 'token'})
        navigate('Home')
    } else {
        navigate('Signup')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('loginFlow');
  };

export const { Provider, Context } = createDataContext(
    authReducer,
    {signup, signin, signout, clearErrorMessage, tryLocalSignin},
    { token: null, errorMessage: '' }
)