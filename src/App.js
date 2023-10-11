import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import RegisterStudent from "./components/register_Student";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import ViewStudent from "./components/viewStudent";

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/addStudents" component={RegisterStudent} />
				<Route
					exact
					path="/editStudents/:student/:name/:fName/:registrationNo/:contact/:dob"
					component={RegisterStudent}
				/>
				<Route exact path="/viewStudents" component={ViewStudent} />
			</Switch>
		</div>
	);
}

export default App;
