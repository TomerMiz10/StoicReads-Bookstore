const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

const onLoaded = () => {
    // const bookTitle = document.getElementById('bookTitle');
    // const bookAuthor = document.getElementById('bookAuthor');
    // const bookGenre = document.getElementById('bookGenre');
    // const bookPrice = document.getElementById('bookPrice');
    // const bookDescription = document.getElementById('bookDescription');
    // const bookImage = document.getElementById('bookImage');
    // fetch(`http://localhost:3000/books/${bookId}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         bookTitle.innerHTML = data.title;
    //         bookAuthor.innerHTML = data.author;
    //         bookGenre.innerHTML = data.genre;
    //         bookPrice.innerHTML = data.price;
    //         bookDescription.innerHTML = data.description;
    //         bookImage.src = data.image;
    //     });
    console.log(bookId);
}
window.addEventListener('load', onLoaded);
