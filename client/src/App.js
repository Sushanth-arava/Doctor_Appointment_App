// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import { Toaster } from "react-hot-toast";
// import Home from "./Pages/Home";
// import { useSelector } from "react-redux";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";
// import ApplyDoctor from "./Pages/ApplyDoctor";
// import Notifications from "./Pages/Notifications";
// import UsersList from "./Pages/Admin/UsersList";
// import DoctorsList from "./Pages/Admin/DoctorsList";
// import Profile from "./Pages/Doctor/Profile";

// import BookAppointment from "./Pages/BookAppointment";
// function App() {
//   const loading = useSelector((state) => state.alerts);

//   return (
//     <BrowserRouter>
//       {loading.loading ? (
//         <div className="spinner-parent">
//           <div className="spinner-border text-primary" role="status"></div>
//         </div>
//       ) : (
//         ""
//       )}

//       <Toaster position="top-center" reverseOder={false} />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/apply-doctor"
//           element={
//             <ProtectedRoute>
//               <ApplyDoctor />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <PublicRoute>
//               <Register />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute>
//               <Notifications />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute>
//               <UsersList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/doctors"
//           element={
//             <ProtectedRoute>
//               <DoctorsList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/doctor/profile/:userId"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/book-appointment/:doctorId"
//           element={
//             <ProtectedRoute>
//               <BookAppointment />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Button } from "antd";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./Pages/ApplyDoctor";
import Notifications from "./Pages/Notifications";
import UsersList from "./Pages/Admin/UsersList";
import DoctorsList from "./Pages/Admin/DoctorsList";
import Profile from "./Pages/Doctor/Profile";
import BookAppointment from "./Pages/BookAppointment";
import Appointments from "./Pages/Appointments";
import DoctorAppointments from "./Pages/Doctor/DoctorAppointment";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
