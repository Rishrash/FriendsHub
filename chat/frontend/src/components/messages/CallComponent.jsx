import React, { useState } from 'react';
import VideoCall from './VideoCall';

const CallComponent = (props) => {
	const [callStatus, setCallStatus] = useState(null);
	const handleDeclineCall = () => {
		setCallStatus("declined")
	}
	const handlePickupCall = () => {
		setCallStatus("picked")
		setIsVideoCallActive(true)
	}
	const closeVideoCall = () => {
		setIsVideoCallActive(false);
	};
	const [isVideoCallActive, setIsVideoCallActive] = useState(false);
	return (
		<div className="flex items-center justify-center">
			{callStatus === 'picked' ? (
				<div className="bg-green-200 p-4 rounded-md">Call picked up</div>
			) : callStatus === 'declined' ? (
				<div className="bg-red-200 p-4 rounded-md">Call declined</div>
			) : (
				<div className="flex">
					<button
						onClick={handlePickupCall}
						className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
					>
						Pick up
					</button>
					<button
						onClick={handleDeclineCall}
						className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
					>
						Decline
					</button>
				</div>
			)}
			{isVideoCallActive && <VideoCall closeCall={closeVideoCall} who={"reciever"} />}
		</div>
	);
};

export default CallComponent;
