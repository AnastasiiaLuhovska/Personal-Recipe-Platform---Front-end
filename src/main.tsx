import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import store, {persistor} from "./redux/store.ts";
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PersistGate persistor={persistor}>
      <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </Provider>
      </PersistGate>
  </StrictMode>,
)
