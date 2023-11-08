const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = function () {
        const readStatus = !read ? 'not read yet' : 'finished reading';
        return `${title} by ${author}, ${pages} pages, <span class="read-status">${readStatus}</span>`;
    }  
}

Book.prototype.toggleReadStatus = function (){
    this.read = !this.read;
}

function addBookToLibrary(){
    const title = document.querySelector('#title')
    const author = document.querySelector('#author')
    const pages = document.querySelector('#pages')
    const read = document.querySelector('#read')
    const book = new Book(title.value, author.value, pages.value, read.checked)
    myLibrary.push(book)
    
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
    displayBooks();    
}

function displayBooks(){
    const books = document.querySelector('.bookList')
    books.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');

        bookCard.setAttribute('data-index', index);

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('bookInfo');

        const h4 = document.createElement('h4');
        h4.textContent = book.title;

        const author = document.createElement('p');
        author.innerHTML = `by <span>${book.author}</span>`;

        const pages = document.createElement('p');
        pages.innerHTML = `<span>${book.pages}</span> pages`;

        const read = document.createElement('p');
        read.innerHTML = `Have you read it? <span class='read-status'></span>`
        const readImgElement = read.querySelector('.read-status');
        const readImg = document.createElement('img');
        readImg.classList.add('icons')
        readImg.src = `${book.read ?'img/check-decagram.svg' : '/img/alpha-x-box.svg'}`;
        readImg.alt = 'Read Status Icon';
        readImgElement.appendChild(readImg);


        const removeBtn = document.createElement('button');
        removeBtn.classList.add('bookCardBtn')

        const removeImg = document.createElement('img');
        removeImg.classList.add('icons')
        removeImg.src = 'img/book-remove.svg';
        removeImg.alt = 'Remove Book Icon';
        removeBtn.appendChild(removeImg);

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.classList.add('bookCardBtn')
        const togglerReadImg = document.createElement('img');
        togglerReadImg.classList.add('icons')
        togglerReadImg.src = `${book.read ? 'img/eye-remove.svg' : 'img/eye-plus.svg'}`;
        togglerReadImg.alt = 'Read or Unread Icon';
        toggleReadBtn.appendChild(togglerReadImg);

        toggleReadBtn.addEventListener('click', () => {
            const bookIndex = bookCard.getAttribute('data-index');
            myLibrary[bookIndex].toggleReadStatus();

            const readStatusElement = bookCard.querySelector('.read-status'); // Get the read status span element
            
            toggleReadBtn.removeChild(toggleReadBtn.querySelector('img'));
            const img = document.createElement('img');
            img.classList.add('icons')
            img.src = myLibrary[bookIndex].read ? 'img/eye-remove.svg' : 'img/eye-plus.svg';
            img.alt = 'Read or Unread Icon';
            toggleReadBtn.appendChild(img)

            readStatusElement.removeChild(readStatusElement.querySelector('img'));
            const statusImg = document.createElement('img');
            statusImg.classList.add('icons')
            statusImg.src = myLibrary[bookIndex].read ?'img/check-decagram.svg' : 'img/alpha-x-box.svg';
            statusImg.alt = 'Read Status Icon';
            readStatusElement.appendChild(statusImg);
        });

        removeBtn.addEventListener('click', () => {
            const bookIndex = bookCard.getAttribute('data-index');
            myLibrary.splice(bookIndex, 1);
            displayBooks();
        })

        btnDiv = document.createElement('div');
        btnDiv.classList.add('cardBtns');
        btnDiv.appendChild(removeBtn);
        btnDiv.appendChild(toggleReadBtn);

        bookInfo.appendChild(h4);
        bookInfo.appendChild(author);
        bookInfo.appendChild(pages);
        bookInfo.appendChild(read);
        bookCard.appendChild(bookInfo);
        bookCard.appendChild(btnDiv);
        books.appendChild(bookCard);
    })

}

document.addEventListener('DOMContentLoaded', function() {
    const newBookDialog = document.querySelector('#newBookDialog');
    const showButton = document.querySelector('#showAddBookDialog');
    showButton.addEventListener('click', () => {
        newBookDialog.showModal();
    });
    const btnAddBook = newBookDialog.querySelector('#btnAddBook')

    btnAddBook.addEventListener("click", (e) => {
        e.preventDefault(); 
        const newBookForm = document.querySelector('#addBook')

        if (newBookForm.checkValidity()) {
            // Valid form
            addBookToLibrary();
            newBookDialog.close();     
        } else {
            alert('A new Book can\'t be created. \n\nPlease fill out the required field.');
        }  
    });

    displayBooks();
  });
  