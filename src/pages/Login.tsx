import { useState } from 'react'

import Login, { User } from '../utils/login'
import { IsLogged } from '../utils/ReactActions'

import Header from '../components/Header'
import Input from '../components/Input'

export default function () {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage , setErrorMessage]: [ string | null, any ] = useState(null)

    IsLogged()
        .then((user) => {
            console.log('[TODO] redirecionar',user)
            setErrorMessage('usuário já logado, necessário redirecionar')
        })
        .catch(() => ({}))
        

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
            <Header title='BR Gaming Users' />

            <div className="w-full h-1/2 flex flex-col px-5 sm:w-1/2 sm:px-0">

                <h2 className="text-center text-3xl text-custom-100 w-full mt-20">Entre na sua conta</h2>

                { errorMessage && <div
                    className='w-full p-2 rounded-md text-center font-semibold text-custom-800 bg-custom-200'
                >
                    { errorMessage }
                </div>}

                <form className="w-full h-3/4 flex justify-center items-center flex-col space-y-5">
                    <Input
                        label='Login'
                        type='text'
                        placeholder='Digite seu login'
                        inputValue={login}
                        inputHandler={handlerLogin}
                    />

                    <Input
                        label='Senha'
                        type='password'
                        placeholder='Digite sua senha'
                        inputValue={password}
                        inputHandler={handlerPassword}
                    />

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
