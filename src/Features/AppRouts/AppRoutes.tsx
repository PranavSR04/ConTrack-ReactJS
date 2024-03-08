import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';


const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<></>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes
