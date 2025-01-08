import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "./mock"
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement //Type assertion to avoid errors.
);
root.render(
    // Provider - Share state/data from Redux in the App
    <Provider store={store}>
        <App />
    </Provider>
);

