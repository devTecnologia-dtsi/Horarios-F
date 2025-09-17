// import { Navigate, Outlet } from 'react-router-dom';
// import { BsPower } from "react-icons/bs";
// import uniminutoLogo from "../assets/uniminuto/logo-para-web.png";
// import useAuthSSO from "../hooks/useAuthSSO";

// const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
//     // const { logout } = useForm();
//     const { logout } = useAuthSSO();

//     if (isAuthenticated === 'false') {
//         return <Navigate to={redirectPath} replace />;
//     }

//     return (
//         <>
//             <nav className="navbar navbar-dark bg-dark">
//                 <img className="ms-2" alt="Logo institucional de Uniminuto" src={uniminutoLogo} />
//                 <button
//                     className="me-2 btn btn-outline-danger d-flex align-items-center"
//                     onClick={logout}
//                 >
//                     Cerrar Sesión
//                     <BsPower className="ms-2" />
//                 </button>
//             </nav>
//             <Outlet />
//         </>
//     );
// };


// export default ProtectedRoute;


import { Navigate, Outlet } from 'react-router-dom';
import { BsPower } from "react-icons/bs";
import uniminutoLogo from "../assets/uniminuto/logo-para-web.png";
import useAuthSSO from "../hooks/useAuthSSO";
import useUserProfile from "../hooks/useUserProfile";

const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
  const { logout, accounts } = useAuthSSO();
  const { user, photoUrl, loading } = useUserProfile();

  // if (isAuthenticated === 'false') {
  //   return <Navigate to={redirectPath} replace />;
  // }

  if (!isAuthenticated || accounts.length === 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center">
        {/* Logo a la izquierda */}
        <img className="ms-2" alt="Logo institucional de Uniminuto" src={uniminutoLogo} />

        {/* Usuario + Dropdown a la derecha */}
        {!loading && (
          <div className="dropdown">
            <button
              className="btn btn-dark dropdown-toggle d-flex align-items-center border-0"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Foto de perfil"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary me-2"
                  style={{ width: 40, height: 40 }}
                />
              )}
              <span>{user?.mail || user?.userPrincipalName}</span>
            </button>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <button
                  className="dropdown-item d-flex align-items-center text-danger"
                  onClick={logout}
                >
                  <BsPower className="me-2" /> Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default ProtectedRoute;

