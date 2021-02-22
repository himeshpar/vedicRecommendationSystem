const sum = require('./filter')

test('properly filters and displays the list of personalized books', () => {
  expect(
    displayBookData
    ).toBe(books)
})


test('properly navigates the user to the correct book page', () => {
  expect(
    displayBookData
    ).toBe(books)
})

test('properly displays books in the search bar and navigates them to the correct page', () => {
  expect(
    getBookData
    ).toBe(bookInfo)
})