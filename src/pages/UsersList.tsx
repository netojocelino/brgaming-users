import { useEffect, useState } from 'react'
import { NotePencil, Recycle,  } from 'phosphor-react'

import Header from '../components/Header'
import ErrorPage from '../components/ErrorPage'

import { ListUsers } from '../utils/login'

import { CanRemove, IsAdminLogged, GetRole } from '../utils/ReactActions'

export default function () {
    const [user, setUser]: [any , any] = useState(null)
    const [errorMessage, setErrorMessage]: [ string | undefined, any ] = useState(undefined)


    useEffect(() => {
        IsAdminLogged()
            .then((dataUser) => {
                setUser(dataUser)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }, [])

    const GetBackgroundColor = (color: string) => ({
        backgroundColor: color
    })

    return (user !== null && errorMessage !== null)
        ? (
        <div className='w-screen h-screen items-center flex flex-col overscroll-none'>
            <Header title='BR Gaming Users' />

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

                    <h2 className="text-center text-3xl text-custom-100 w-full my-20">Usuários cadastrados</h2>

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
                                            { CanRemove(user.role) &&
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

        </div>
    )
    : ( <ErrorPage errorMessage={errorMessage} />)
}
