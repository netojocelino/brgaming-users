import {
    createBrowserRouter,
} from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UsersList from './pages/UsersList'
import MyStore from './pages/MyStore'
import Operation from './pages/Operation'



export default createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/cadastrar',
        element: <SignUp />,
    },
    {
        path: '/usuarios',
        element: <UsersList />,
    },
    {
        path: '/minha-loja',
        element: <MyStore />,
    },
    {
        path: '/operacoes',
        element: <Operation />,
    },
])
