import { expect, test } from 'vitest'

import { CheckLogin, User, CreateUser, ListUsers } from './login'

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
    const completeData = {
        name: 'any-fail',
        phone_number: 'any-fail',
        role: 'admin',
        color: '#fff000'
    }
    const input = {
        login: 'admin',
        password: 'password123'
    }
    CreateUser({
        ...completeData,
        ...input,
    })

    const user = CheckLogin(input)

    expect(user).instanceOf(User)
})


test('Should not create an user when login already exists', async () => {
    const input = {
        login: 'admin',
        password: 'password123456',
        name: 'any-fail',
        phone_number: 'any-fail',
        role: 'admin',
        color: '#fff000'
    }

    CreateUser(input)

    const user = CreateUser(input)
        
    expect(user)
        .toBeUndefined()
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
        .not.toBeNull()
    expect(usr)
        .instanceOf(User)
    expect(usr!.login)
        .toEqual(input.login)
    expect(usr!.role)
        .toEqual(input.role)
    expect(usr!.color)
        .toEqual(input.color)
})


test('Should create a user that not exists', () => {
    const before = Object.keys(ListUsers()).length

    const user = CreateUser({
        color: '#aaaaaa',
        login: 'valid123',
        name: 'valid123',
        password: 'valid123',
        phone_number: '789458978',
        role: 'admin'
    })

    expect(Object.keys(ListUsers()).length)
        .toBeGreaterThan(before)
})
