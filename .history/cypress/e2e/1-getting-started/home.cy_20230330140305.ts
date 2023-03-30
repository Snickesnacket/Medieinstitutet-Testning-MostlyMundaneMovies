 /// <reference types="cypress" />


describe('Mostly Mundane Movies', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	context.skip('Home page', () => {

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

	context.skip('Search filed requirements', () => {

		it('should not accept less than 3 characters', () => {
			const minCharacters= [' ','a', 'ab']
			minCharacters.forEach((search) => {
				cy.get('.form-control').clear()
				cy.get('.form-control').type(search)
				cy.get('button[type = "submit"]').click()
				cy.get('.fade').should('be.visible').contains('Wow, that was stupid')
			})
		})

		it('should accept searches with more than 2 charcters', ()=> {
			cy.get('.form-control').type('abc')
			cy.get('button[type= "submit"]').click()
			cy.get('.movie-list').should('be.visible')
		})

	})
		//Kan söka efter “The Matrix” och få minst X antal sökträffar
		context.skip(' Meet requirements for “The Matrix” search', () => {

			it('should give 10 movies', ()=> {
				cy.get('.form-control').type('The Matrix')
				cy.get('button[type = "submit"]').click()
				cy.get('.movie-list').should('be.visible')
				cy.get('.movie-list').find('.card > .card-img-top').should('have.length', 10)
		})
	})
	//Medan man söker ska en loading-spinner visas
	context('Loading-spinner', () => {
		it('should show a loading spinner when searching for results', () => {
			cy.get('.form-control').type('abc')
			cy.get('button[type ="submit"]').click()
			cy.get('#loading-wrapper').should('be.visible')
		})
	})

	//Kan klicka på första sökträffen (när sidan laddat klart) och sidan man hamnar på ska matcha ID på filmen (via ett data-attribut)
	context('? ', () => {
		it('should show page when clicked on movie', () => {
			cy.get('.form-control').type('The Matrix')
			cy.get('button[type ="submit"]').click()
			cy.get('.movie-list').find(':nth-child(1) > .card > .card-img-top')
			cy.get.(':nth-child(1) > .card > .card-img-top').should('".have.attr", "tt0133093"')
		})
	})

})




	/*

  it('displays two todo items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.todo-list li').should('have.length', 2)

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat'

    // Let's get the input element and use the `type` command to
    // input our new list item. After typing the content of our item,
    // we need to type the enter key as well in order to submit the input.
    // This input has a data-test attribute so we'll use that to select the
    // element in accordance with best practices:
    // https://on.cypress.io/selecting-elements
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    // In addition, with the two default items, we should have a total of 3 elements in the list.
    // Since assertions yield the element that was asserted on,
    // we can chain both of these assertions together into a single statement.
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
    // In addition to using the `get` command to get an element by selector,
    // we can also use the `contains` command to get an element by its contents.
    // However, this will yield the <label>, which is lowest-level element that contains the text.
    // In order to check the item, we'll find the <input> element for this <label>
    // by traversing up the dom to the parent element. From there, we can `find`
    // the child checkbox <input> element and use the `check` command to check it.
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check()

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    // Again we'll use `contains` to find the <label> element and then use the `parents` command
    // to traverse multiple levels up the dom until we find the corresponding <li> element.
    // Once we get that element, we can assert that it has the completed class.
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed')
  })

  context('with a checked task', () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains('Active').click()

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog')

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      cy.contains('Pay electric bill').should('not.exist')
    })

    it('can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog').should('not.exist')
    })

    it('can delete all completed tasks', () => {
      // First, let's click the "Clear completed" button
      // `contains` is actually serving two purposes here.
      // First, it's ensuring that the button exists within the dom.
      // This button only appears when at least one task is checked
      // so this command is implicitly verifying that it does exist.
      // Second, it selects the button so we can click it.
      cy.contains('Clear completed').click()

      // Then we can make sure that there is only one element
      // in the list and our element does not exist
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      // Finally, make sure that the clear button no longer exists.
      cy.contains('Clear completed').should('not.exist')
    })
  })
})

 */
