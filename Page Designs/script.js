const categorySelect = document.getElementById('category-select')
const bookList = document.getElementById('books-list')

queryFetch(`
  query {
    categories {
      tags
    }
  }
`).then(data => {
  data.data.categories.forEach(category => {
    const option = document.createElement('option')
    option.value = category.tags
    option.innerText = category.tags
    categorySelect.append(option)

  })
})

categorySelect.addEventListener('change', async e => {
  const categoryCode = e.target.value
  const books = await getCategoryBooks
  (categoryCode)
  console.log(books)
  bookList.innerHTML = ''
  books.forEach(book => {
    console.log(book.books);
    var i;
    for (i = 0; i < book.books.length; i++){
      const element = document.createElement('a')
      const link = document.createElement("img")
      element.setAttribute("href", book.books[i].imageurl)
      link.setAttribute("src", book.books[i].imageurl)
      link.setAttribute("height", "250px")
      element.appendChild(link)
      const title = document.createElement('div')
      title.innerText = book.id[i].title

      //element.src = book.books[i].bookcover
      console.log(book.books[i].imageurl)
      console.log(book.id[i].title)
      bookList.append(element)
      bookList.append(title)
    
      
    }
    
  })
})
function getCategoryBooks(categoryCode) {
  return queryFetch(` 
    query getBooks($tags :String) {
      categories (where: {tags: $tags}) {
        id: 
          books{title}
          books{bookcover{url}}
          books{imageurl} 
          
        }
        
      }
    
  `, { tags: categoryCode }).then(data => {
    return data.data.categories

  })

}

function queryFetch(query, variables){
  return fetch('http://localhost:1337/graphql', {
    method: 'POST',
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables 
    })
  }).then(res => res.json())
}