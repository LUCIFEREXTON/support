import './App.css';
import MainPage from './Screen/MainPage.jsx';
import { BrowserRouter as Router } from "react-router-dom";

function App(){
  return (
		<Router>
			<div className='dashboard-screen-card'>
				<MainPage/>
			</div>
		</Router>
	);
}

export default App;
