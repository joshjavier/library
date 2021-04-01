let myLibrary = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  const ta = `${this.title} by ${this.author}`,
    p = `${this.pages} pages`,
    r = (this.read) ? 'read' : 'not read yet';
  return [ta, p, r].join(', ');
};

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
  // 2021-04-01: Should I rework this into 2 separate functions for marking a
  // book as read/unread? Think about how it will interact with the front end.
};

/**
 * Create a Book object from user input and add it to the library array.
 */
function addBookToLibrary() {
  // Prompts
  let title = prompt("What's the title of the book?");
  let author = prompt("Who is the author of the book?");
  let pages = prompt("How many pages does the book have?");
  let read = prompt("Have you finished reading the book? [yes/no]");

  // Parse user input
  title = title.trim();
  author = author.trim();
  pages = parseInt(pages.replace(/\s+/g, ''), 10);
  read = (['yes', 'y'].includes(read.toLowerCase()));

  // Add new book to library
  myLibrary.push(new Book(title, author, pages, read));
}
