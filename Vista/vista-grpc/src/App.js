import TablaMedicamentos from "./components/ui/TablaMedicamentos";
import TablaTipoMedicamentos from "./components/ui/TablaTipoMedicamentos";
import VerificarCodigo from "./components/ui/VerificarCodigo";
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
							<Nav.Link><Link className="linknavbar" to="/verificarcodigo">Verificar Codigo</Link></Nav.Link>
						</Nav>
					</Container>
				</Navbar>

				<Route exact path="/" component={TablaMedicamentos} />
				<Route
					exact
					path="/tiposmedicamentos"
					component={TablaTipoMedicamentos}
				/>
				<Route
					exact
					path="/verificarcodigo"
					component={VerificarCodigo}
				/>
			</div>
		</Router>
	);
}

export default App;
