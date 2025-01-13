import "react-datepicker/dist/react-datepicker.css";

import { PubNubProvider } from "pubnub-react";
import { HelmetProvider } from "react-helmet-async";
import AosProvider from "./AosProvider.js";
import AuthProvider from "./components/auth/useAuth.js";
import Router from "./routes/index.js";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'
import store from "./components/store/store.js";

// import AnimatedCursor from "react-animated-cursor"


const persistor = persistStore(store)
const username = localStorage.getItem("username");

 function App() {
  return (
    <div className="App">
      <AosProvider>
        <HelmetProvider>
          <AuthProvider>
    
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router />
          
            </PersistGate>
            </Provider>
          </AuthProvider>
        </HelmetProvider>
      </AosProvider>
    </div>
  );
}

export default App;
