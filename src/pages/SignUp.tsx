import { useEffect, useState } from 'react'

import { IsLogged } from '../utils/ReactActions'

import Input from '../components/Input'
import Options from '../components/Options'
import GuestWizard from '../wizards/Guest'

export default function () {
    const [loggedUser, setLoggedUser]: [any, any] = useState(null)
    const [user, setUser] = useState({
        name: '',
        phone_number: '',
        login: '',
        password: '',
        role: '',
        color: '',
    })
    const [errorMessage , setErrorMessage]: [ string | undefined, any ] = useState(undefined)

    useEffect(() => {
        IsLogged()
            .then((user: any) => {
                setLoggedUser(user)
            })
            .catch((e) => {
                setLoggedUser(null)
            })
    }, [])

    const handlerInput = (inputName: string) => {
        return ( input: any) => {
            const { value } = input.target
            setUser((oldUser) => ({
                ...oldUser,
                [inputName]: value,
            }))
        }
    }

    const handlerSubmit = (e: any) => {
        setErrorMessage('Not implemented yet')
        e.preventDefault()
    }

    return (
        <GuestWizard
            title='Crie uma conta'
            errorMessage={errorMessage}
        >
            <Input
                label='Nome'
                type='text'
                placeholder='Digite seu Nome'
                inputValue={user.name}
                inputHandler={handlerInput('name')}
            />
            <Input
                label='Telefone'
                type='tel'
                placeholder='Digite seu Telefone'
                inputValue={user.phone_number}
                inputHandler={handlerInput('phone_number')}
            />
            <Input
                label='Login'
                type='text'
                placeholder='Digite seu Nome de usuário'
                inputValue={user.login}
                inputHandler={handlerInput('login')}
            />

            <Input
                label='Senha'
                type='password'
                placeholder='Digite sua senha'
                inputValue={user.password}
                inputHandler={handlerInput('password')}
            />

            <Options
                label='Nível'
                placeholder='Nível de acesso'
                items={[
                    { id: 'admin', value: 'Administrador', show: loggedUser?.role === 'admin' },
                    { id: 'sale-keeper', value: 'Lojista', show: true },
                ]}
                inputValue={user.role}
                inputHandler={handlerInput('role')}
            />

            <Input
                label='Cor de fundo'
                type='color'
                inputValue={user.color}
                inputHandler={handlerInput('color')}
            />


            <div className="w-full flex justify-center items-center">
                <button
                    className="w-full bg-custom-200 hover:bg-custom-300 p-2 rounded-md text-slate-50 font-semibold"
                    type="submit"
                    onClick={handlerSubmit}
                >Enviar</button>
            </div>
        </GuestWizard>
    )
}
