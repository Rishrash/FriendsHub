import { useEffect, useRef, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Button, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideoCall from "./VideoCall";
import { useSocketContext } from "../../context/SocketContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const localVideoRef = useRef(null);
	const [isVideoCallActive, setIsVideoCallActive] = useState(false);
	let localStream;
	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	useEffect(() => {
		// Check if localVideoRef is available before accessing it
		if (localVideoRef.current) {
			// Perform actions with localVideoRef.current
			console.log("Video element is available:", localVideoRef.current);
		}
	}, [localVideoRef]);

	const startVideoCall = async () => {
		try {
			setIsVideoCallActive(true);

		} catch (error) {
			console.error("Error accessing media devices:", error);
		}
	};

	const closeVideoCall = () => {
		// localStream.getTracks().forEach((track) => track.stop());
		console.log("calling close");
		setIsVideoCallActive(false);
	};

	return (
		<div className="md:min-w-[600px] flex flex-col">
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<div className="bg-slate-500 px-4 py-2 mb-2 flex items-center justify-between">
						<span className="text-gray-900">{selectedConversation.username}</span>
						<Button variant="contained" onClick={startVideoCall}>
							<VideocamIcon />
						</Button>
					</div>
					<Messages />
					<MessageInput />
					{isVideoCallActive && <VideoCall closeCall={closeVideoCall} />}
				</>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
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
