import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './component/home/Home.jsx';
import Trailer from "./component/Trailer/Trailer.jsx";
import Reviews from "./component/reviewForm/Reviews.jsx"
import NotFound from "./component/NotFound.jsx"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"/Trailer/:ytTrailerId",
        element:<Trailer/>
      },
      {
        path:"/Reviews/:movieId",
        element:<Reviews/>
      },{
        path:"*",
        element:<NotFound/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
