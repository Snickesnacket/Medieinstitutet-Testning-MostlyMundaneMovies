 /// <reference types="cypress" />


describe('Mostly Mundane Movies', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	context('Home page', () => {

		it.skip('should have title and Image ', () => {
		cy.get('.navbar-brand')
			.contains('Mostly Mundane Movies')

		cy.get('.navbar-brand')
			.find('img')
			.should('have.attr', 'src', '/assets/popcorn_1f37f-c604ebb9.png')

		})

		it.skip('should have an empty input field with a placeholder text', () => {
			cy.get('.form-control')
			.should('be.empty')
			.should('have.attr', 'placeholder', 'Enter movie title')

		})

		it.skip('should have a search and clear button', () => {
			cy.get('.btn-primary').should('be.visible').click().should('have.text', 'Search')
			cy.get('.btn-secondary').should('be.visible').click().should('have.text', 'Clear')
		})

		it.skip('should contain an empty search field', () => {
			cy.get('.form-control').should('be.empty')
		})
	})

	context('Search filed requirements', () => {

		it.skip('should not accept less than 3 characters', () => {
			const minCharacters= [' ','a', 'ab']
			minCharacters.forEach((search) => {
				cy.get('.form-control').clear()
				cy.get('.form-control').type(search)
				cy.get('button[type = "submit"]').click()
				cy.get('.fade').should('be.visible').contains('Wow, that was stupid')
			})
		})

		it.skip('should accept searches with more than 2 charcters', ()=> {
			cy.get('.form-control').type('abc')
			cy.get('button[type= "submit"]').click()
			cy.get('.movie-list').should('be.visible')
		})

	})
		context.skip(' Meet requirements for “The Matrix” search', () => {

		it('should give 10 movies', ()=> {
			cy.get('.form-control').type('The Matrix')
			cy.get('button[type = "submit"]').click()
			cy.get('.movie-list').should('be.visible')
			cy.get('.movie-list').find('.card > .card-img-top').should('have.length', 10)
		})
	})

	context('Loading-spinner', () => {
		it('should show a loading spinner when searching for results', () => {
			cy.get('.form-control').type('abc').should('have.length.greaterThan', 3)
			cy.get('button[type ="submit"]').click()
			cy.get('#loading-wrapper').should('be.visible')
		})
	})

	context.skip('Correct movie id', () => {
		it('should show the correct page when clicked on first matrix -movie', () => {
			cy.get('.form-control').type('The Matrix')
			cy.get('button[type ="submit"]').click()
			cy.get('.movie-list')
			cy.get(':nth-child(1) > .card > .card-body > .card-link').click()
			cy.location('pathname').should('equal', '/movies/tt0133093')
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
		it('should give a time-out',() => {
			cy.get('.form-control').type('the postman always rings twice')
			cy.get('button[type ="submit"]').click()
			cy.get('.movie-list').should('not.exist')
			cy.get('.fade').should('be.visible').contains('Does he, really?')

		})

	})
})


//Om man söker efter “the postman always rings twice” så ska requesten göra en timeout

//Om man går in på sökvägen för filmen med id tt1337 ska ett felmeddelande visas

//Om man går in på en sida som inte finns ska ett felmeddelande visas

//Mocka sök-request för “The Matrix” samt get-request för filmen “The Matrix” i Cypress (finns två olika requests) och svara med data från två fixtures
