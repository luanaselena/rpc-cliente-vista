import TablaMedicamentos from "./components/ui/TablaMedicamentos";
import TablaTipoMedicamentos from "./components/ui/TablaTipoMedicamentos";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar bg="dark" variant="dark" className="mb-2">
					<Container>
						<Navbar.Brand href="/">Farmacia</Navbar.Brand>
						<Nav className="me-auto">
							<Nav.Link><Link className="linknavbar" to="/">Medicamentos</Link></Nav.Link>
							<Nav.Link><Link className="linknavbar" to="/tiposmedicamentos">Tipos</Link></Nav.Link>
						</Nav>
					</Container>
				</Navbar>

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
