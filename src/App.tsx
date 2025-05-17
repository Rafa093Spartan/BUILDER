import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Splash from './pages/Splash';
import AccountType from './pages/AccountType';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Version from './pages/Version';
import About from './pages/About';
import MainTabs from './pages/MainTabs';
import Home from './pages/Home';
import Menu from './pages/Menu';
import LoginProvider from './pages/LoginProvider';
import RegisterProvider from './pages/RegisterProvider';
import RecoverPassword from './pages/RecoverPassword';
import RecoverPasswordProvider from './pages/RecoverPasswordProvider';
import ProviderDashboard from './pages/ProviderDashboard';
import ProviderEditProfile from './pages/ProviderEditProfile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/splash" component={Splash} exact />
        <Route path="/account-type" component={AccountType} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/version" component={Version} exact />
        <Route path="/about" component={About} exact />
        <Route path="/tabs/home" component={Home} exact />
        <Route path="/tabs/menu" component={Menu} exact />
        <Route path="/tabs" component={MainTabs} />
        <Route exact path="/" render={() => <Redirect to="/splash" />} />
        <Route path="/login-provider" component={LoginProvider} exact />
        <Route path="/register-provider" component={RegisterProvider} exact />
        <Route path="/recover-password" component={RecoverPassword} exact />
        <Route path="/recover-password-provider" component={RecoverPasswordProvider} exact />
        <Route path="/provider/dashboard" component={ProviderDashboard} exact />
        <Route path="/provider/edit-profile" component={ProviderEditProfile} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
