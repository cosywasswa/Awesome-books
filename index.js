import { showDateTime, updatingDateTime } from './modules/date.js';
import Book from './modules/book.js';
import { Library } from './modules/library.js';
import { navigationLinks } from './modules/navigate.js';
import { form } from './modules/form.js';

showDateTime();
updatingDateTime();
const library = new Library();
library.displayBooks();

// Get all navigation links and attach event listeners
navigationLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    library.handleNavigationClick(event);
  });
});

// Set the initial navigation and content display
library.updateNavigation();
library.updateContent();

// add eventListner to form creation
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  const book = new Book(title, author);
  if (title && author) {
    library.addBook(book);

    // Clear form inputs
    form.reset();
  }
});
