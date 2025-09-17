// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Login from './components/Login';
// import ProtectedRoute from './components/ProtectedRoute';
// import Horarios from './components/Horarios';
// import Horario from './components/Horario';
// import Carpeta from './components/Carpeta';
// import EstudiantesHorarios from './components/estudiantes/EstudiantesHorarios';
// import EstudaintesHorario from './components/estudiantes/EstudaintesHorario';
// import EstudianteCarpeta from './components/estudiantes/EstudianteCarpeta';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : 'false');
//   return (
//     // <Router basename={process.env.PUBLIC_URL}> {/*SOLAMENTE PARA AMBEINTE DE PRUEBAS, NO FUNCIONA PARA AMBIETES LOCALES O PRODUCCION*/}
//     <Router> {/*PARA AMBIENTES LOCALES BORRAR PARA PRODUCCION*/}
//       <Routes>
//         <Route path="/" element={<EstudiantesHorarios />} />
//         <Route path="/*" element={<Navigate to={"/estudiantes/horarios"} />} />
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//         <Route path="/estudiantes/horarios" element={<EstudiantesHorarios />} />
//         <Route path="/estudiantes/horario/:id" element={<EstudaintesHorario />} />
//         <Route path="/estudiantes/carpeta/:id" element={<EstudianteCarpeta />} />
//         <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
//           <Route path="/horarios" element={<Horarios />} />
//           <Route path="/horario/:id" element={<Horario />} />
//           <Route path="/carpeta/:id" element={<Carpeta />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Horarios from './components/Horarios';
import Horario from './components/Horario';
import Carpeta from './components/Carpeta';
import EstudiantesHorarios from './components/estudiantes/EstudiantesHorarios';
import EstudaintesHorario from './components/estudiantes/EstudaintesHorario';
import EstudianteCarpeta from './components/estudiantes/EstudianteCarpeta';

function App() {
  const { instance, accounts } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    instance.handleRedirectPromise()
      .then((response) => {
        if (response) {
          console.log("Login completado:", response);
        }
        // La sesión es válida si hay al menos una cuenta activa
        if (accounts.length > 0) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
        }
      })
      .catch((error) => {
        console.error("Error en handleRedirectPromise:", error);
        setIsAuthenticated(false);
      });
  }, [instance, accounts]);

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<EstudiantesHorarios />} />
      <Route path="/estudiantes/horarios" element={<EstudiantesHorarios />} />
      <Route path="/estudiantes/horario/:id" element={<EstudaintesHorario />} />
      <Route path="/estudiantes/carpeta/:id" element={<EstudianteCarpeta />} />
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

      {/* Protegidas */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/horario/:id" element={<Horario />} />
        <Route path="/carpeta/:id" element={<Carpeta />} />
      </Route>

      {/* Catch all */}
      <Route path="/*" element={<Navigate to="/estudiantes/horarios" />} />
    </Routes>
  );
}

export default App;
