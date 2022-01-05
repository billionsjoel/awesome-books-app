const displayBooksHtml = document.querySelector('.books');
const addButton = document.querySelector('.add-btn');
const removeButton = document.querySelector('.remove-button');
const form = document.getElementById('form');
const title = form.elements['title'];
const author = form.elements['author'];
let bookHtml = '';
let storedBooks =
	JSON.parse(window.localStorage.getItem('addBookToStorage')) || [];
let allBooksList = [];

//const [bookTitle, bookAuthor] = storedBooks ? JSON.parse(storedBooks) : {};

displayBooks();

function displayBooks() {
	//addBook();
	if (storedBooks !== null || storedBooks !== []) {
		storedBooks.forEach((book, i) => {
			bookHtml = ` <div class="book">
	      <div class="book-title"> ${storedBooks[i].title} </div>
	      <div class="book-author"> <strong> Author : </strong> ${storedBooks[i].author} </div>
	      <button class="remove-book"  onclick="removeBook(${storedBooks[i].id} );"> Delete </button>
	      <hr>
	    </div>`;
			displayBooksHtml.innerHTML += bookHtml;
		});
	} else {
		bookHtml = ` <div class="book">
	      <h2 class="book-title"> No books yet </h2>
	      <hr>
	    </div>`;
		displayBooksHtml.innerHTML = bookHtml;
	}
}

addButton.addEventListener('click', addBook, false);
//removeButton.addEventListener('click', removeBook, false);

function addBook() {
	allBooksList = storedBooks || [];
	allBooksList.push({
		id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
		title: title.value,
		author: author.value,
	});
	localStorage.setItem('addBookToStorage', JSON.stringify(allBooksList));
	bookHtml = ` <div class="book">
	      <div class="book-title"> ${title.value} </div>
	      <div class="book-author"> ${author.value} </div>
	      <button class="remove-book" onclick="removeBook();"> Delete </button>
	      <hr>
	    </div>`;
	displayBooksHtml.innerHTML += bookHtml;
	form.reset();
}

function removeBook(bookId) {
	const result = storedBooks.filter((storedBooks) => storedBooks.id !== bookId);
	localStorage.setItem('addBookToStorage', JSON.stringify(result));
	window.location.reload();
}

let navGetList = document.querySelector('.list-nav');

navGetList.addEventListener('click', showListNav);

function showListNav() {
	console.log('hey');
	document.getElementById('add-book', 'contact').style.display = 'none';
}
