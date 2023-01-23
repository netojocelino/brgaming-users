import { useEffect, useState } from 'react'

import ErrorPage from '../components/ErrorPage'
import DefaultWizard from '../wizards/default'

import { IsSaleKeeperLogged } from '../utils/ReactActions'

export default function () {
    const [user, setUser]: [any , any] = useState(null)
    const [errorMessage, setErrorMessage]: [ string | undefined, any ] = useState(undefined)

    useEffect(() => {
        IsSaleKeeperLogged()
            .then((dataUser) => {
                setUser(dataUser)
            })
            .catch((error) => {
                setErrorMessage(error.message)
            })
    }, [])


    return (user !== null && errorMessage !== null)
        ? (
        <DefaultWizard
            user={user}
            errorMessage={errorMessage}
            title='Minha Loja'
        >
        </DefaultWizard>
    )
    : ( <ErrorPage errorMessage={errorMessage} />)
}
