import Vue from 'vue';
import Vuex from 'vuex';
import chatHistory from './synthetic-history'

Vue.use(Vuex);

const SOCKET_STATE_OPEN = 'open';
const SOCKET_STATE_ERROR = 'error';
const SOCKET_STATE_CLOSE = 'close';

export const store = new Vuex.Store({
    namespaced: true,
    state: {
        username: localStorage.getItem('username') || '',
        options: {
            notifySound: localStorage.getItem('notify_sound') ? localStorage.getItem('notify_sound') === 'true' : true,
        },
        users: {},
        messages: process.env.NODE_ENV !== 'production' ? chatHistory : [],
        message: '',
        mention: '',
        socket: {
            state: SOCKET_STATE_CLOSE,
            message: ''
        }
    },
    getters: {
        socketState(state) {
            return state.socket.state;
        },
        isSocketActiveState(state) {
            return state.socket.state === SOCKET_STATE_OPEN;
        },

        isLoggedIn: state => !!state.username,
        username: state => state.username,
        message: state => state.message,
        mention: state => state.mention,
        getMessages: state => state.messages,
        getMessagesCount: state => state.messages.length,
        getHumanMessages: state => {
            return state.messages.filter(message => {
                return Object.prototype.hasOwnProperty.call(message, 'name')
            });
        },
        getUsers: (state, getters) => {
            //todo: парсить "пришёл"/"ушёл". А пока так.
            return Array.from(new Set(getters.getHumanMessages.map(obj => obj['name'])))
        },
        notifySound: state => state.options.notifySound,
    },
    mutations: {
        SOCKET_ONOPEN: (state, event) => {
            state.socket.state = SOCKET_STATE_OPEN;
            console.log(state, event)
        },
        SOCKET_ONMESSAGE: (state, message) => {
            console.log(message)
            if ('text' in message) {
                state.messages.push(message);
            }
        },
        SOCKET_RECONNECT: (state, event) => {
            console.log(state, event)
        },
        SOCKET_ONERROR: (state, event) => {
            state.socket.state = SOCKET_STATE_ERROR;
            console.log('error' + event)
        },
        SOCKET_ONCLOSE: (state, event) => {
            console.log('close' + event)
            state.socket.state = SOCKET_STATE_CLOSE;
        },

        AUTH_SUCCESS: (state, user) => {
            state.username = user
        },

        LOGOUT: (state) => {
            state.username = ''
        },

        MESSAGE: (state, message) => {
            state.message = message;
        },
        MENTION: (state, mention) => {
            state.mention = mention;
        },

        NOTIFY_SOUND(state, isEnabled) {
            state.options.notifySound = isEnabled;
        }
    },
    actions: {
        login({commit}, username) {
            commit('AUTH_SUCCESS', username)
            localStorage.setItem('username', username)
        },

        logout({commit}) {
            commit('LOGOUT')
            localStorage.removeItem('username')
        },

        notifySound(state, isEnabled) {
            state.commit('NOTIFY_SOUND', isEnabled);
            localStorage.setItem(`notify_sound`, isEnabled)
        }
    },
    strict: process.env.NODE_ENV !== 'production'
});