import { useEffect, useState } from 'react'

import { IsLogged } from '../utils/ReactActions'

import Input from '../components/Input'
import Options from '../components/Options'
import GuestWizard from '../wizards/Guest'
import { CreateUser, ListUsers } from '../utils/login'

export default function () {
    const [loggedUser, setLoggedUser]: [any, any] = useState(null)
    const [user, setUser] = useState({
        name: '',
        phone_number: '',
        login: '',
        password: '',
        role: '',
        color: '#0000000    ',
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
        e.preventDefault()
        setErrorMessage(null)

        let errors = []

        if (user.name.length === 0) {
            errors.push('nome')
        }
        if (user.phone_number.length === 0) {
            errors.push('telefone')
        }
        if (user.login.length === 0) {
            errors.push('nome de usuário')
        }
        if (user.password.length === 0) {
            errors.push('senha')
        }
        if (user.role.length === 0) {
            errors.push('nível')
        }
        if (user.color.length === 0) {
            errors.push('cor')
        }

        if (errors.length > 0) {
            setErrorMessage(`Campos a ser preenchidos: ${errors.join(', ')}`)
            return
        }

        try {
            CreateUser({
                name: user.name,
                phone_number: user.phone_number,
                login: user.login,
                password: user.password,
                role: user.role,
                color: user.color,
            })

            console.log(ListUsers())

            
        } catch(er: any) {
            setErrorMessage(er.message)
        }


        
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
