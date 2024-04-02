import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Validate from "./pages/check/Validate";

function App() {
	const { authUser } = useAuthContext();
	console.log(useAuthContext().toString());
	console.log("     ");
	console.log(authUser);
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/login/:id' element={authUser ? <Navigate to='/' /> : <Validate />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
