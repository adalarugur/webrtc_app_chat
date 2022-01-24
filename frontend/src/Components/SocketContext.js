import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Peer } from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost.com:5000');

const ContextProvider = ({ children }) => {
    const [state, setStream] = useState(null)
    const [me, setMe] = useState('');
    const [call, setCall] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    //reference = video on iframe
    const myVideo = useRef();
    const userVideo = useRef();


    //video call funcs
    useEffect(() => {
        //lifecycle, first loading mic and cam permisions

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('me', (id) => setMe(id));
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });

    }
    /*empty dependency array*/, []
    );

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({initiator: false, trickle: false, stream });

        peer.on('signal',(data) =>{
            socket.emit('answercall',{signal: data, to: call.from});
        } );

        peer.on('stream', (currentStream)=> {
            //other user video stream 
            userVideo.current.srcObject = currentStream;
        });
    }

    const callUser = () => {

    }

    const leaveCall = () => {

    }


};