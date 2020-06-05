import React from 'react';
import { StateProvider } from './StateContext';
import Main from "./Main"

const CheckoutDialog = () => 
    <StateProvider>
      <div>
        <Main />
      </div>
    </StateProvider>


export default App;