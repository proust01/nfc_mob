import createDataContext from './createDataContext'
import axios from '../api/axios'

const tagReducer = (state, action) => {
    switch (action.type) {
        case 'tagon':
            return { ...state, tag_id: action.payload }
        default:
            return state;
    }
}

const tagon = dispatch => async ({ tag_id })  => {
    try {
        const response = await axios.post('/nfctag', { tag_id })
        console.log(response.data)
    
        dispatch({ type: 'tagon', payload: response.data.tag_id })
    } catch (err) {
        console.log(err.Message, 'something wrong with Tag On')
    }
}


export const { Context, Provider } = createDataContext(
    tagReducer,
    { tagon },
    { tag_id: 0 }
)

