import React, { useEffect, useRef, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Button } from "@mui/material";
import VideoCall from "./VideoCall";
import { useSocketContext } from "../../context/SocketContext";
import useSendMessage from "../../hooks/useSendMessage";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { authUser } = useAuthContext();
	const { sendMessage } = useSendMessage();
	const { acceptCall } = useSocketContext();
	const localVideoRef = useRef(null);
	const [isVideoCallActive, setIsVideoCallActive] = useState(false);

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	useEffect(() => {
		if (localVideoRef.current) {
			console.log("Video element is available:", localVideoRef.current);
		}
	}, [localVideoRef]);

	const startVideoCall = async () => {
		try {
			await sendMessage("@rfvc!");
			setIsVideoCallActive(true);
		} catch (error) {
			console.error("Error accessing media devices:", error);
		}
	};

	const closeVideoCall = () => {
		setIsVideoCallActive(false);
	};

	const acceptVideoCall = () => {
		setIsVideoCallActive(true);
	};

	return (
		<div className="md:min-w-[600px] flex flex-col">
			{!selectedConversation ? (
				<NoChatSelected authUser={authUser} />
			) : (
				<>
					<div className="bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between">
						<span className="text-gray-900">{selectedConversation.username}</span>
						<Button variant="contained" onClick={startVideoCall}>
							<VideocamIcon />
						</Button>
					</div>
					<Messages acceptCall={acceptVideoCall} />
					<MessageInput />
					{isVideoCallActive && <VideoCall closeCall={closeVideoCall} />}
				</>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = ({ authUser }) => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-black-700 font-semibold flex flex-col items-center gap-2">
				<p>Welcome {authUser.username}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl md:text-6xl text-center" />
			</div>
		</div>
	);
};
