import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Splash from './pages/Splash';
import AccountType from './pages/AccountType';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Version from './pages/Version';
import About from './pages/About';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

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
        <Route path="/menu" component={Menu} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/version" component={Version} exact />
        <Route path="/about" component={About} exact />
        <Route exact path="/" render={() => <Redirect to="/splash" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
