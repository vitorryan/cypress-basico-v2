/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach('rota', function() {
        cy.visit('./src/index.html')
    })

    it('verificar título', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('escrever nos campos de nome, sobrenome, email', function() {
        cy.get('#firstName').type('vitor')
        cy.get('#lastName').type('ryan')
        cy.get('#email').type('vitorteste@teste.com')
        cy.wait(1000)
        cy.get('#open-text-area').type('deu certo essa porra caralho!! vamooooooo é us guri e não adianta', {delay: 50})
       // CLICANDO NO BOTÃO
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('escrever email errado, verificar mensagem de erro, apagar email e verificar se o campo esta vazio', function() {
        cy.get('#firstName').type('Vitor', {delay:100})
        cy.get('#lastName').type('Rosa', {delay:100})
        cy.get('#email').type('vitor@teste,com', {delay:100})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
//Verificar e limpar campo de email
        cy.get('#email').should('have.value', 'vitor@teste,com')
        cy.get('#email').clear().should('have.value', '')
    })
    
    it('clicar no botão enviar e verificar mensagem de erro', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Clicar no check-box do telefone e verificar se ele ficou obrigatorio', function() {
        cy.get('#phone-checkbox').click()
        cy.get('.phone-label-span').should('be.visible')
    })

    it('Deixar telefone obrigatorio e tentar enviar formulario sem telefone prenchido', function() {
        cy.get('#phone-checkbox').click()
        cy.get('.phone-label-span').should('be.visible')

        cy.get('#firstName').type('vitor')
        cy.get('#lastName').type('ryan')
        cy.get('#email').type('vitorteste@teste.com')
        cy.get('#open-text-area').type('Deu certo familia!!')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        
    })

    it('preencher formúlario completo com telefone obrigatorio', function() {
        cy.get('#firstName').type('vitor')
        cy.get('#lastName').type('Ryan')
        cy.get('#email').type('vitor@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('.phone-label-span').should('be.visible')
        cy.get('#phone').type('51992839283')
        cy.get('#open-text-area').type('Deu certo familia!')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('Aprendendo a selecionar uma opção em um modal suspenso', function() {
        cy.get('select').select('youtube')
        cy.get('select').should('be.visible', 'youtube')

    })
})


  