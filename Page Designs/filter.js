btnShow.addEventListener('click', () => {
  let checkbox = document.querySelector('input[type= "checkbox":checked');
    // Get the checkbox
    var checkBox = document.getElementById("formCheck-1");
    var checkBox2 = document.getElementById("formCheck-2");
    var checkBox3 = document.getElementById("formCheck-3");
    var checkBox4 = document.getElementById("formCheck-4");
    var checkBox5 = document.getElementById("formCheck-5");
    var checkBox6 = document.getElementById("formCheck-6");
    var checkBox7 = document.getElementById("formCheck-7");
    var checkBox8 = document.getElementById("formCheck-8");
    var checkBox9 = document.getElementById("formCheck-9");
    var checkBox10 = document.getElementById("formCheck-10");
})

function getCategoryBooks(categoryCode) {
  return queryFetch(` 
    query getBooks($tags :[String]) {
      categories (where: {tags: $tags}) {
        id: 
        books{title}
    		books{imageurl}
        }
      }
  `, { tags: categoryCode }).then(data => {
    return data.data.categories
  })
}

async function recommendBook(){
const bookList = document.getElementById('books-list')
bookList.innerHTML = ''

  var categories = new Array(10);
  var i = 0; 

  var checkBox = document.getElementById("formCheck-1");
  console.log(checkBox.checked)
  if (document.getElementById("formCheck-1").checked) {
    categories[i] = "Biography";
    i++;
    
  }

  if (document.getElementById("formCheck-2").checked) {
    
    categories[i] = "Cooking";
    i++;
    
  }

  if (document.getElementById("formCheck-3").checked) {
    
    categories[i] = "Happiness";
    i++;
    
  }


  if (document.getElementById("formCheck-4").checked) {
    
    categories[i] = "Lifestyle";
    i++;
    
  }

  if (document.getElementById("formCheck-5").checked) {
    
    categories[i] = "Mindfulness / Well-being";
    i++;
    
  }

  if (document.getElementById("formCheck-6").checked) {
    
    categories[i] = "Philosophy";
    i++;
    
  }

  if (document.getElementById("formCheck-7").checked) {
    
    categories[i] = "Purpose / Personal Development";
    i++;
    
  }

  if (document.getElementById("formCheck-8").checked) {
    
    categories[i] = "Religion and Spirituality";
    i++;
    
  }

  if (document.getElementById("formCheck-9").checked) {
    
    categories[i] = "Science";
    i++;
    
  }

  if (document.getElementById("formCheck-10").checked) {
    
    categories[i] = "Yoga";
    i++;
    
  }
// displays the book title
  // categories.forEach(e => console.log(e));
  // console.log(getCategoryBooks(categories)); 
  // var books = await getCategoryBooks(categories);
  // console.log(Promise.resolve(books));
  // var j;
  // var titles = [];
  // for (j = 0; j < books.length; j++)
  //  {
  //   console.log(books[j].id);
  //   var i;
  //   for (i = 0; i < books[j].id.length; i++){
  //     if (titles.indexOf(books[j].id[i].title) == -1) 
  //     { 
  //     const element = document.createElement('div')
  //     element.innerText = books[j].id[i].title
  //     bookList.append(element) 
  //     titles.push(books[j].id[i].title);

  categories.forEach(e => console.log(e));
  console.log(getCategoryBooks(categories)); 
  var books = await getCategoryBooks(categories);
  console.log(Promise.resolve(books));
  var j;
  var titles = [];
  for (j = 0; j < books.length; j++)
   {
    console.log(books[j].id);
    var i;
    for (i = 0; i < books[j].id.length; i++){
      if (titles.indexOf(books[j].id[i].title) == -1)
      { 
      console.log(books[j])
      const element = document.createElement('a')
      const link = document.createElement("img")
      element.setAttribute("href", books[j].books[i].imageurl)
      link.setAttribute("src", books[j].books[i].imageurl)
      link.setAttribute("height", "250px")
      element.appendChild(link)
      const title = document.createElement('div')
      title.innerText = books[j].id[i].title
      bookList.append(element) 
      bookList.append(title)
      titles.push(books[j].id[i].title);
    }
    }
  }
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