
describe('Mostly Mundane Movies', () => {

	beforeEach(() => {
 	cy.intercept('GET', 'https://www.omdbapi.com/?s=the%20matrix&type=movie&apikey=c407a477', {
  	fixture: 'theMatrix.json'
		})
	cy.visit('/')
	})

	context('Home page', () => {

		it('should have title and Image ', () => {
		cy.get('.navbar-brand')
			.contains('Mostly Mundane Movies')

		cy.get('.navbar-brand')
			.find('img')
			.should('have.attr', 'src', '/assets/popcorn_1f37f-c604ebb9.png')

		})

		it('should have an empty input field with a placeholder text', () => {
			cy.get('.form-control')
			.should('be.empty')
			.should('have.attr', 'placeholder', 'Enter movie title')

		})

		it('should have a search and clear button', () => {
			cy.get('.btn-primary').should('be.visible').click().should('have.text', 'Search')
			cy.get('.btn-secondary').should('be.visible').click().should('have.text', 'Clear')
		})

		it('should contain an empty search field', () => {
			cy.get('.form-control').should('be.empty')
		})
	})

	context('Search filed requirements', () => {

		it('should not accept less than 3 characters', () => {
			const minCharacters= [' ','a', 'ab']
			minCharacters.forEach((search) => {
				cy.get('.form-control').type(search)
				cy.get('button[type = "submit"]').click()
				cy.get('.fade').should('be.visible')
			})
		})

		it('should accept searches with more than 2 charcters', ()=> {
			cy.get('.form-control').type('abc')
			cy.get('button[type= "submit"]').click()
			cy.get('.movie-list').should('be.visible')
		})

	})
	context(' Meet requirements for “The Matrix” search', () => {

		it('should give 10 movies', ()=> {
			cy.get('.form-control').type('The Matrix')
			cy.get('button[type = "submit"]').click()
			cy.get('.movie-list').should('be.visible')
			cy.get('.movie-list').find('.card > .card-img-top').should('have.length.at.least', 10)
		})

	})

	context('Loading-spinner', () => {
		it('should show a loading spinner when searching for results', () => {

			cy.get('.form-control').type('abc')
			cy.get('button[type ="submit"]').click()
			cy.get('#loading-wrapper').should('be.visible')
		})
	})

	context('Correct movie id', () => {
		it('should show the correct page when clicked on first matrix -movie', () => {
			cy.get('.form-control').type('The Matrix')
			cy.get('button[type ="submit"]').click()
			cy.get('.movie-list')
			cy.get('.movie-list-item > :nth-child(1)').should("have.attr", 'data-imdb-id').wait(1000)
			.then((movieId) => {
				cy.log(`Got me some movieId: ${movieId}`)
				cy.get('.movie-list').first()
				cy.get('a').eq(1).click()
				cy.location('pathname').should('eq', `/movies/${movieId}`)
			})

		})
	})

	context('Isaks memes', () => {
		it('should not show any movies',() => {
			cy.get('.form-control').type('Isaks Memes')
			cy.get('button[type ="submit"]').click()
			cy.get('.movie-list').should('not.exist')
			cy.get('.fade').should('be.visible').contains('Movie not found!')

		})

	})

	context('Postman request ', () => {
		it('should give a timeout', {defaultCommandTimeout: 6000},() => {
			cy.get('.form-control').type('the postman always rings twice')
			cy.get('button[type ="submit"]').click()
			cy.get('.movie-list').should('not.exist')
			cy.get('.fade').should('be.visible')
		})

	})

	context('tt1337', () => {
		it('tt1337 in search path should show error-message', () => {
			cy.visit('/tt1337')
			cy.get('.fade').should('be.visible').contains("It's not us, it's you")
		})
	})

	context('non-existing page', () => {
		it('should show error if page dosent exist', () => {
			cy.visit('/tjosan')
			cy.get('.fade').should('be.visible').contains("It's not us, it's you")

			/* cy.url().should('not', 'contain', '/tjosan')
			cy.wait('@redirect')
			cy.contains('Welcome to my website!') */

		})
	})

	context('mocking of movie the matrix ', () => {
		it('should find the matrix movie according with the title ', () => {
		cy.intercept('GET', 'https://www.omdbapi.com/?i=tt0133093&apikey=c407a477', {
			fixture: 'aMatrixMovie.json'
		}).as('getMovie')

			cy.get('.form-control').type('The Matrix')
			cy.get('button[type ="submit"]').click()
			cy.get('.movie-list')
			cy.get('.movie-list-item > :nth-child(1)').should("have.attr", 'data-imdb-id').wait(1000)
			.then((movieId) => {
				cy.log(`Got me some movieId: ${movieId}`)
				cy.get('.movie-list').first()
				cy.get('a').eq(1).click()
				cy.location('pathname').should('eq', `/movies/${movieId}`)
			})

			 cy.get('.card-body')
			 cy.get('.card-title').contains('The Matrix')
			cy.get('.card-text').should('have.text', 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.')
		})
	})
})



