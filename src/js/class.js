const displayBooksHtml = document.querySelector('.books');
const addButton = document.querySelector('.add-btn');
const removeButton = document.querySelector('.remove-button');
const form = document.getElementById('form');
let id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
let bookHtml = '';
let storedBooks =
	JSON.parse(window.localStorage.getItem('addBookToStorage')) || [];
let allBooksList = [];

class Book {
	constructor(id, title, author) {
		this.id = id;
		this.title = title;
		this.author = author;
	}
}

class UI {
	//display books on UI
	static displayBooks() {
		showListNav();
		if (storedBooks !== null && storedBooks.length > 0) {
			storedBooks.forEach((book) => {
				UI.printBook(book);
			});
		} else {
			bookHtml = ` <div class="book">
	      <h2 class="book-title"> No books in the store at the moment! </h2>
	      <hr>
	    </div>`;
			displayBooksHtml.innerHTML = bookHtml;
		}
	}

	static printBook(book) {
		bookHtml = `
      <div class="book">
		    <div class="book-title">"${book.title}"<span class="book-author"> <small> By:  ${book.author} </small></span>
      </div>
      <div>
          <button class="remove-book button"  onclick="UI.removeBook(${book.id} );"> Remove </button>
      </div>
      </div>
      <hr>
      `;
		displayBooksHtml.innerHTML += bookHtml;
	}

	//add book to UI
	static addBook() {
		let title = form.elements['title'].value;
		let author = form.elements['author'].value;
		let book = new Book(id, title, author);

		allBooksList = storedBooks || [];

		allBooksList.push(book);

		localStorage.setItem('addBookToStorage', JSON.stringify(allBooksList));
		UI.printBook(book);
		form.reset();
		window.location.reload();
	}

	//remove book from UI
	static removeBook(bookId) {
		const result = storedBooks.filter(
			(storedBooks) => storedBooks.id !== bookId
		);
		localStorage.setItem('addBookToStorage', JSON.stringify(result));
		window.location.reload();
	}
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);
addButton.addEventListener('click', UI.addBook);

let navGetList = document
	.querySelector('.list-nav')
	.addEventListener('click', showListNav);

let getFormSection = document
	.querySelector('.add-book-nav')
	.addEventListener('click', showAddForm);

let getContactSection = document
	.querySelector('.contact-nav')
	.addEventListener('click', showContactSection);

function showListNav() {
	//console.log('hey');
	document.querySelector('.list-nav').style.color = 'blue';
	document.querySelector('.add-book-nav').style.color = 'black';
	document.querySelector('.contact-nav').style.color = 'black';

	document.getElementById('books').style.display = 'block';
	document.getElementById('add-books-form-section').style.display = 'none';
	document.getElementById('contact').style.display = 'none';
}

function showAddForm() {
	document.querySelector('.list-nav').style.color = 'black';
	document.querySelector('.add-book-nav').style.color = 'blue';
	document.querySelector('.contact-nav').style.color = 'black';

	document.getElementById('add-books-form-section').style.display = 'block';
	document.getElementById('contact').style.display = 'none';
	document.getElementById('books').style.display = 'none';
}

function showContactSection() {
	document.querySelector('.list-nav').style.color = 'black';
	document.querySelector('.add-book-nav').style.color = 'black';
	document.querySelector('.contact-nav').style.color = 'blue';

	document.getElementById('add-books-form-section').style.display = 'none';
	document.getElementById('contact').style.display = 'block';
	document.getElementById('books').style.display = 'none';
}
