import {createStore} from 'redux';
import { status } from './actions/index';

var initializeState = {
	status: false,
	sort: {
		by: 'name',
		value: -1
	}
}

var myReducer = (state = initializeState, action) => {
	if (action.type == "TOGGELE_STATUS") {
		state.status = !state.status;
		return state;
	}
	return state;
}

const store = createStore(myReducer);
console.log('Default store :' + store.getState());

// var action = {type: "TOGGELE_STATUS"};
store.dispatch(status());
console.log(store.getState());