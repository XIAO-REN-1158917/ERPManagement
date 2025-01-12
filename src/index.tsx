import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "./mock"
import { Provider } from 'react-redux';
import { store } from './store';

//If global configurations are needed, such as multiple languages,
// import {ConfigProvider} form "antd";
// then wrap the App component with the configProvider component.
// Refer to the Ant design documentation to learn how to configure this component.

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement //Type assertion to avoid errors.
);
root.render(
    // Provider - Share state/data from Redux in the App
    <Provider store={store}>
        <App />
    </Provider>
);

