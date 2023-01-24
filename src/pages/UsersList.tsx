import { useEffect, useState } from 'react'
import { NotePencil, Recycle,  } from 'phosphor-react'

import ErrorPage from '../components/ErrorPage'
import DefaultWizard from '../wizards/default'

import { ListUsers, DeleteUser } from '../utils/login'

import { CanRemove, CanEdit, IsLogged, GetRole } from '../utils/ReactActions'
import { Link } from 'react-router-dom'

export default function () {
    const [user, setUser]: [any , any] = useState(null)
    const [errorMessage, setErrorMessage]: [ string | undefined, any ] = useState(undefined)


    useEffect(() => {
        IsLogged()
            .then((dataUser) => {
                setUser(dataUser)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }, [])

    const RemoveUser = (id: string) => {
        if (!CanRemove(user.role)) {
            setErrorMessage('Não é possível remover usuário, permissão de administrador necessária.')
            return
        }

        DeleteUser(id)
    }

    return (user !== null && errorMessage !== null)
        ? (
            <DefaultWizard
                title='Usuários cadastrados'
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
                            Object.keys(ListUsers())
                            .map((userId: string) => {
                                const userIteration = ListUsers()[userId]
                                
                                return (<tr role='row' key={userIteration._id}>
                                        <th scope='row'>{ userIteration._id }</th>
                                        <th className='text-left' scope='row'>{ userIteration.name }</th>
                                        <th className='text-left font-normal' scope='row'>{ userIteration.login }</th>
                                        <th className='text-left font-normal' scope='row'>{ userIteration.phone_number }</th>
                                        <th className='text-left font-normal' scope='row'>{ GetRole(userIteration.role) }</th>
                                        <th className='text-left font-normal' scope='row'>
                                            <input type="color" value={userIteration.color} disabled />
                                        </th>
                                        <th className='text-right font-normal text-custom-200 cursor-pointer flex flex-row justify-around' scope='row'>
                                            { CanEdit(user.role) &&
                                                <span className='hover:text-custom-300 text-xl border rounded-full border-custom-700 p-2 hover:bg-slate-200'>
                                                    <Link to={`/usuario/editar/${userIteration._id}`}>
                                                        <NotePencil alt='Editar' />
                                                    </Link>
                                                </span>
                                            }
                                            { CanRemove(user.role) &&
                                                <span onClick={() => RemoveUser(userIteration._id)} className='hover:text-custom-300 text-xl border rounded-full border-custom-700 p-2 hover:bg-slate-200'>
                                                    <Recycle alt='Remover'/>
                                                </span>
                                            }
                                        </th>
                                    </tr>
                                )}
                            )

                        }
                    </tbody>
                </table>

            </DefaultWizard>

    )
    : ( <ErrorPage errorMessage={errorMessage} />)
}
