let books = [];
const baseUrl = 'http://localhost:3000';
const booksCartContainer = $('#books-cards-container');


const renderNoBooksFound= ()=>{
    booksCartContainer.empty();
    const noBooksFound = $('<div class="card mb-3">');
    const cardBody = $('<div class="card-body">');
    const titleElement = $('<h5 class="card-title">No books found</h5>');
    cardBody.append(titleElement);
    noBooksFound.append(cardBody);
    booksCartContainer.append(noBooksFound);
}

const renderBooks = () => {
    booksCartContainer.empty();
    if(books.length === 0){
        renderNoBooksFound();
        return;
    }
    const booksCardsHtml = books.map((bookItem, index) =>{
        return `
            <div class="card m-3" style="width: 8rem;">
                <a href="order.html?id=${bookItem.bookID}">
                    <div>
                        <img src=${bookItem.imageLinks.small} class="card-img-top" alt="bookCover">
                    </div>
                </a>
                <div class="card-body">
                    <h5 class="card-title">${bookItem.title} by </h5>
                    <p class="card-text">${bookItem.author}</p>
                    <p class="card-text">${bookItem.genre}</p>
                    <p class="card-text">${bookItem.price}</p>
                </div>
                
                <div class="quantity-controls">
                    <button class="decrease-quantity">-</button>
                    <input type="number" class="book-quantity" value="1" min="1">
                    <button class="increase-quantity">+</button>
                </div>
                <button class="remove-book">Remove Item</button>
            </div>;`
    }).join('');
    const classesToMakeCardsAlign = 'd-flex flex-wrap justify-content-center align-items-center';
    booksCartContainer.addClass(classesToMakeCardsAlign);
    booksCartContainer.append(booksCardsHtml);
}

booksCartContainer.addEventListener("click", (e)=>{
   if(e.target.classList.contains("decrease-quantity")){
       const quantityInput = e.target.nextElementSibling;
       const currentValue = parseInt(quantityInput.value);
       if(currentValue > 1){
           quantityInput.value = currentValue - 1;
           updateOrderSummary();
       }

   }else if(e.target.classList.contains("increase-quantity")){
       const quantityInput = e.target.previousElementSibling;
       const currentValue = parseInt(quantityInput.value);
       quantityInput.value = currentValue + 1;
       updateOrderSummary();

   }else if(e.target.classList.contains("remove-book")){
       const bookCard = e.target.closest(".card");
       bookCard.remove();
       updateOrderSummary();
   }
});

const updateOrderSummary = ()=>{
    const bookCards = document.getElementsByClassName("card");

    let totalPrice = 0;
    let totalItems = 0;

    Array.from(bookCards).forEach(card => {
        const quantityInput = card.querySelector(".book-quantity");
        const priceElement = card.querySelector(".card-text:last-child");

        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceElement.textContent);

        totalItems += quantity;
        totalPrice += price * quantity;
    });

    const totalItemsElement = document.getElementById("total-items");
    const totalPriceElement = document.getElementById("total-price");

    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);
};

// Attach event listeners to quantity inputs
const quantityInputs = document.getElementsByClassName("book-quantity");
Array.from(quantityInputs).forEach(quantityInput => {
    quantityInput.addEventListener("change", updateOrderSummary);
});

// $(document).ready(getBooks);