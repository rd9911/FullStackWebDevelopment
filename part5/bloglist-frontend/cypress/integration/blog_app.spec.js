describe('Blog app', function() { //  discouraged to use use arrow functions (=>) because it cannot access to the context (this)
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/test/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'poiuyt', password: 'abc123' })
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'luo', password: 'abc123' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is hsown', function() {
    cy.contains('Login')
    cy.get('.log-in').click()
  })

  describe('Login', function() {
    it('fills in the login form and renders login message', function() {
      cy.get('.log-in').click()
      cy.get('.username').type('poiuyt')
      cy.get('.password').type('abc123')
      cy.get('#submitForm').click()

      cy.contains('poiuyt logged in')
    })
    it('fails to login and renders error message', function() {
      cy.get('.log-in').click()
      cy.get('.username').type('hohoho')
      cy.get('.password').type('abc123')
      cy.get('#submitForm').click()

      cy.contains('invalid username or password')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login('poiuyt', 'abc123')
      })

      it('create a new blog', function() {
        cy.get('.create-blog').click()
        cy.get('.title').type('SK in Asia')
        cy.get('.author').type('Chan Won')
        cy.get('.url').type('sk.kr')
        cy.contains('create').click()
        cy.contains('SK in Asia by Chan Won')
      })

      describe('Features', function() {
        beforeEach(function() {
          cy.postBlog('hey', 'Arauf', 'ol.ru', 3)
        })

        it('like a blog', function() {
          cy.contains('view').click()
            .get('.like').click()
          cy.contains('the blog hey is liked by poiuyt')
        })
        it('delete a blog', function() {
          cy.contains('view').click()
            .get('.delete').click()
          cy.on('window:confirm', () => true)
          cy.contains('hey was deleted by poiuyt')
        })
        it('fails to delete a blog if the user did not create it', function() {
          cy.get('.logout').click()
          cy.login('luo', 'abc123')
          cy.contains('view').click()
            .get('.delete').click()
          cy.on('window:confirm', () => true)
          cy.contains('missing or invalid token.')
        })

        describe('Sort the blogs', function() {
          beforeEach(function(){
            cy.postBlog('lol', 'pola', 'ol.ru', 5)
            cy.postBlog('bye', 'kiiuy', 'ol.ru', 6)
            cy.postBlog('kio', 'juiyl', 'ol.ru', 2)
          })
          it('blogs are sorted by number of likes in descending order', function() {
            cy.get('.short-view')
              .then(blogs => {
                cy.wrap(blogs[0]).contains('bye')
              })
          })
          it.only('blogs are automatically re-sorted after licking like', function() {
            cy.get('.short-view')
              .then(blogs => {
                cy.wrap(blogs[0]).contains('bye')
              })
            cy.contains('lol by pola').find('.view').click()
            cy.contains('lol by pola').find('.like').click()
            cy.contains('lol by pola').find('.like').click()
            cy.contains('lol by pola').find('.hide').click()
            cy.get('.short-view')
              .then(blogs => {
                cy.wrap(blogs[0]).contains('lol by pola')
              })
          })
        })
      })
    })
  })
})

// get all blogs > get the most liked > check index
//             & > get the least liked > check index


// create router in controllers in order to make api calls to empty database status(204).end()
// add router to express app IF test mode
// make sure to run backend in test mode
// change beforeEach to add a user with HTTP method
// for requests use cy.request()
// use it.only() to run only broken or developing tests
// .should(assertion, expected) is good way to assert things
// for checking any css colors, it is required to give them as RGB
// Some css properties behave differently on Firefox
// Bypassing UI:
//    1. Test Login but only once!
//    2. Then do HTTP request and login with .request()
//    3. In order to save user credentials to localStorage use .request() as promise and within it stringify all json from response body
//    4. To make more shortcuts, use custom commands of cypress: Cypress.Commands.add(commandName, ({arguments})) => {definition}
// chaining is important because wiyth every command code searches from top down repeatedly
// when we want to access to element outside of gotten element but within the same parent element, we can use .parent().find(element) but not parent().get() because it searches from the whole page
// when we have a lot of copypastes with the same element we can use .as() and get access to it via .get(@elementNameFromAs)
// we can't access debugger() of cypress command from js code because it will exedcute every command in the queue. BUt we can achieve this goal by using .then() promises and get access to the return value of cy command. debugger only works when dev console is open
// cypress run is script to run tests as GUI. cypress/videos should be gitignored