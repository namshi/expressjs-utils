const express = require('express')
const request = require('supertest')
const assert = require('assert')
const utils = require('../index')
const translations = require('./translations')

describe('Express Utils', () => {

    describe('errorhandler', () => {
        const app = express()
        app.use(utils.withTranslate({translations, 
            defaultlang: 'en', 
            localeQueryKey: 'locale'}))

        app.get('/400', (req, res) => {
            const err = new Error()
            err.statusCode = 400
            err.message = 'This is a bad error'
            throw err
        })

        app.get('/400/translated', (req, res) => {
            const err = new Error()
            err.statusCode = 400
            err.message = 'invalidCredentials'
            throw err
        })

        app.get('/400/untranslated', (req, res) => {
            const err = new Error()
            err.statusCode = 400
            err.message = 'untranslated'
            throw err
        })

        app.get('/', (req, res) => {
            const err = new Error()
            throw err
        })
        
        utils.errorHandler(app)

        it('should return with correct statusCode and body.message when middleware is applied', async () => {
            const resp = await request(app).get('/400')
            assert.equal(resp.body.message, 'This is a bad error')
            assert.equal(resp.statusCode, 400)
        })

        it('should use a 500 when error status is not specified', async() => {
            const resp = await request(app).get('/')
            assert.equal(resp.body.message, 'Internal Server Error')
            assert.equal(resp.statusCode, 500)
        })

        it('should return translated userMessage', async () => {
            const resp = await request(app).get('/400/translated?locale=ar')
            assert.equal(resp.body.userMessage, 'كلمة السر / البريد الالكتروني الذي تم إدخاله غير صحيح')
            assert.equal(resp.statusCode, 400)
        })

        it('should return raw untranslated usermessage if translations entry is not found', async () => {
            const resp = await request(app).get('/400/untranslated')
            assert.equal(resp.body.userMessage, 'untranslated')
        })
    })
})