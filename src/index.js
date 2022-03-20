import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
// import getStore from "./store/getStore";
// import reducers from './reducers';
import Main from './Main';
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./contexts/AppContext";

// import main sass file
import "./sass/app.scss";

ReactDOM.render(
  <React.StrictMode>
    {/* <ReduxProvider store={getStore(reducers)}> */}
    <AppContextProvider>
	    <BrowserRouter>
	      <Main />
	    </BrowserRouter>
      </AppContextProvider>
    {/* </ReduxProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
