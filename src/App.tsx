import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Splash from './pages/Splash';
import AccountType from './pages/AccountType';
import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import Profile from './pages/Profile';
import Version from './pages/Version';
import About from './pages/About';
import MainTabs from './pages/MainTabs';
import Home from './pages/Home';
import Menu from './pages/Menu';
import RequestDetail from './pages/RequestDetail';

import Ayuda from './pages/Ayuda'; // Asegúrate de que la ruta sea correcta
import Tarjetas from './pages/Tarjetas';
import AgregarTarjetaSplash from './pages/AgregarTarjetaSplash';
import FormularioAgregarTarjeta from "./pages/FormularioAgregarTarjeta";


import LoginProvider from './pages/LoginProvider';
import RegisterProvider from './pages/RegisterProvider';
import RecoverPasswordProvider from './pages/RecoverPasswordProvider';
import ProviderDashboard from './pages/ProviderDashboard';
import ProviderEditProfile from './pages/ProviderEditProfile';
import ProviderJobsList from './pages/ProviderJobsList';
import ProviderRequests from './pages/ProviderRequests';

import CreateRequest from './pages/CreateRequest';
import UserRequests from './pages/UserRequests';        // Asegúrate de tener esta pantalla
import ManageRequests from './pages/ManageRequests';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Pantallas públicas */}
        <Route exact path="/" render={() => <Redirect to="/splash" />} />
        <Route path="/splash" component={Splash} exact />
        <Route path="/account-type" component={AccountType} exact />

        {/* Usuario */}
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/recover-password" component={RecoverPassword} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/version" component={Version} exact />
        <Route path="/about" component={About} exact />
        <Route path="/tabs/home" component={Home} exact />
        <Route path="/tabs/menu" component={Menu} exact />
        <Route path="/tabs" component={MainTabs} />
        <Route path="/ayuda" component={Ayuda} exact />
        <Route path="/tarjetas" component={Tarjetas} exact />
        <Route path="/agregar-tarjeta" component={AgregarTarjetaSplash} exact />
        <Route path="/formulario-agregar-tarjeta" component={FormularioAgregarTarjeta} exact />

        {/* Proveedor */}
        <Route path="/login-provider" component={LoginProvider} exact />
        <Route path="/register-provider" component={RegisterProvider} exact />
        <Route path="/recover-password-provider" component={RecoverPasswordProvider} exact />
        <Route path="/provider/dashboard" component={ProviderDashboard} exact />
        <Route path="/provider/edit-profile" component={ProviderEditProfile} exact />
        <Route path="/provider/jobs" component={ProviderJobsList} exact />
        <Route path="/provider/requests" component={ProviderRequests} exact />

        {/* Solicitudes de servicio - Usuario */}
        <Route path="/create-request" component={CreateRequest} exact />
        <Route path="/user-requests" component={UserRequests} exact />
        <Route path="/manage-requests" component={ManageRequests} exact />
        <Route path="/request-detail/:id" component={RequestDetail} exact />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
