
import { app } from '../index'
import request from 'supertest'

describe("Conexão com o servidor", () => {
    afterAll((done) => {
        done()
    })
    it('Testando Conexão', async () => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
    })
    
})

describe("Authentication", () => {
    afterAll((done) => {
        done()
    })

    const wrongEmail = "naoseiporquevocesefoi@quantasaudadeeusenti.edetristezavouviver"
    const rightEmail = "naodelete@teste.com"
    const rightPassword = 'nao'
    const wrongPassword = 'aqueleadeusnaopudedar'
    it('Testando Login com Email Errado e Senha Certa', async() => {
        const response = await request(app).post('/user/login').send(
            {"email": wrongEmail, password: rightPassword}
        )
        expect(response.status).toBe(404)

    })

    it('Testando Login com Email Correto e Senha Errada', async() => {
        const response = await request(app).post('/user/login').send(
            {"email": rightEmail, password: wrongPassword}
        )
        expect(response.status).toBe(400)
    })

    it('Testando Login com Email e Senha Corretos', async() => {
        const response = await request(app).post('/user/login').send(
            {"email": rightEmail, password: "nao"}
        )
        expect(response.status).toBe(200)
    })
})