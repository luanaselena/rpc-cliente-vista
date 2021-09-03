import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const DropdownFilter = () => {
	return (
		<>
			<label>Columna</label>
			<Form.Select aria-label="Columna">
				<option>Columna</option>
				<option value="id">ID</option>
				<option value="nombre">Nombre</option>
				<option value="droga">Droga</option>
				<option value="tipo">Tipo</option>
				<option value="activo">Activo</option>
			</Form.Select>

			<label>Tipo filtro</label>
			<Form.Select aria-label="Default select example">
				<option>Open this select menu</option>
				<option value="1">Default</option>
				<option value="2">Comienza con</option>
				<option value="3">Termina con</option>
			</Form.Select>
		</>
	);
};

export default DropdownFilter;
