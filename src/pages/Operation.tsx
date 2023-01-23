import { useEffect, useState } from 'react'

import ErrorPage from '../components/ErrorPage'
import DefaultWizard from '../wizards/default'

import { IsAdminLogged } from '../utils/ReactActions'

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

    return (user !== null && errorMessage !== null)
        ? (
            <DefaultWizard
                title='Operação'
                user={user}
                errorMessage={errorMessage}
            >
            </DefaultWizard>
    )
    : ( <ErrorPage errorMessage={errorMessage} />)
}
