import AuthService from './util/auth.service';
import AuthenticatedRoutes from './routes/AuthenticatedRoutes';
import UnAuthenticatedRoutes from './routes/UnAuthenticatedRoutes';
import './App.less';


function App() {
  return (
    <div className="App">
      {
        AuthService.isTokenExist() ?
          (
            <AuthenticatedRoutes />
          )
          :
          (
            <UnAuthenticatedRoutes />
          )}
    </div>
  );
}

export default App;
