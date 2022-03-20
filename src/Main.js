import React from 'react';
// import { renderRoutes } from 'react-router-config';
// import { withRouter } from 'react-router-dom';
// import Routes from './routes';
// import { Routes, Route } from "react-router-dom";
// import {App, Calendar} from "./pages"
import Router from "./routes"

function Main() {
	return (
	  <div className="main">
	    {/* {renderRoutes(Routes)} */}
		<Router/>
		
	  </div>
	);
}

// export default withRouter(Main);

export default Main;