import { useEffect, useState } from 'react'

import Login, { User } from '../utils/login'
import { IsLogged } from '../utils/ReactActions'

import Input from '../components/Input'
import GuestWizard from '../wizards/Guest'
import { Link } from 'react-router-dom'

export default function () {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage , setErrorMessage]: [ string | undefined, any ] = useState(undefined)

    useEffect(() => {
        IsLogged()
            .then((_user) => {
                setErrorMessage('usuário já logado, estamos te redirecionando para a lista de usuários.')
                return setTimeout(() => {
                    window.location.href = '/usuarios'
                }, 1000)
            })
            .catch(() => ({}))
    }, [])
        

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

        Login({ login, password })
        .then((response: any) => {
            const user: User = response
            localStorage.setItem('user-logged', JSON.stringify(user))

            window.location.href = '/usuarios'
        })
        .catch(err => {
            localStorage.clear()
            setErrorMessage(err.message)
        })
        
    }

    return (
        <GuestWizard
            title='Entre na sua conta'
            errorMessage={errorMessage}
        >
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
                <Link
                    className='text-custom-100 hover:text-custom-200 visited:text-custom-200 '
                    to={'/cadastrar'}
                >Criar conta</Link>
            </div>
        </GuestWizard>
    )
}
