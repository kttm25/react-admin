import {createStore} from 'redux';
import {setUserReducer} from './reducers/setUSerReducer'

export const configureStore = () =>{
    return createStore(setUserReducer);
}