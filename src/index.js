import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider } from '@vkontakte/vkui';
import App from './containers/index';

bridge.send('VKWebAppInit');

ReactDOM.render(
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    , document.getElementById('root'));
