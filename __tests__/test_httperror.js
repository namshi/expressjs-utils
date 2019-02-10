const express = require('express')
const request = require('supertest')
const utils = require('../index')
const translationObject = require('./translations')

describe('Express Utils', () => {

    describe('errorhandler', () => {
        const app = express()
        app.get('/400', (req, res) => {
            const err = new Error()
            err.statusCode = 400
            err.message = 'This is a bad error'
            throw err
        })

        app.get('/400/translated', (req, res) => {
            req.locale = {
                lang: 'ar'
            }
            const err = new Error()
            err.statusCode = 400
            err.message = 'invalidCredentials'
            throw err
        })

        app.get('/400/untranslated', (req, res) => {
            req.locale = {
                lang: 'ar'
            }
            const err = new Error()
            err.statusCode = 400
            err.message = 'untranslated'
            throw err
        })

        app.get('/', (req, res) => {
            const err = new Error()
            throw err
        })
        utils.errorHandler(app, null, {
            translationObject
        })

        test('should return with correct statusCode and body.message when middleware is applied', async () => {
            const resp = await request(app).get('/400')
            expect(resp.body.message).toEqual('This is a bad error')
            expect(resp.statusCode).toEqual(400)
        })

        test('should use a 500 when error status is not specified', async() => {
            const resp = await request(app).get('/')
            expect(resp.body.message).toEqual('Internal Server Error')
            expect(resp.statusCode).toEqual(500)
        })

        test('should return translated userMessage', async () => {
            const resp = await request(app).get('/400/translated')
            expect(resp.body.userMessage).toEqual('كلمة السر / البريد الالكتروني الذي تم إدخاله غير صحيح')
            expect(resp.statusCode).toEqual(400)
        })

        test('should return raw untranslated usermessage if translations entry is not found', async () => {
            const resp = await request(app).get('/400/untranslated')
            expect(resp.body.userMessage).toEqual('untranslated')
        })
    })
})