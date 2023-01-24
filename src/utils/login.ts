interface LoginProps {
    login: string
    password: string
}

type UserRole = 'admin' | 'sale-keeper'

interface UserProps {
    name: string
    phone_number: string
    login: string
    password: string
    role: UserRole | string
    color: string
}


export class User implements UserProps {
    public readonly _id: string

    constructor (
        public readonly name: string,
        public readonly phone_number: string,
        public readonly login: string,
        public readonly password: string,
        public readonly role: string,
        public readonly color: string
    ) {
        this._id = login
    }
}


function LoadUsersFromLocal() {
    const users = window.localStorage.getItem('list-users')

    if (users === null) {
        const newUsers = SeedUsers()
        window.localStorage.setItem('list-users', JSON.stringify(newUsers))
        return newUsers
    }
    
    return JSON.parse(users)   
}

function UpdateUsersFromLocal(user: User) {
    const cached = window.localStorage.getItem('list-users') ?? '{}'
    const users: any = JSON.parse(cached)  

    const exists = users[`${user._id}`] !== undefined

    if (!exists) {
        users[user._id] = user
        window.localStorage.setItem('list-users', JSON.stringify(users)) 
    }

    return users
}

function ReplaceUsersFromLocal(user: User) {
    const cached = window.localStorage.getItem('list-users') ?? '{}'
    const users: any = JSON.parse(cached)  

    const exists = users[`${user._id}`] !== undefined

    if (exists) {
        users[user._id] = user
        window.localStorage.setItem('list-users', JSON.stringify(users)) 
    }

    return users
}

export function CheckLogin (access: LoginProps) : User | undefined {
    const user = LoadUsersFromLocal()[access.login]

    if (user !== undefined && user.password === access.password) {
        const _user = new User(
            user.name,
            user.phone_number,
            user.login,
            user.password,
            user.role,
            user.color
        )
        
        
        return _user
    }
    return undefined
}

export function CreateUser (props: UserProps) : User | undefined{
    LoadUsersFromLocal()
    const alreadyExists = LoadUsersFromLocal()[props.login] !== undefined

    if (alreadyExists) {
        return undefined
    }

    const user = new User(
        props.name,
        props.phone_number,
        props.login,
        props.password,
        props.role,
        props.color
    )

    UpdateUsersFromLocal(user)

    return user
}

export function UpdateUser (id: string, props: UserProps) : User | undefined{
    LoadUsersFromLocal()
    const user = LoadUsersFromLocal()[props.login]

    if (user === undefined ) {
        return undefined
    }

    ReplaceUsersFromLocal({
        _id: id,
        name: props.name,
        login: id,
        password: props.password,
        phone_number: props.phone_number,
        color: props.color,
        role: props.role,
    })

    return user
}

export function DeleteUser (id: string) {
    const users = LoadUsersFromLocal()
    users[`${id}`] = undefined
    delete users[`${id}`]

    window.localStorage.setItem('list-users', JSON.stringify(users))

    window.location.reload()
}

export function ListUsers () {
    return LoadUsersFromLocal()
}

export default function (props: LoginProps) {
    const delay = (0.4 + Math.random() * 2 ) * 1000

    return new Promise((resolve: any, reject: any) => {
        setTimeout(() => {
            const userLogged = CheckLogin(props)

            if (userLogged !== undefined) {
                return resolve(userLogged)
            }
            return reject({
                message: 'Usuário ou Senha inválido.'
            })

        })
    });
}



// Seed
function SeedUsers () {
    return {
        'admin': new User(
            '[ADMIN] BR Gaming',
            '5579999887766',
            'admin',
            'password123',
            'admin',
            '#ff00a1'
        ),
        'sales': new User(
            '[SALE KEEPER] BR Gaming',
            '5579987654321',
            'sales',
            'password1234',
            'sale-keeper',
            '#fff000'
        )
    }
}

