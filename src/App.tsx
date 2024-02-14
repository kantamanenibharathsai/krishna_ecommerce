import { Provider } from 'react-redux';
import './App.css';
import AppRoutes from './appRoutes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { Store } from './redux/store/Store';

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
