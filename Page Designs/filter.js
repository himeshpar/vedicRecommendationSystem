var bookData = {};
var bookLists = [];
var bookAllLists = [];

btnShow.addEventListener('click', () => {
  let checkbox = document.querySelector('input[type= "checkbox":checked');
  
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
// filter books list
function getCategoryBooks(categoryCode) {
  return queryFetch(` 
    query getBooks($tags :[String]) {
      categories (where: {tags: $tags}) {
        books{title}
        books{description}
        books{author}
        books{aboutauthor}
    		books{imageurl}
        books{readURL}
        books{buyURL}
        }
      }
  `, { tags: categoryCode }).then(data => {
    return data.data.categories
  })
}

// used for the search feature and bookpage
function getAllCategoryBooks() {
  return queryFetch(` 
    query getBooks($tags :[String]) {
      categories (where: {tags: $tags}) {
        books{title}
        books{description}
        books{author}
        books{aboutauthor}
    		books{imageurl}
        books{readURL}
        books{buyURL}
        }
      }
  `).then(data => {
    return data.data.categories
  })
}

function getBookData(bookInfo) {
  var newURL = 'bookspage.html?ti=' + bookInfo.title + '&de=' + bookInfo.description + '&au=' + bookInfo.author +
               '&ab=' + bookInfo.aboutauthor + '&im=' + bookInfo.imageurl + '&ru=' + bookInfo.readURL + "&bu=" + bookInfo.buyURL;
               buyURL = bookInfo.buyURL
               readURL = bookInfo.readURL
  window.open(newURL);
}

async function recommendBook(){
const bookList = document.getElementById('books-list')
bookList.innerHTML = '';

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

  categories.forEach(e => console.log(e));
  console.log(getCategoryBooks(categories)); 
  var books = await getCategoryBooks(categories);
  console.log(Promise.resolve(books));
  displayBookData(books);
}

function displayBookData(books) {
  const bookList = document.getElementById('books-list');
  bookLists = books;
  var titles = [];
  for (let tagIndex = 0; tagIndex < bookLists.length; tagIndex++) {
    var tagList = bookLists[tagIndex].books;
    for (let bookIndex = 0; bookIndex < tagList.length; bookIndex++) {
      if (titles.indexOf(tagList[bookIndex].title) == -1) {
        titles.push(tagList[bookIndex].title);
      const element = document.createElement('a');
      const link = document.createElement("img");
      element.setAttribute("href", tagList[bookIndex].imageurl);
      link.setAttribute("src", tagList[bookIndex].imageurl);
      link.setAttribute("height", "250px");
      element.appendChild(link);
      const title = document.createElement('div');
      title.onclick = function () {
        getBookData(tagList[bookIndex]);
      }
      title.innerText = tagList[bookIndex].title;
      bookList.append(element);
      bookList.append(title);
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

// code for searching for books and displaying book info onto seperate page
function searchBook() {
  var searchValue = document.getElementById("searchBook").value.toLowerCase();
  var is_item = false;

  const bookList = document.getElementById('book-title-dropdown');
  bookList.style.display = "block";
  bookList.innerHTML = '';


  for (let tagIndex = 0; tagIndex < bookAllLists.length; tagIndex++) {
    var tagList = bookAllLists[tagIndex].books;
    for (let bookIndex = 0; bookIndex < tagList.length; bookIndex++) {
      if (tagList[bookIndex].title.toLowerCase().indexOf(searchValue) >= 0) {
        console.log(tagList[bookIndex]);
        is_item = true;
        const element = document.createElement('a');
        element.className = 'book-title-item';
        var newURL = 'bookspage.html?ti=' + tagList[bookIndex].title + '&de=' + tagList[bookIndex].description + '&au=' + tagList[bookIndex].author + '&ab=' + tagList[bookIndex].aboutauthor + '&im=' + tagList[bookIndex].imageurl + '&ru=' + tagList[bookIndex].readURL + "&bu=" + tagList[bookIndex].buyURL;
        element.setAttribute("href", newURL);
        element.innerText = tagList[bookIndex].title.slice(0, 15);
        element.setAttribute('target', '_blank');
        bookList.append(element);
      }
    }
  }

  if (is_item) {
    bookList.style.display = "block";
  } 

  if (searchValue == '' || !is_item) {
    bookList.style.display = "none";
    console.log(searchValue == '');
  }
}

async function onLoadFunc() {
  bookAllLists = await getAllCategoryBooks();
}

function amazon() {
  window.open(buyURL,'_blank');

}

function vedaBase() {
  window.open(readURL,'_blank');

}

