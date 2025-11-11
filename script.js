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

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Example books
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
// addBookToLibrary("1984", "George Orwell", 328, false);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

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
        bookDiv.setAttribute('data-id', book.id);

        // Fill card info
        bookDiv.innerHTML = `
            <div class="content">
                <h3>"${book.title}"</h3>
                <p>${book.author}</p>
                <p>${book.pages}</p>
                <button class="toggle-read">
                    ${book.read ? 'Read' : 'Not Read'}
                </button>
            </div>
        `;

        // Add Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            removeBook(book.id);
        });

        // Toggle read status
        const toggleRead = bookDiv.querySelector('.toggle-read');

        if(book.read){
            toggleRead.classList.add('read');
        }else{
            toggleRead.classList.add('not-read');
        }

        toggleRead.addEventListener('click', () => {
            book.toggleRead();
            displayLibrary();
        });

        bookDiv.appendChild(toggleRead);
        bookDiv.appendChild(removeBtn);
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

// Handle form submission and adds book to library
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get inputs
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    displayLibrary();

    bookDialog.close();
    bookForm.reset();
});

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayLibrary();
    }
}