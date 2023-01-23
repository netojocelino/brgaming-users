import { useEffect, useState } from 'react'
import { NotePencil, Recycle,  } from 'phosphor-react'

import { User, CheckLogin, ListUsers } from '../utils/login'

import logo from '../assets/logo.svg'

export default function () {
    const [user, setUser]: [any , any] = useState(null)
    const [errorMessage, setErrorMessage]: [ string | null, any ] = useState(null)

    const GetRole = (_role: string) => ({
        admin: 'Administrador',
        'sale-keeper': 'Lojista'
    }[_role])

    const CanRemove = () => {
        return user.role === 'admin'
    }

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

        setUser(userData)
    }, [])

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

            <div className="w-full h-1/2 flex flex-col px-5 sm:w-1/2 sm:px-0">

                <h2 className="text-center text-3xl text-custom-100 w-full my-20">Entre na sua conta</h2>

                { errorMessage && <div
                    className='w-full p-2 rounded-md text-center font-semibold text-custom-800 bg-custom-200'
                >
                    { errorMessage }
                </div>}

                <table className='border-collapse table-auto w-full border-spacing-2 border border-slate-300 rounded shadow'>
                    <thead>
                        <tr role='row'>
                            <th className='border-b dark:border-slate-400 font-semibold p-4 py-2 text-left' scope='col'>id</th>
                            <th className='border-b dark:border-slate-400 font-semibold p-4 py-2 text-left' scope='col'>nome</th>
                            <th className='border-b dark:border-slate-400 font-semibold p-4 py-2 text-left' scope='col'>nome de usuário</th>
                            <th className='border-b dark:border-slate-400 font-semibold p-4 py-2 text-left' scope='col'>número de contato</th>
                            <th className='border-b dark:border-slate-400 font-semibold p-4 py-2 text-left' scope='col'>permissão</th>
                            <th className='border-b dark:border-slate-400 font-semibold p-4 py-2 text-left' scope='col'>cor</th>
                            <th className='border-b dark:border-slate-400 font-semibold p-4 py-2 text-left' scope='col'>ação</th>
                        </tr>
                    </thead>

                    <tbody className='bg-white dark:bg-slate-800'>
                        {
                            ListUsers()
                            .map((user) => (
                                <tr role='row' key={user._id.toString()}>
                                    <th scope='row'>{ user._id.toString() }</th>
                                    <th className='text-left' scope='row'>{ user.name }</th>
                                    <th className='text-left font-normal' scope='row'>{ user.login }</th>
                                    <th className='text-left font-normal' scope='row'>{ user.phone_number }</th>
                                    <th className='text-left font-normal' scope='row'>{ GetRole(user.role) }</th>
                                    <th className='text-left font-normal' scope='row'>
                                        <input type="color" value={user.color} disabled />
                                    </th>
                                    <th className='text-right font-normal text-custom-200 cursor-pointer flex flex-row justify-around' scope='row'>
                                        { false &&
                                            <span className='hover:text-custom-300 text-xl border rounded-full border-custom-700 p-2 hover:bg-slate-200'>
                                                <NotePencil alt='Editar' />
                                            </span>
                                        }
                                        { CanRemove() &&     
                                            <span className='hover:text-custom-300 text-xl border rounded-full border-custom-700 p-2 hover:bg-slate-200'>
                                                <Recycle alt='Remover'/>
                                            </span>
                                        }
                                    </th>
                                </tr>
                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
