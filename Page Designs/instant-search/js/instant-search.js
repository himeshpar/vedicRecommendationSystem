import InstantSearch from "./InstantSearch.js"

const searchUsers = document.querySelector("#searchUsers");
const instantSearchUsers = new InstantSearch(searchUsers, {
  searchUrl: new URL(
    "http://localhost:1337/books",
    window.location.origin
  ),
  queryParam: "title",
  responseParser: (responseData) => {
    return responseData.results;
  },
  templateFunction: (result) => {
    return `
            <div class="instant-search__title">${book.title}}</div>
            <p class="instant-search__paragraph">${book.author}</p>
        `;
  }
});


console.log(instantSearchUsers);


