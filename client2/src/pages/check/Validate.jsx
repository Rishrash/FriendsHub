import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useLogin from '../../hooks/validateToken';

const Validate = () => {
	const { id } = useParams();
	const { loading, login } = useLogin();

	const check = async () => {
		console.log("calling checks");
		await login(id);
	};

	useEffect(() => {
		check();
	}, []);

	return (
		<div>
			{loading ? <p>Loading...</p> : <p>Validating</p>}
		</div>
	);
};

export default Validate;
