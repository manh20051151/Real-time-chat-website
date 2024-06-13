import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./store/redux";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { SocketContextProvider } from "./context/SocketContext.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import AddFriend from "./components/AddFriend.js";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AuthContextProvider>
            <SocketContextProvider>
              <App></App>
            </SocketContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
