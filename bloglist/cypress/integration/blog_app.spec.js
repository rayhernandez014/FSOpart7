describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user1 = {
      name: 'Ray Hernandez',
      username: 'ray01',
      password: 'passw0rd'
    }

    const user2 = {
      name: 'Miguel Cabrera',
      username: 'mig01',
      password: 'passw0rd'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ray01')
      cy.get('#password').type('passw0rd')
      cy.get('#login-button').click()

      cy.contains('Ray Hernandez logged in')

      cy.get('.notification')
        .should('contain', 'you logged in as Ray Hernandez!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('ray01')
      cy.get('#password').type('kewdmkjen')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')

      cy.get('.notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Ray Hernandez logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ray01', password: 'passw0rd' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Las ocurrencias de Julio')
      cy.get('#author').type('Julio')
      cy.get('#url').type('blog.com')
      cy.get('#create-button').click()

      cy.contains('Las ocurrencias de Julio')
    })

    describe('When loggedd in and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Las ocurrencias de Julio',
          author: 'Julio',
          url: 'blog.com'
        })
      })

      it('A blog can be liked', function () {
        cy.get('#view-button').click()
        cy.get('#like-button').click()
      })

      it('The user who created a blog can delete it', function () {
        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.get('html').should('not.contain', 'Las ocurrencias de Julio')
      })
    })
  })

  describe('When loggedd in and a blog from a different user exists', function () {
    beforeEach(function () {
      cy.login({ username: 'mig01', password: 'passw0rd' })

      cy.createBlog({
        title: 'Pan con mantequilla',
        author: 'Pablo',
        url: 'blog.com'
      })

      cy.get('#logout-button').click()

      cy.login({ username: 'ray01', password: 'passw0rd' })

      cy.createBlog({
        title: 'Las ocurrencias de Julio',
        author: 'Julio',
        url: 'blog.com'
      })
    })

    it('A user cannot delete other user blog', function () {
      cy.contains('Pan con mantequilla').parent().as('theBlog')
      cy.get('@theBlog').find('#view-button').click()
      cy.get('@theBlog').should('not.contain', '#remove-button')
    })

    it('blogs are ordered according to number of likes', function () {
      cy.contains('Las ocurrencias de Julio').parent().as('theBlog')
      cy.get('@theBlog').find('#view-button').click()
      cy.get('@theBlog').find('#like-button').click()
      cy.wait(500)
      cy.get('.blog').eq(0).should('contain', 'Las ocurrencias de Julio')
      cy.get('.blog').eq(1).should('contain', 'Pan con mantequilla')
    })
  })
})
