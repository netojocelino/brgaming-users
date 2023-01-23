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

const UserSaved: User[] = []

export class User implements UserProps {
    public readonly _id: Number

    constructor (
        public readonly name: string,
        public readonly phone_number: string,
        public readonly login: string,
        public readonly password: string,
        public readonly role: string,
        public readonly color: string
    ) {
        this._id = UserSaved.length + 1
    }
}

export function CheckLogin (access: LoginProps) {
    const user = UserSaved.find(
        (current) => current.login === access.login && current.password === access.password
    )
    return user
}

export function CreateUser (props: UserProps) {
    const alreadyExists = UserSaved.findIndex((user) => user.login === props.login) !== -1
    if (alreadyExists) {
        throw new Error('Usuário já existe')
    }

    const user = new User(
        props.name,
        props.phone_number,
        props.login,
        props.password,
        props.role,
        props.color
    )

    UserSaved.push(user)

    return user
}

export function ListUsers () {
    return UserSaved
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

CreateUser({
    name: '[ADMIN] BR Gaming',
    phone_number: '5579999887766',
    login: 'admin',
    password: 'password123',
    role: 'admin',
    color: '#ff00a1'
})
CreateUser({
    name: '[SALE KEEPER] BR Gaming',
    phone_number: '5579987654321',
    login: 'sales',
    password: 'password1234',
    role: 'sale-keeper',
    color: '#fff000'
})
