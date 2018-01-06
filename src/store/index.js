import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	isLogin: false
}

const actions = {
	changeLogin: ({ state }, data) => new Promise(resolve => {
		state.isLogin = data;
		resolve();
	})
}


export default new Vuex.Store({
	state,
	actions
})