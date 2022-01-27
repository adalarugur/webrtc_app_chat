import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Peer } from 'simple-peer';

const SocketContext = createContext();
const socket = io('https://warm-wildwood-81069.herokuapp.com');

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);   
    const [me, setMe] = useState(''); 
    const [call, setCall] = useState({});    
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
   
    //reference = video on iframe
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    //video call funcs
    useEffect(() => {
        //lifecycle, first loading mic and cam permisions

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                debugger;
                setStream(currentStream);
                console.log('media stream :', currentStream);             
               

                    myVideo.current.srcObject = currentStream;                
                   
            });

        socket.on('me', (id) => setMe(id));
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });

    }
    /*empty dependency array*/, [] );

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            //other user video stream 
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {

        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            //other user video stream 
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;


    }

    const leaveCall = () => {

        setCallEnded(true);

        connectionRef.current.destroy();
        no-undef
        window.location.reload();

    }

    return (
        <SocketContext.Provider value={{
          call,
          callAccepted,
          myVideo,
          userVideo,
          stream,
          name,
          setName,
          callEnded,
          me,
          callUser,
          leaveCall,
          answerCall,
        }}
        >
          {children}
        </SocketContext.Provider>
      );
};

export { ContextProvider, SocketContext };