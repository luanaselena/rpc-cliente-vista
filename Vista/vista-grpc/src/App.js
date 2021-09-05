import TablaMedicamentos from "./components/ui/TablaMedicamentos";
import TablaTipoMedicamentos from "./components/ui/TablaTipoMedicamentos";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<ul>
					<li>
						<Link to="/">Medicamentos</Link>
					</li>
					<li>
						<Link to="/tiposmedicamentos">Tipos</Link>
					</li>
				</ul>
				<Route exact path="/" component={TablaMedicamentos} />
				<Route
					exact
					path="/tiposmedicamentos"
					component={TablaTipoMedicamentos}
				/>
			</div>
		</Router>
	);
}

export default App;
