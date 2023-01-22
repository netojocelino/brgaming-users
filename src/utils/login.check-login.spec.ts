import { expect, test } from 'vitest'

import { CheckLogin, User, CreateUser } from './login'


test('Should be undefined when login and password not exists', async () => {
    const input = {
        login: 'naoexiste@email.com',
        password: 'senha-invalida@123'
    }

    const user = CheckLogin(input)

    expect(user).toBeUndefined()
})

test('Should be undefined when login is invalid', async () => {
    const input = {
        login: 'Admin',
        password: 'password123'
    }

    const user = CheckLogin(input)

    expect(user).toBeUndefined()
})

test('Should be undefined when password is invalid', async () => {
    const input = {
        login: 'admin',
        password: 'Password123'
    }

    const user = CheckLogin(input)

    expect(user).toBeUndefined()
})

test('Should returns user when data is valid', async () => {
    const input = {
        login: 'admin',
        password: 'password123'
    }

    const user = CheckLogin(input)

    expect(user).instanceOf(User)
})


test('Should not create an user when login already exists', async () => {
    const input = {
        login: 'admin',
        password: 'password123456',
        name: 'any',
        phone_number: 'any',
        role: 'admin',
        color: '#fff000'
    }

    expect(() => CreateUser(input))
        .toThrow('Usuário já existe')
})

test('Should create an user when login not exists', async () => {
    const input = {
        login: 'admin_' + (new Date()),
        password: 'password123456',
        name: 'any',
        phone_number: 'any',
        role: 'admin',
        color: '#fff000'
    }

    const usr = CreateUser(input)

    expect(usr)
        .instanceOf(User)
    expect(usr.login)
        .toEqual(input.login)
    expect(usr.role)
        .toEqual(input.role)
    expect(usr.color)
        .toEqual(input.color)
})
