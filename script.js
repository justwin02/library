// Memory for books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Example books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

// DOM elements
const libraryDiv = document.getElementById('library');
const addBook = document.getElementById('add-book');
const bookDialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');
const cancelButton = document.getElementById('cancel-button');

function displayLibrary() {
    // Erases the example made in index.html but not in memory :(
    libraryDiv.innerHTML = '';

    // Loop through myLibrary array
    myLibrary.forEach(book => {
        // Creates a card for each book
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        // Fill card info
        bookDiv.innerHTML = `
            <div class="content">
                <h3>"${book.title}"</h3>
                <p>${book.author}</p>
                <p>${book.pages}</p>
                <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            </div>
        `;

        // Add card to main library
        libraryDiv.appendChild(bookDiv);
    });
}

// EventListener for opening modal
addBook.addEventListener('click', () => {
    bookDialog.showModal();
});

// EventListener for closing modal outside modal
if (bookDialog) {
    bookDialog.addEventListener('click', (e) => {
        if (e.target === bookDialog) {
            bookDialog.close();
        }
    });
}

displayLibrary();
