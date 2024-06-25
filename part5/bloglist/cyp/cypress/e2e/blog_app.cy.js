describe('blog app', function() {

    beforeEach(function() {

      cy.request('POST', 'http://localhost:3001/api/testing/reset')

      const user = {
      name: 'Arthas Menethil',
      username: 'art',
      password: 'sekret'
      }

      //checking the deleting functionality that it's not possible by someone else!
      const user2 = {
        name:'Supra',
        username:'wower',
        password:'sekret'

      }

      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.request('POST', 'http://localhost:3001/api/users/', user2)  
      cy.visit('http://localhost:5173/')
    })
    

    it('Login form is shown', function() {
      cy.contains('Username:')
      cy.contains('Password:')
      cy.contains('login')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        
          cy.get('#username').type('art')
          cy.get('#password').type('sekret')
          cy.get('#login-button').click()

          cy.contains('Arthas Menethil logged-in')
      })
  
      it('fails with wrong credentials', function() {

        cy.get('#username').type('art')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error').should('contain', 'wrong username or password!')
        
      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
          cy.get('#username').type('art')
          cy.get('#password').type('sekret')
          cy.get('#login-button').click()

      })
  
      it('A blog can be created', function() {
        cy.get('#new-blog-button').click()
        cy.get('#title').type('a new blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('cypresshill.com')
        cy.get('#submit').click()
        cy.contains('a new blog - cypress')
      })

      it('A blog can be liked', function() {

        cy.get('#new-blog-button').click()
        cy.get('#title').type('a new blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('cypresshill.com')
        cy.get('#submit').click()
        cy.contains('a new blog - cypress')
        cy.get('#show').click()

        cy.get('.likes').should('contain', 'Likes: 0') //initial likes count

        cy.get('#like').click()

        cy.get('.likes').should('contain', 'Likes: 1')//after liking
        
      })

      it('a blog can be deleted by its creator',function(){

        cy.get('#new-blog-button').click()
        cy.get('#title').type('a new blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('cypresshill.com')
        cy.get('#submit').click()
        cy.get('.blog-list').should('contain', 'a new blog - cypress')
        cy.get('#show').click()
        cy.get('#delete').click()
        cy.get('.blog-list').should('not.contain', 'a new blog - cypress')

      })

      it('no one else can see delete button',function(){

        cy.get('#new-blog-button').click()
        cy.get('#title').type('a new blog')
        cy.get('#author').type('cypress')
        cy.get('#url').type('cypresshill.com')
        cy.get('#submit').click()
        cy.get('.blog-list').should('contain', 'a new blog - cypress')
        cy.get('#show').click()
        cy.get('.info').contains('remove').should('be.visible');
        cy.get('#logout').click()
        //login with different user.

        cy.get('#username').type('wower')
        cy.get('#password').type('sekret')
        cy.get('#login-button').click()
        cy.get('.blog-list').should('contain', 'a new blog - cypress')
        cy.get('#show').click()

        cy.get('.info').contains('remove').should('not.be.visible');


      })
    })
  


})