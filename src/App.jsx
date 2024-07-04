import "./App.css";
import { Home } from "./pages/home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Search } from "./pages/search";
import { ROUTE_PATH } from "./const/page.const";
import { DetailPage } from "./pages/detail";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: ROUTE_PATH.home,
  },
  {
    element: <Search />,
    path: ROUTE_PATH.search,
  },
  {
    element: <DetailPage />,
    path: ROUTE_PATH.detail,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
