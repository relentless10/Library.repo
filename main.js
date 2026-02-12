// Select container and form elements
const libraryContainer = document.querySelector("#library");
const addBtn = document.querySelector("#addbtn");
const form = document.querySelector("#form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("input[name='author']");
const pagesInput = document.querySelector("#numberofpages");
const readStatusInput = document.querySelector("#readstatus");

// Library array
const myLibrary = [];

// Book constructor
function Book(title, author, numberOfPages, readstatus) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readstatus = readstatus;
    this.uniqueid = crypto.randomUUID();
}

// Add book to library array
function addBookToLibrary(title, author, numberOfPages, readstatus) {
    const abook = new Book(title, author, numberOfPages, readstatus);
    myLibrary.push(abook);
}

// Display library function
function displayLibrary() {
    libraryContainer.innerHTML = ""; // clear existing content

    myLibrary.forEach(function(book) {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card");
        bookDiv.dataset.id = book.uniqueid;

        // Create a span for the book text
        const textSpan = document.createElement("span");
        textSpan.textContent = `${book.title} by ${book.author}, ${book.numberOfPages} pages, Read: ${book.readstatus}`;
        bookDiv.appendChild(textSpan);

        // Create Remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function() {
            const index = myLibrary.findIndex(b => b.uniqueid === book.uniqueid);
            if (index > -1) {
                myLibrary.splice(index, 1); // remove book from array
                displayLibrary(); // re-render
            }
        });

        // Create Toggle Read button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.addEventListener("click", function() {
            book.readstatus = book.readstatus === "Yes" ? "No" : "Yes";
            displayLibrary(); // re-render
        });

        // Append buttons to book div
        bookDiv.appendChild(removeBtn);
        bookDiv.appendChild(toggleBtn);

        // Append book div to container
        libraryContainer.appendChild(bookDiv);
    });
}

// Show/hide form when Add Book button is clicked
addBtn.addEventListener("click", function() {
    form.style.display = form.style.display === "none" ? "block" : "none";
});

// Form submit to add new book
form.addEventListener("submit", function(event) {
    event.preventDefault(); // stop page refresh

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const readstatus = readStatusInput.value;

    addBookToLibrary(title, author, pages, readstatus);

    displayLibrary(); // update display
    form.reset(); // clear form
    form.style.display = "none"; // hide form again
});

// Add some initial books
addBookToLibrary("Hobbit", "J.R.R Tolkien", 295, "No");
addBookToLibrary("1984", "George Orwell", 328, "Yes");

// Display the library initially
displayLibrary();
