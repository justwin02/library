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

// Function to display the library
const libraryDiv = document.getElementById('library');

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
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            </div>
        `;

        // Add card to main library
        libraryDiv.appendChild(bookDiv);
    });
}

displayLibrary();
