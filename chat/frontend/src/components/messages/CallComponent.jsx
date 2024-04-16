import React, { useState } from 'react';

const CallComponent = ({ acceptCall }) => {
	const [callStatus, setCallStatus] = useState(null);

	const handlePickupCall = () => {
		setCallStatus('picked');
		acceptCall(); // Ensure acceptCall is properly passed and invoked
	};

	const handleDeclineCall = () => {
		setCallStatus('declined');
		// Add logic for handling the call decline
	};

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
		</div>
	);
};

export default CallComponent;
