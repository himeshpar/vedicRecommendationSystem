/**
 * @typedef {Object} InstantSearchOptions
 * @property {URL} searchUrl The URL which the search bar will query to retrieve books
 * @property {string} queryParam The name of the query parameter to be used in each request
 * @property {Function} responseParser Takes the response from the instant search and returns an array of books
 * @property {Function} templateFunction Takes an instant search result and produces the HTML for it
 */

class InstantSearch {
  /**
   * Initialises the instant search bar. Retrieves and creates elements.
   *
   * @param {HTMLElement} instantSearch The container element for the instant search
   * @param {InstantSearchOptions} options A list of options for configuration
   */
  constructor(instantSearch, options) {
    this.options = options;
    this.elements = {
      main: instantSearch,
      input: instantSearch.querySelector(".instant-search__input"),
      booksContainer: document.createElement("div")
    };

    this.elements.booksContainer.classList.add(
      "instant-search__books-container"
    );
    this.elements.main.appendChild(this.elements.booksContainer);

    this.addListeners();
  }

  /**
   * Adds event listeners for elements of the instant search.
   */
  addListeners() {
    let delay;

    this.elements.input.addEventListener("input", () => {
      clearTimeout(delay);

      const query = this.elements.input.value;

      delay = setTimeout(() => {
        if (query.length < 3) {
          this.populateBooks([]);
          return;
        }

        this.performSearch(query).then((books) => {
          this.populateBooks(books);
        });
      }, 500);
    });

    this.elements.input.addEventListener("focus", () => {
      this.elements.booksContainer.classList.add(
        "instant-search__books-container--visible"
      );
    });

    this.elements.input.addEventListener("blur", () => {
      this.elements.booksContainer.classList.remove(
        "instant-search__books-container--visible"
      );
    });
  }

  /**
   * Updates the HTML to display each result under the search bar.
   *
   * @param {Object[]} books
   */
  populateBooks(books) {
    console.log(books)
    // Clear all existing books
    while (this.elements.booksContainer.firstChild) {
      this.elements.booksContainer.removeChild(
        this.elements.booksContainer.firstChild
      );
    }

    // Update list of books under the search bar
    for (const result of books) {
      this.elements.booksContainer.appendChild(
        this.createResultElement(result)
      );
    }
  }

  /**
   * Creates the HTML to represents a single result in the list of books.
   *
   * @param {Object} result An instant search result
   * @returns {HTMLAnchorElement}
   */
  createResultElement(result) {
    const anchorElement = document.createElement("a");

    anchorElement.classList.add("instant-search__result");
    anchorElement.insertAdjacentHTML(
      "afterbegin",
      this.options.templateFunction(result)
    );

    // If provided, add a link for the result
    if ("href" in result) {
      anchorElement.setAttribute("href", result.href);
    }

    return anchorElement;
  }

  /**
   * Makes a request at the search URL and retrieves books.
   *
   * @param {string} query Search query
   * @returns {Promise<Object[]>}
   */
  performSearch(query) {
    const url = new URL(this.options.searchUrl.toString());

    url.searchParams.set(this.options.queryParam, query);

    this.setLoading(true);

    return fetch(url, {
      method: "get"
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Something went wrong with the search!");
        }

        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);

        return this.options.responseParser(responseData);
      })
      .catch((error) => {
        console.error(error);

        return [];
      })
      .finally((books) => {
        this.setLoading(false);

        return books;
      });
  }

  /**
   * Shows or hides the loading indicator for the search bar.
   *
   * @param {boolean} b True will show the loading indicator, false will not
   */
  setLoading(b) {
    this.elements.main.classList.toggle("instant-search--loading", b);
  }
}

export default InstantSearch;