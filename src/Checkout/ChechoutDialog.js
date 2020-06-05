import React from 'react';
import { StateProvider } from './StateContext';
import Main from "./Main"

const App = () => 
    <StateProvider>
      <div>
        <Main />
      </div>
    </StateProvider>


export default App;