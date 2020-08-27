import { connect } from 'socket.io-client';

const socket = connect(`${process.env.REACT_APP_CHAT}/chat`, { path: '/socket.io'});

export default socket;