import React from 'react';
import './App.css';

import {store} from './stores/index';

import IntroPage from './component/IntoPage';
import { Provider } from 'react-redux';
import ToolsPanel from './component/ToolsArea';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <ToolsPanel/>
        <IntroPage/>
      </div>
      
    </Provider>);
}

export default App;
