// Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// create a Library class
class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.currentSection = 'list';
  }

  addBook(book) {
    this.books.push(book);
    this.saveToLocalStorage();
    this.displayBooks();
  }

  removeBook(book) {
    const index = this.books.findIndex(
      (b) => b.title === book.title && b.author === book.author,
    );
    if (index !== -1) {
      this.books.splice(index, 1);
      this.saveToLocalStorage();
      this.displayBooks();
    }
  }

  displayBooks() {
    const booksDiv = document.getElementById('books');
    booksDiv.innerHTML = '';
    this.books.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book-item';
      const titleSpan = document.createElement('span');
      const authorSpan = document.createElement('span');

      titleSpan.textContent = `"${book.title}"`;
      authorSpan.textContent = `By: "${book.author}"`;

      // Append the spans to the book div
      bookDiv.appendChild(titleSpan);
      bookDiv.appendChild(authorSpan);

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(book);
      });

      // Append the remove button to the book div
      bookDiv.appendChild(removeButton);

      // Append the book div to the books container
      booksDiv.appendChild(bookDiv);
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  // Add a book event
  setupForm() {
    const form = document.getElementById('add-book-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;

      const book = new Book(title, author);
      this.addBook(book);

      // Clear form inputs
      form.reset();
    });
  }

  // Event handler for navigation links clicks
  handleNavigationClick(event) {
    event.preventDefault();
    const section = event.target.getAttribute('href').substring(1);

    // Update the current section
    this.currentSection = section;
    this.updateNavigation();
    this.updateContent();
  }

  updateNavigation() {
    // Get all navigation links
    const navigationLinks = document.querySelectorAll('nav ul li a');
    navigationLinks.forEach((link) => {
      const section = link.getAttribute('href').substring(1);
      if (section === this.currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  updateContent() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      if (section.id === this.currentSection) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
}

const library = new Library();
library.displayBooks();
library.setupForm();

// Get all navigation links and attach event listeners
const navigationLinks = document.querySelectorAll('nav ul li a');
navigationLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    library.handleNavigationClick(event);
  });
});

// Set the initial navigation and content display
library.updateNavigation();
library.updateContent();
