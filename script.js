import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";

const booksContainer = document.getElementById("booksContainer");
const newBookModal = document.getElementById("newBookModal");
const newBookForm = document.getElementById("newBookForm");
const newBookBtn = document.getElementById("newBookBtn");
const addBookBtn = document.getElementById("addBookBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Pointers to input fields for adding a new book
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const numPagesInput = document.getElementById("numPages");
const isReadInput = document.getElementById("isRead");

// Define the Book constructor and prototype functions
function Book(title, author, numPages, isRead = false) {
  this.title = title;
  this.author = author;
  this.numPages = parseInt(numPages) || null;
  this.isRead = isRead;

  const id = nanoid();
  this.getId = function () {
    return id;
  };
}

Book.prototype.info = function () {
  console.log(`${this.title}
  by ${this.author}
  ${this.numPages ? `${this.numPages} pages` : null}
  ${this.isRead ? "Read" : "Not read yet"}\n`);
};

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

Book.prototype.generateCardElement = function () {
  let card = document.createElement("li");
  card.setAttribute("class", "card");
  card.setAttribute("data-id", this.getId());
  card.innerHTML = `
    <h2>${this.title}</h2>
    <p>by ${this.author}</p>
    ${this.numPages ? `<p>${this.numPages} pages</p>` : ""}
    <p>${this.isRead ? "✅ Read" : "⏳ Not read yet"}</p>
  `;

  return card;
};

// Define a Library class for managing the library and displaying it on the page
class Library {
  constructor(books) {
    this.books = [...books];
  }

  get numberOfBooks() {
    return this.books.length;
  }

  addBook(book) {
    if (book instanceof Book) {
      this.books.push(book);
    }
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.getId() !== id);
  }

  render(element) {
    if (this.numberOfBooks === 0) {
      element.innerHTML =
        "There are no books in your library. Let's add some today!";
      return;
    }

    const bookCards = this.books.map((book) => {
      const card = book.generateCardElement();

      // Create a button to toggle read status
      const toggleButton = document.createElement("button");
      toggleButton.textContent = "Toggle status";
      toggleButton.onclick = (e) => {
        const id = e.target.parentNode.dataset.id;
        const book = this.books.find((book) => book.getId() === id);
        book.toggleRead();
        this.render(element);
      };

      // Create a button to remove the book from the library
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove from library";
      removeButton.onclick = (e) => {
        const id = e.target.parentNode.dataset.id;
        this.removeBook(id);
        this.render(element);
      };

      // Add buttons to the card
      card.append(toggleButton, removeButton);

      return card;
    });

    // Create a ul wrapper for the card elements
    const cardGrid = document.createElement("ul");
    cardGrid.setAttribute("class", "card-grid");
    cardGrid.append(...bookCards);

    element.innerHTML = "";
    element.append(cardGrid);
  }
}

// Implement a modal dialog to take user input for adding books to the library
newBookBtn.addEventListener("click", () => {
  newBookForm.reset();
  newBookModal.showModal();
});

newBookModal.addEventListener("click", (e) => {
  if (e.target === addBookBtn) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const numPages = parseInt(numPagesInput.value);
    const isRead = isReadInput.checked;
    const book = new Book(title, author, numPages, isRead);
    myLibrary.addBook(book);
    myLibrary.render(booksContainer);
    newBookModal.close();
  }

  if (e.target === closeModalBtn) {
    newBookModal.close();
  }
});

// Create a Library instance with a few starter books
let myLibrary = new Library([
  new Book(
    "The Principles of Object-Oriented JavaScript",
    "Nicholas C. Zakas",
    120
  ),
  new Book("Automate the Boring Stuff with Python", "Al Sweigart", 592),
  new Book(
    "Zen and the Art of Motorcycle Maintenance: An Inquiry Into Values",
    "Robert M. Pirsig",
    464,
    true
  ),
]);

// Display the library on the page
myLibrary.render(booksContainer);
