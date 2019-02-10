const express = require('express')
const request = require('supertest')
const utils = require('../index')

describe('Express Utils', () => {

    describe('errorhandler', () => {
        const app = express()
        app.get('/400', (req, res) => {
            const err = new Error()
            err.statusCode = 400
            err.message = 'This is a bad error'
            throw err
        })

        app.get('/', (req, res) => {
            const err = new Error()
            throw err
        })
        utils.errorHandler(app)

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
    })
})