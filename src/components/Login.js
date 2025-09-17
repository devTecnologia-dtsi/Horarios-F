// import useForm from "../hooks/useForm";
// import useAuth from "../hooks/useAuth";
// import uniminutoLogo from "../assets/uniminuto/logo-uniminuto-login.png";
// import { useEffect } from "react";

// const Login = ({ setIsAuthenticated }) => {
//     const { loading, login, ToastContainer } = useAuth(setIsAuthenticated);
//     const { handleInputChange, formulario } = useForm({
//         email: "",
//         pass: ""
//     });

//     const handleLogin = () => {
//         if (formulario) {
//             if (
//                 formulario.hasOwnProperty("email") &&
//                 formulario.hasOwnProperty("pass")
//             ) {
//                 const { email, pass } = formulario;
//                 login(email, btoa(pass));
//             }
//         }
//     };

//     useEffect(() => {
//         const handleKeyUp = ({ key }) => {
//             if (key === "Enter") {
//                 handleLogin();
//             }
//         };

//         // Agregar el listener al desmontar el componente
//         const body = document.querySelector("body");
//         body.addEventListener("keyup", handleKeyUp);

//         return () => {
//             body.removeEventListener("keyup", handleKeyUp);
//         };
//     }, [handleLogin]);

//     return (
//         <section className="vh-100" style={{ backgroundColor: '#162644' }} >
//             <ToastContainer />
//             <div className="container py-2 h-100">
//                 <div className="row d-flex justify-content-center align-items-center h-100">
//                     <div className="col-xl-10">
//                         <div className="card" style={{ borderRadius: '1rem' }}>
//                             <div className="row g-0">
//                                 <div className="col-md-6 col-lg-5 d-none d-md-block">
//                                     <img
//                                         src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
//                                         alt="login form"
//                                         className="img-fluid"
//                                         style={{ borderRadius: '1rem 0 0 1rem' }}
//                                     />
//                                 </div>
//                                 <div className="col-md-6 col-lg-7 d-flex align-items-center">
//                                     <div className="card-body p-2 p-lg-3 text-black">
//                                         <form>
//                                             <div className="d-flex align-items-center mb-3 pb-1">
//                                                 <img src={uniminutoLogo} />
//                                             </div>
//                                             <h5 className="fw-normal pb-2">Ingresa a tu cuenta</h5>
//                                             <div className="form-outline">
//                                                 <input
//                                                     id="formEmail"
//                                                     name="email"
//                                                     className="form-control form-control-lg"
//                                                     onChange={(e) => { handleInputChange(e, true) }}
//                                                 />
//                                                 <small className="form-label" htmlFor="formEmail">Correo Institucional</small>
//                                             </div>
//                                             <div className="form-outline">
//                                                 <input
//                                                     type="password"
//                                                     id="formPassword"
//                                                     name="pass"
//                                                     className="form-control form-control-lg"
//                                                     onChange={(e) => { handleInputChange(e, true) }}
//                                                 />
//                                                 <small className="form-label" htmlFor="formPassword">Contraseña</small>
//                                             </div>
//                                             <div className="pt-2">
//                                                 <button
//                                                     className="btn btn-dark btn-lg btn-block d-flex aling-items-center"
//                                                     type="button"
//                                                     onClick={handleLogin}
//                                                     disabled={loading}
//                                                 >
//                                                     Login
//                                                     {
//                                                         loading && (
//                                                             <div className="spinner-border text-secondary ms-auto" role="status">
//                                                                 <span className="visually-hidden"></span>
//                                                             </div>
//                                                         )
//                                                     }
//                                                 </button>
//                                             </div>
//                                             <a className="small text-muted" href="#!">¿Olvidaste tu contraseña?</a>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }


// export default Login;





import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import useAuthSSO from "../hooks/useAuthSSO";
import uniminutoLogo from "../assets/uniminuto/logo-uniminuto-login.png";
import microsoftLogo from "../assets/uniminuto/Microsoft_logo.svg";
import Swal from "sweetalert2";
import { useMsal } from "@azure/msal-react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate(); 
  const { login, accounts, getToken } = useAuthSSO();
  const { instance } = useMsal();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const init = async () => {
      if (accounts.length > 0 && !localStorage.getItem("isAuthenticated")) {
        const token = await getToken();
        if (token) {
          try {
            const response = await fetch(`${BASE_URL}/horarios/validate.php?permissions`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            const data = await response.json();
            // console.log("Respuesta del backend:", data);

            if (data.process) {
              navigate("/horarios");
            } else {
              Swal.fire({
                icon: "error",
                title: "Acceso Denegado",
                text: "No tienes permisos para acceder a esta aplicación.",
                confirmButtonText: "Cerrar"
              }).then(() => {
                navigate("/login");
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("token");
                instance.logoutRedirect();
              });
            }
          } catch (error) {
            console.error("Error en la validación:", error);
            Swal.fire({
              icon: "error",
              title: "Error de conexión",
              text: "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.",
              confirmButtonText: "Cerrar"
            });
          }
        }
      }
    };
    init();
  }, [accounts, getToken, navigate, instance, BASE_URL]);

return (
  <section className="login-section">
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card login-card shadow-lg">
            <div className="row g-0">
              {/* Imagen institucional */}
              <div className="col-md-6 d-none d-md-block login-bg" />

              {/* Formulario */}
              <div className="col-md-6 d-flex align-items-center">
                <div className="card-body text-center px-4 py-5">
                  <img 
                    src={uniminutoLogo} 
                    alt="Logo Uniminuto" 
                    style={{ width: "180px", marginBottom: "1rem" }} 
                  />
                  <p className="text-muted mb-4">
                    Accede con tu cuenta institucional para gestionar horarios
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); login(); }}>
                    <button
                      className="btn btn-light btn-lg w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm login-btn"
                      type="submit"
                    >
                      <img
                        src={microsoftLogo}
                        alt="Microsoft Logo"
                        style={{ width: 24, height: 24 }}
                      />
                      <span style={{ fontWeight: 500, color: "#333" }}>
                        Iniciar sesión con Microsoft
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="text-center text-muted mt-3" style={{ fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} Corporación Universitaria Minuto de Dios
          </footer>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Login;