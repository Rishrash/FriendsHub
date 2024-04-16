import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import SimplePeer from "simple-peer"


function VideoCall({ closeCall }) {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const { onlineUsers, socket } = useSocketContext()

    const callUser = () => {
        const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: stream
        });
        peer.on("signal", (data) => {
            console.log("logging data");
            console.log({
                userToCall: selectedConversation._id,
                signalData: data,
                from: authUser._id,
                name: authUser.username
            });
            socket.emit("callUser", {
                userToCall: selectedConversation._id,
                signalData: data,
                from: authUser._id,
                name: authUser.username
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }


    const endCall = () => {
        // Update state to indicate call ended
        setCallEnded(true);
        //connectionRef.current.destroy()
        // Stop all tracks synchronously
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        // Perform additional cleanup actions, if any
        closeCall();
    };


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                if (myVideo.current) {
                    myVideo.current.srcObject = stream;
                }
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });

        setMe(authUser._id);
        setName(authUser.username);

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });

        console.log("selected to call : " + selectedConversation._id);

    }, []); // Empty dependency array to run once


    console.log("me : " + authUser._id + " name:" + authUser.username);


    return (
        <>
            <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg w-9/10 h-9/10 max-w-none max-h-none transform">
                    <h1 className="text-xl font-semibold mb-4">Video Call</h1>
                    <div>
                        Hi your id :{authUser._id}<br></br>
                        Sendiing call to: {selectedConversation._id}
                        {/* <div className="video">
                            {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                        </div> */}

                        <div className="video-container">
                            <div className="video">
                                {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                            </div>
                            <button onClick={callUser}>
                                Call
                            </button>
                            <div className="video">
                                {callAccepted && !callEnded ?
                                    <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> :
                                    null}
                            </div>
                        </div>
                    </div>
                    <div>
                        {receivingCall && !callAccepted ? (
                            <div className="caller">
                                <h1 >{name} is calling...</h1>
                                <button onClick={answerCall}>
                                    Answer
                                </button>
                            </div>
                        ) : null}
                    </div>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={endCall}
                    >
                        Close
                    </button>
                </div>
            </div>

        </>
    );
}

export default VideoCall;
