import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Login from "./Pages/Login";
import Alert from "./components/Alert";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminTemplate from "./Pages/Admin/AdminTemplate";
import AdminUser from "./Pages/Admin/AdminUser";

function App() {
  const [alert, setAlert] = useState({
    type: "",
    msg: "",
    show: false,
  });

  const toggleAlert = (type, msg) => {
    setAlert({ type, msg, show: true });
  };

  const hideAlert = () => {
    setAlert({ type: "", msg: "", show: false });
  };

  //Routes
  const Home = () => <Login alert={toggleAlert} close={hideAlert}></Login>;

  const Admin = () => (
    <ProSidebarProvider>
      <AdminTemplate alert={toggleAlert} />
      <div className="admin-content">
        <AdminUser alert={toggleAlert} close={hideAlert} />
      </div>
    </ProSidebarProvider>
  );

  return (
    <div className="App">
      {alert.show && (
        <Alert type={alert.type} msg={alert.msg} close={hideAlert} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/home" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
