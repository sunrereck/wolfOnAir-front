import { connect } from 'socket.io-client';

const socket = connect('http://localhost:4000/chat', { path: '/socket.io'});

export default socket;