import App from './App';
import router from './routes/index';

const root = document.getElementById('root');
root.append(new App().el);

router();
