import { User, CheckLogin } from '../utils/login'


export const IsLogged = () => new Promise((resolve: any, reject: any) => {
    const cachedUser = localStorage.getItem('user-logged')

    if (cachedUser === null) {
        reject({message: 'usuário não autenticado', code: 'NOT_AUTH'})
        return
    }
    const userData: User = JSON.parse(cachedUser)
    const isLogged = CheckLogin({
        login: userData.login,
        password: userData.password,
    })

    if (isLogged === undefined) {
        localStorage.clear()
        reject({message: 'Usuário inválido', code: 'INVALID'})
        return
    }

    resolve(isLogged)
})


export const IsAdminLogged = () => new Promise((resolve: any, reject: any) => {
    IsLogged()
        .then((isLogged: any) => {
            if (isLogged.role !== 'admin') {
                reject({message: 'Página disponível apenas para administradores.', code: 'NOT_ALLOWED'})
                return
            }

            resolve(isLogged)
        })

})
