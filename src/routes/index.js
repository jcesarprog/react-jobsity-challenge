// import App from '../pages/App';
// import Calendar from '../pages/Calendar';
import { Routes, Route } from "react-router-dom";
import { App, Calendar } from "../pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
};
/*
const Routes = [
  {
    path: '/',
    component: App,
    exact: true
  },
  {
    path: '/calendar',
    component: Calendar,
    exact: true
  }
];
*/
export default Router;
