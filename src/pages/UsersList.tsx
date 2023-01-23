import { useEffect, useState } from 'react'
import { NotePencil, Recycle,  } from 'phosphor-react'

import ErrorPage from '../components/ErrorPage'
import DefaultWizard from '../wizards/default'

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
            <DefaultWizard
                user={user}
                errorMessage={errorMessage}
            >
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
                            .map((userIteration) => (
                                <tr role='row' key={userIteration._id.toString()}>
                                    <th scope='row'>{ userIteration._id.toString() }</th>
                                    <th className='text-left' scope='row'>{ userIteration.name }</th>
                                    <th className='text-left font-normal' scope='row'>{ userIteration.login }</th>
                                    <th className='text-left font-normal' scope='row'>{ userIteration.phone_number }</th>
                                    <th className='text-left font-normal' scope='row'>{ GetRole(userIteration.role) }</th>
                                    <th className='text-left font-normal' scope='row'>
                                        <input type="color" value={userIteration.color} disabled />
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

            </DefaultWizard>

    )
    : ( <ErrorPage errorMessage={errorMessage} />)
}
