import { useEffect, useState } from 'react'

import { User, CheckLogin } from '../utils/login'

import logo from '../assets/logo.svg'

export default function () {
    const [user, setUser]: [any , any] = useState(null)
    const [errorMessage, setErrorMessage]: [ string | null, any ] = useState(null)

    const GetRole = (_role: string) => ({
        admin: 'Administrador',
        'sale-keeper': 'Lojista'
    }[_role])

    useEffect(() => {
        const cachedUser = localStorage.getItem('user-logged')

        if (cachedUser === null) {
            setErrorMessage('usuário não autenticado')
            return
        }
        const userData: User = JSON.parse(cachedUser)

        const isLogged = CheckLogin({
            login: userData.login,
            password: userData.password,
        })

        if (isLogged === undefined) {
            localStorage.clear()
            setErrorMessage('Usuário inválido')
            return
        }

        if (isLogged.role !== 'admin') {
            setErrorMessage('Página disponível apenas para administradores.')
            return
        }

        setUser(userData)
    }, [])

    const GetBackgroundColor = (color: string) => ({
        backgroundColor: color
    })

    return user === null
        ? ( <div
            className='flex w-screen h-screen justify-center items-center text-center font-semibold text-custom-800 bg-custom-200'
        >
            <span>
                { errorMessage ?? 'Não foi possível abrir a página' }
            </span>
        </div>)
        : (
        <div className='w-screen h-screen items-center flex flex-col overscroll-none'>
            <div className='flex w-full justify-center border-b border-blue-300'>
                <h1 title="BR Gaming Users">
                    <img
                        src={logo}
                        alt="BR Gaming Users"
                        className='max-h-fit h-20' />
                </h1>
            </div>

            <div className='flex flex-row w-full h-full'>
                <div className='w-1/6 mr-10 h-full flex flex-col border-r border-blue-300' style={GetBackgroundColor(user.color)}>
                    <h1 className='text-custom-200 text-center text-2xl mt-10'>{ GetRole(user.role) }</h1>

                    <nav className='w-full py-20'>
                        <ul>
                            <li className='w-full mb-5 text-custom-300 border-b-2 border-custom-100 text-center bg-clip-text bg-gradient-to-r from-black to bg-slate-500 font-semibold transition duration-100 hover:border-custom-300'><a href='#users'>Usuários</a></li>
                            <li className='w-full mb-5 text-custom-300 border-b-2 border-custom-100 text-center bg-clip-text bg-gradient-to-r from-black to bg-slate-500 font-semibold transition duration-100 hover:border-custom-300'><a href='#store'>Minha Loja</a></li>
                            <li className='w-full mb-5 text-custom-300 border-b-2 border-custom-100 text-center bg-clip-text bg-gradient-to-r from-black to bg-slate-500 font-semibold transition duration-100 hover:border-custom-300'><a href='#operations'>Operações</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="w-2/3 h-1/2 flex flex-col px-5 sm:w-1/2 sm:px-0">

                    <h2 className="text-center text-3xl text-custom-100 w-full my-20">Operação</h2>

                </div>
            </div>

        </div>
    )
}
