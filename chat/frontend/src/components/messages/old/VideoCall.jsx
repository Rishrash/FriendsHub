import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

function VideoCall({ closeCall }) {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext()


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
    }, []);

    const endCall = () => {
    // Update state to indicate call ended
    setCallEnded(true);

    // Stop all tracks synchronously
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    // Perform additional cleanup actions, if any
    closeCall();
};
    console.log(onlineUsers);
    return (
        <>
            <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg w-9/10 h-9/10 max-w-none max-h-none transform">
                    <h1 className="text-xl font-semibold mb-4">Video Call</h1>
                    <div>
                        Hi your id :{authUser._id}<br></br>
                        Sendiing call to: {selectedConversation._id}
                        <div className="video">
                            {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                        </div>
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
