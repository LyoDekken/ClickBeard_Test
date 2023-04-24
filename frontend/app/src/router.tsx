import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

import { Route, Routes } from 'react-router-dom'


const Router = () => {
  return (
    <Routes>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>}/>
    </Routes>
  )
}

export default Router;