import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Chat = () => {
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-100 text-black bg-clip-padding text-black-700'>
			<Sidebar />
			<MessageContainer />
		</div>

	);
};
export default Chat;
