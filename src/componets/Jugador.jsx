function Jugador({nombre, rol, activo}){
    return(
        <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom :"10px"}}>
            <p><strong>Nombre: </strong> {nombre}</p>
            <p><strong>Rol: </strong> {rol}</p>
            <p>
                <strong>Estado: </strong> {" "}
                {activo ? "Activo" : "Inactivo"}
            </p>
        </div>
    );
}

export default Jugador;