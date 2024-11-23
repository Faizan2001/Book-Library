document.addEventListener("DOMContentLoaded", function () {
  const addCardButton = document.getElementById("addCardButton");
  const modal = document.getElementById("cardModal");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("cardForm");
  const gridContainer = document.querySelector(".grid-container");

  const myLibrary = [];

  function Book(author, title, pages, status, index) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
    this.index = index;
  }

  // Add method to toggle read/unread status
  Book.prototype.toggleStatus = function () {
    this.status = this.status === "Read" ? "Unread" : "Read";
  };

  function addBookToLibrary() {
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("status").value;

    var bookIndex = myLibrary.length;
    bookIndex += 1;
    const bookCreated = new Book(author, title, pages, status, bookIndex);

    myLibrary.push(bookCreated);

    const book = document.createElement("div");
    book.classList.add("book");

    book.innerHTML = `
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Pages:</strong> ${pages}</p>
            <p><strong>Status:</strong> <span class="status">${status}</span></p>
            <p><strong>Index:</strong> ${bookCreated.index}</p>
            <button class='delete-book'>Delete</button>
            <button class='toggle-status'>Toggle Status</button>
        `;

    // Add the event listener to the delete button relative to the book element
    const deleteButton = book.querySelector(".delete-book");
    deleteButton.addEventListener("click", function () {
      gridContainer.removeChild(book);
      myLibrary.splice(bookCreated.index - 1, 1);
      updateIndices();
    });

    // Add the event listener to the toggle status button
    const toggleStatusButton = book.querySelector(".toggle-status");
    toggleStatusButton.addEventListener("click", function () {
      bookCreated.toggleStatus();
      book.querySelector(".status").textContent = bookCreated.status;
    });
    gridContainer.appendChild(book);
  }

  function updateIndices() {
    myLibrary.forEach((book, index) => {
      book.index = index;
    });
  
    const books = document.querySelectorAll(".book");
    books.forEach((book, index) => {
      // Update only the index paragraph
      const indexParagraph = book.querySelector("p:last-child"); // We know that the index is the last <p> element
      if (indexParagraph) {
        indexParagraph.innerHTML = `<strong>Index:</strong> ${index}`;
      }
    });
  }

  function validateForm() {
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pages = document.getElementById("pages").value;

    let isValid = true;

    // Validate ze author 
    
     
  }
  

  addCardButton.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  form.onsubmit = function (event) {
    event.preventDefault();
    addBookToLibrary();
    console.log(myLibrary);

    modal.style.display = "none";
    form.reset();
  };
});
