import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import PublicRoutes from './components/Routes/PublicRoutes';
import Donar from './pages/Dashboard/Donar';
import Hospital from './pages/Dashboard/Hospital';
import OrganisationPage from './pages/Dashboard/OrganisationPage';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Donation';
import Analytics from './pages/Dashboard/Analytics';
import AdminHome from './pages/Admin/AdminHome';
import DonarList from './pages/Admin/DonarList';
import HospitalList from './pages/Admin/HospitalList';
import OrgList from './pages/Admin/OrgList';
function App() {
  return (
    <>
    <ToastContainer/>
    

      <Routes>
      <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminHome />
            </ProtectedRoutes>
          }
        />

<Route
          path="/donar-list"
          element={
            <ProtectedRoutes>
              <DonarList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoutes>
              <HospitalList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoutes>
              <OrgList />
            </ProtectedRoutes>
          }
        />

      
        <Route path='/orgnaisation' element={
          <ProtectedRoutes>
             <OrganisationPage/> 

          </ProtectedRoutes>
              }
         />
         <Route path='/hospital' element={
          <ProtectedRoutes>
             <Hospital/> 

          </ProtectedRoutes>
              }
         />
          <Route path='/analytics' element={
          <ProtectedRoutes>
             <Analytics/> 

          </ProtectedRoutes>
              }
         />
          <Route path='/consumer' element={
          <ProtectedRoutes>
             <Consumer/> 

          </ProtectedRoutes>
              }
         />
         <Route path='/donation' element={
          <ProtectedRoutes>
             <Donation/> 

          </ProtectedRoutes>
              }
         />
         <Route path='/donar' element={
          <ProtectedRoutes>
             <Donar/> 

          </ProtectedRoutes>
              }
         />
         <Route path='/' element={
          <ProtectedRoutes>
             <HomePage/> 

          </ProtectedRoutes>
              }
         />
        <Route path='/login' 
        element={
          <PublicRoutes>
             <Login/>

          </PublicRoutes>
        
       } />
        <Route path='/register' element={
          <PublicRoutes>
            <Register/> 

          </PublicRoutes>
          
          }/>


      </Routes>
     
    </>
  ); 
}

export default App;
