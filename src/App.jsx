import { useState } from "react";

function AlumnoPorId() {
  const [id, setId] = useState("");
  const [alumno, setAlumno] = useState(null);
  const [error, setError] = useState(null);

  const buscarAlumno = () => {
    if (id === "") return;

    setError(null);
    setAlumno(null);

    fetch(`https://servidorclasedaw.onrender.com/alumno13/alumnos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Alumno no encontrado");
        }
        return response.json();
      })
      .then((data) => setAlumno(data))
      .catch((err) => setError(err.message));
  };


  const [nuevoAlumno, setNuevoAlumno] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    edad: "",
    sexo: "",
    curso: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoAlumno({
      ...nuevoAlumno,
      [name]: value
    });
  };

  const masAlumnos = () => {
    setMensaje("");

    fetch("https://servidorclasedaw.onrender.com/alumno13/alumnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...nuevoAlumno,
        edad: Number(nuevoAlumno.edad)
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el alumno");
        }
        return response.json();
      })
      .then(() => {
        setMensaje("Alumno añadido correctamente");
        setNuevoAlumno({
          nombre: "",
          apellido1: "",
          apellido2: "",
          edad: "",
          sexo: "",
          curso: ""
        });
      })
      .catch((err) => setMensaje(err.message));
  };

  return (
    <div>
      <header>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/alumnos">Listado de Alumnos</a></li>
          <li><a href="/alumno-por-id">Buscar Alumno por ID</a></li>
        </ul>
      </header>

      <h2>Buscar alumno por ID</h2>

      <input
        type="number"
        placeholder="Introduce ID del alumno"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={buscarAlumno}>Buscar</button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {alumno && (
        <div>
          <h3>Datos del alumno</h3>
          <p>Nombre: {alumno.nombre}</p>
          <p>Apellidos: {alumno.apellido1} {alumno.apellido2}</p>
          <p>Edad: {alumno.edad}</p>
          <p>Sexo: {alumno.sexo}</p>
          <p>Curso: {alumno.curso}</p>
        </div>
      )}

      <hr />
      <div>
         <h2>Añadir nuevo alumno</h2>

        <p>Nombre del alumno:
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoAlumno.nombre}
            onChange={handleChange}
          />
        </p>

        <p>Primer Apellido:
          <input
            type="text"
            name="apellido1"
            placeholder="Primer apellido"
            value={nuevoAlumno.apellido1}
            onChange={handleChange}
          />
        </p>
        <p>Segundo Apellido:
          <input
            type="text"
            name="apellido2"
            placeholder="Segundo apellido"
            value={nuevoAlumno.apellido2}
            onChange={handleChange}
          />
        </p>

        <p>Edad:
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={nuevoAlumno.edad}
            onChange={handleChange}
          />
        </p>
        <p>Sexo:
          <input
            type="text"
            name="sexo"
            placeholder="Sexo"
            value={nuevoAlumno.sexo}
            onChange={handleChange}
          />
        </p>
          
        <p>Curso:
          <input
            type="text"
            name="curso"
            placeholder="Curso"
            value={nuevoAlumno.curso}
            onChange={handleChange}
          />
        </p>

        <button onClick={masAlumnos}>Añadir alumno</button>
        {mensaje && <p>{mensaje}</p>}

      </div>
      
    </div>
  );
}

export default AlumnoPorId;
