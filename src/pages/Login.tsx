import { useState } from 'react'

import Login, { User } from '../utils/login'

import logo from '../assets/logo.svg'

export default function () {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage , setErrorMessage]: [ string | null, any ] = useState(null)

    const handlerLogin = (event: any) => {
        const { value } = event.target
        setLogin(value)
    }

    const handlerPassword = (event: any) => {
        const { value } = event.target
        setPassword(value)
    }

    const loginEvent = (ev: any) => {
        ev.preventDefault()
        setErrorMessage(null)

        if (login.length == 0 || password.length == 0) {
            setErrorMessage('Login e Senha são obrigatórios')
            return
        }

        Login({
            login,
            password
        })
        .then((response: any) => {
            const user: User = response
            localStorage.setItem('user-logged', JSON.stringify(user))

            if (user.role === 'admin') {
                console.log({user})
            } else {
                console.warn({user})
            }
        })
        .catch(err => {
            localStorage.clear()
            setErrorMessage(err.message)
        })
        
    }

    return (
        <div className='w-screen h-screen items-center flex flex-col overscroll-none'>
            <div className='flex w-full justify-center border-b border-blue-300'>
                <h1 title="BR Gaming Users">
                    <img
                        src={logo}
                        alt="BR Gaming Users"
                        className='max-h-fit h-20' />
                </h1>
            </div>

            <div className="w-full h-1/2 flex flex-col px-5 sm:w-1/2 sm:px-0">

                <h2 className="text-center text-3xl text-custom-100 w-full mt-20">Entre na sua conta</h2>

                { errorMessage && <div
                    className='w-full p-2 rounded-md text-center font-semibold text-custom-800 bg-custom-200'
                >
                    { errorMessage }
                </div>}

                <form className="w-full h-3/4 flex justify-center items-center flex-col space-y-5">
                    <div className="w-full space-x-4 flex">
                        <label className="text-stone-600 w-1/4 font-semibold">
                            Login
                        </label>
                        <input
                            value={login}
                            onChange={handlerLogin}
                            type="text"
                            placeholder="Digite seu Login"
                            className="p-1 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md ring-1 ring-custom-600 shadow-sm w-3/4"
                        />
                    </div>

                    <div className="w-full space-x-4 flex">
                        <label className="text-stone-600 w-1/4 font-semibold">
                            Senha
                        </label>
                        <input
                            value={password}
                            onChange={handlerPassword}
                            type="password"
                            placeholder="Digite sua senha"
                            className="p-1 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md ring-1 ring-custom-600 shadow-sm w-3/4"
                        />
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <button
                            className="w-full bg-custom-200 hover:bg-custom-300 p-2 rounded-md text-slate-50 font-semibold"
                            type="submit"
                            onClick={loginEvent}
                        >Enviar</button>
                    </div>

                    <div className='w-full flex justify-center items-center'>
                        <a
                            className='text-custom-100 hover:text-custom-200 visited:text-custom-200 '
                            href='#create'
                        >Criar conta</a>
                    </div>
                </form>
            </div>
        </div>
    )
}
