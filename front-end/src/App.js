import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navigator } from './components/navigator';
import { Share } from './components/share';
import { Register } from './components/register';
import { Management } from './components/management';

function App() {
  return (
    <Router>
      <Navigator />
      <Switch>
        <Route path="/share" component={Share} />
        <Route path="/register/:key" component={Register} />
        <Route path="/management" component={Management} />
        <Route
          path="/"
          render={() => {
            return <Redirect to={'/share'} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
