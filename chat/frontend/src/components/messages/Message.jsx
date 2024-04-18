import React from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import CallComponent from "./CallComponent";

const Message = ({ message,acceptVideoCall }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";
	if(message.message=="@rfvc!"){
		message.message="Calling ..."
	}
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='user' src="https://res.cloudinary.com/dygst600u/image/upload/v1710214518/friendsHub/nvjd69xjdliflwdv2h6t.png" />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{!fromMe && message.message == "@rfvc!" ? (
					<CallComponent acceptVideoCall={acceptVideoCall}/>
					
				) : (
					<div>{message.message}</div>
				)}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

export default Message;
