// ==================================================
// ATLAS WEBSITE
// MAIN JAVASCRIPT
// ==================================================

console.log("ATLAS website is running");


// ==================================================
// NAVBAR SCROLL
// ==================================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            navbar.style.boxShadow =
                "0 4px 20px rgba(0,0,0,0.08)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });

}


// ==================================================
// PRODUCT HOVER
// ==================================================

const products =
    document.querySelectorAll(".product-card");

products.forEach(product => {

    product.addEventListener("mouseenter", () => {

        product.style.transform =
            "translateY(-5px)";

        product.style.transition =
            "0.3s";

    });


    product.addEventListener("mouseleave", () => {

        product.style.transform =
            "translateY(0)";

    });

});


// ==================================================
// GENERAL BUTTONS
// ==================================================

const buttons =
    document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        console.log("ATLAS button clicked");

    });

});


// ==================================================
// NAVIGATION LINKS
// ==================================================

const navLinks =
    document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        console.log(
            "Navigation:",
            link.textContent.trim()
        );

    });

});


// ==================================================
// WELCOME
// ==================================================

window.addEventListener("load", () => {

    console.log(
        "Welcome to ATLAS — Move. Create. Explore."
    );

});


// ==================================================
// CART
// ==================================================

let cart = [];


// ==================================================
// LOAD CART SAFELY
// ==================================================

try {

    const savedCart =
        localStorage.getItem("atlasCart");

    if (savedCart) {

        const parsedCart =
            JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {

            cart = parsedCart;

        }

    }

} catch (error) {

    console.warn(
        "Impossible de charger le panier.",
        error
    );

    cart = [];

}


// ==================================================
// SAVE CART
// ==================================================

function saveCart() {

    try {

        localStorage.setItem(
            "atlasCart",
            JSON.stringify(cart)
        );

    } catch (error) {

        console.warn(
            "Impossible de sauvegarder le panier.",
            error
        );

    }

}


// ==================================================
// CART COUNT
// ==================================================

function updateCartCount() {

    const cartButton =
        document.getElementById("cartButton");

    if (!cartButton) {
        return;
    }


    const totalQuantity =
        cart.reduce(
            (total, item) => {

                return total +
                    (Number(item.quantity) || 0);

            },
            0
        );


    cartButton.textContent =
        totalQuantity > 0
            ? `🛒 ${totalQuantity}`
            : "🛒";

}


updateCartCount();


// ==================================================
// CART BUTTON
// ==================================================

const cartButton =
    document.getElementById("cartButton");

if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "cart.html";

        }
    );

}


// ==================================================
// SHOP
// ==================================================

const shopProductsContainer =
    document.getElementById("shopProducts");


const shopProducts =
    document.querySelectorAll(".shop-product");


const filters =
    document.querySelectorAll(".filter");


// ==================================================
// SHOP STATE
// ==================================================

let currentCategory = "all";

let currentSearch = "";


// ==================================================
// SEARCH ELEMENTS
// ==================================================

const searchButton =
    document.getElementById("searchButton");


const searchOverlay =
    document.getElementById("searchOverlay");


const closeSearch =
    document.getElementById("closeSearch");


const searchInput =
    document.getElementById("searchInput");


const clearSearch =
    document.getElementById("clearSearch");


const noSearchResults =
    document.getElementById("noSearchResults");


// ==================================================
// OPEN SEARCH
// ==================================================

function openSearch() {

    if (!searchOverlay) {
        return;
    }


    searchOverlay.classList.add("active");

    searchOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "search-open"
    );


    if (searchInput) {

        setTimeout(() => {

            searchInput.focus();

        }, 100);

    }

}


// ==================================================
// CLOSE SEARCH
// ==================================================

function closeSearchOverlay() {

    if (!searchOverlay) {
        return;
    }


    searchOverlay.classList.remove(
        "active"
    );


    searchOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "search-open"
    );

}


// ==================================================
// SEARCH BUTTON
// ==================================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        openSearch
    );

}


// ==================================================
// CLOSE SEARCH BUTTON
// ==================================================

if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        closeSearchOverlay
    );

}


// ==================================================
// CLOSE SEARCH WITH ESCAPE
// ==================================================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchOverlay();

        }

    }
);


// ==================================================
// CLICK OUTSIDE SEARCH
// ==================================================

if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchOverlay
            ) {

                closeSearchOverlay();

            }

        }
    );

}


// ==================================================
// CLEAR SEARCH
// ==================================================

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        () => {

            if (searchInput) {

                searchInput.value = "";

                currentSearch = "";

                applyShopFilters();

                searchInput.focus();

            }

        }
    );

}


// ==================================================
// SEARCH INPUT
// ==================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            currentSearch =
                searchInput.value
                    .trim()
                    .toLowerCase();


            applyShopFilters();

        }
    );

}


// ==================================================
// SHOP FILTER FUNCTION
// ==================================================

function applyShopFilters() {

    if (!shopProducts.length) {
        return;
    }


    let visibleProducts = 0;


    shopProducts.forEach(product => {

        const name =
            product
                .querySelector("h3")
                ?.textContent
                .trim()
                .toLowerCase() || "";


        const description =
            product
                .querySelector("p")
                ?.textContent
                .trim()
                .toLowerCase() || "";


        const category =
            (
                product.dataset.category ||
                ""
            ).toLowerCase();


        const searchMatch =
            currentSearch === "" ||
            name.includes(currentSearch) ||
            description.includes(currentSearch) ||
            category.includes(currentSearch);


        const categoryMatch =
            currentCategory === "all" ||
            category.includes(
                currentCategory.toLowerCase()
            );


        const shouldShow =
            searchMatch &&
            categoryMatch;


        if (shouldShow) {

            product.classList.remove(
                "is-hidden"
            );

            product.style.display = "";

            visibleProducts++;

        } else {

            product.classList.add(
                "is-hidden"
            );

            product.style.display = "none";

        }

    });


    if (noSearchResults) {

        noSearchResults.hidden =
            visibleProducts !== 0;

    }

}


// ==================================================
// CATEGORY FILTERS
// ==================================================

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            filter.classList.add(
                "active"
            );


            currentCategory =
                filter.dataset.category ||
                "all";


            applyShopFilters();

        }
    );

});


// ==================================================
// SAVE ORIGINAL PRODUCT ORDER
// ==================================================

shopProducts.forEach(
    (product, index) => {

        product.dataset.originalOrder =
            index;

    }
);


// ==================================================
// SORT PRODUCTS
// ==================================================

const sortProducts =
    document.getElementById(
        "sortProducts"
    );


if (
    sortProducts &&
    shopProductsContainer
) {

    sortProducts.addEventListener(
        "change",
        () => {

            const value =
                sortProducts.value;


            const productsArray =
                Array.from(shopProducts);


            if (value === "price-low") {

                productsArray.sort(
                    (a, b) => {

                        return (
                            Number(
                                a.dataset.price
                            ) || 0
                        ) - (
                            Number(
                                b.dataset.price
                            ) || 0
                        );

                    }
                );

            }


            else if (value === "price-high") {

                productsArray.sort(
                    (a, b) => {

                        return (
                            Number(
                                b.dataset.price
                            ) || 0
                        ) - (
                            Number(
                                a.dataset.price
                            ) || 0
                        );

                    }
                );

            }


            else if (value === "new") {

                productsArray.sort(
                    (a, b) => {

                        return (
                            Number(
                                b.dataset.new
                            ) || 0
                        ) - (
                            Number(
                                a.dataset.new
                            ) || 0
                        );

                    }
                );

            }


            else {

                productsArray.sort(
                    (a, b) => {

                        return (
                            Number(
                                a.dataset.originalOrder
                            ) || 0
                        ) - (
                            Number(
                                b.dataset.originalOrder
                            ) || 0
                        );

                    }
                );

            }


            productsArray.forEach(product => {

                shopProductsContainer.appendChild(
                    product
                );

            });


            applyShopFilters();

        }
    );

}


// ==================================================
// PRODUCT LINKS
// ==================================================

const productLinks =
    document.querySelectorAll(
        "[data-product-link]"
    );


productLinks.forEach(element => {

    const productUrl =
        element.dataset.productLink;


    if (!productUrl) {
        return;
    }


    element.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            window.location.href =
                productUrl;

        }
    );


    element.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                window.location.href =
                    productUrl;

            }

        }
    );

});


// ==================================================
// CART TOAST
// ==================================================

function showCartToast(message) {

    let toast =
        document.getElementById(
            "atlasCartToast"
        );


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "atlasCartToast";

        toast.className =
            "atlas-cart-toast";

        document.body.appendChild(toast);

    }


    toast.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(
        window.atlasToastTimer
    );


    window.atlasToastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2200);

}


// ==================================================
// ADD TO CART
// ==================================================

const cartButtons =
    document.querySelectorAll(
        ".add-cart"
    );


cartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const product =
                button.closest(
                    ".shop-product"
                );


            if (!product) {
                return;
            }


            const name =
                product
                    .querySelector("h3")
                    ?.textContent
                    .trim() ||
                button.dataset.name ||
                "Produit";


            const description =
                product
                    .querySelector("p")
                    ?.textContent
                    .trim() ||
                button.dataset.description ||
                "";


            const price =
                Number(
                    button.dataset.price
                ) || 0;


            const existingProduct =
                cart.find(
                    item =>
                        item.name === name
                );


            if (existingProduct) {

                existingProduct.quantity =
                    (
                        Number(
                            existingProduct.quantity
                        ) || 0
                    ) + 1;

            } else {

                cart.push({

                    id:
                        Date.now(),

                    name:
                        name,

                    description:
                        description,

                    price:
                        price,

                    quantity:
                        1

                });

            }


            saveCart();


            button.textContent =
                "Ajouté ✓";


            button.classList.add(
                "added"
            );


            showCartToast(
                `${name} a été ajouté au panier`
            );


            setTimeout(() => {

                button.textContent =
                    "Ajouter au panier";

                button.classList.remove(
                    "added"
                );

            }, 1500);


            updateCartCount();

        }
    );

});


// ==================================================
// CART PAGE
// ==================================================

const cartProductsContainer =
    document.getElementById(
        "cartProducts"
    );


// ==================================================
// ESCAPE HTML
// ==================================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ==================================================
// DISPLAY CART
// ==================================================

function displayCart() {

    if (!cartProductsContainer) {
        return;
    }


    if (cart.length === 0) {

        cartProductsContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    Ton panier est vide.
                </h2>

                <p>
                    Découvre nos produits et ajoute
                    tes favoris au panier.
                </p>

                <a href="shop.html">
                    Découvrir le Shop
                </a>

            </div>

        `;


        updateCartTotal();

        return;

    }


    cartProductsContainer.innerHTML =
        "";


    cart.forEach(
        (item, index) => {

            const price =
                Number(item.price) || 0;


            const quantity =
                Math.max(
                    1,
                    Number(item.quantity) || 1
                );


            const productTotal =
                price * quantity;


            const safeName =
                escapeHTML(
                    item.name || "Produit"
                );


            const safeDescription =
                escapeHTML(
                    item.description || ""
                );


            const safePrice =
                price.toFixed(2);


            cartProductsContainer.innerHTML += `

                <article
                    class="cart-item"
                    data-cart-index="${index}"
                >

                    <div class="cart-item-image">

                        <span>
                            ATLAS
                        </span>

                    </div>


                    <div class="cart-item-info">

                        <h3>
                            ${safeName}
                        </h3>


                        <p>
                            ${safeDescription}
                        </p>


                        <div class="cart-item-bottom">

                            <div class="quantity">

                                <button
                                    type="button"
                                    class="quantity-minus"
                                    data-index="${index}"
                                    aria-label="Diminuer la quantité"
                                >
                                    −
                                </button>


                                <span class="quantity-value">
                                    ${quantity}
                                </span>


                                <button
                                    type="button"
                                    class="quantity-plus"
                                    data-index="${index}"
                                    aria-label="Augmenter la quantité"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                type="button"
                                class="remove-item"
                                data-remove-index="${index}"
                            >
                                Supprimer
                            </button>

                        </div>

                    </div>


                    <div class="cart-item-right">

                        <span class="cart-item-unit-price">
                            ${safePrice} DH
                        </span>

                        <strong class="cart-item-price">
                            ${productTotal.toFixed(2)} DH
                        </strong>

                    </div>

                </article>

            `;

        }
    );


    updateCartTotal();

}


// ==================================================
// CART EVENTS
// ==================================================

if (cartProductsContainer) {

    cartProductsContainer.addEventListener(
        "click",
        event => {

            const minusButton =
                event.target.closest(
                    ".quantity-minus"
                );


            const plusButton =
                event.target.closest(
                    ".quantity-plus"
                );


            const removeButton =
                event.target.closest(
                    ".remove-item"
                );


            // MINUS

            if (minusButton) {

                const index =
                    Number(
                        minusButton.dataset.index
                    );


                changeQuantity(
                    index,
                    -1
                );

                return;

            }


            // PLUS

            if (plusButton) {

                const index =
                    Number(
                        plusButton.dataset.index
                    );


                changeQuantity(
                    index,
                    1
                );

                return;

            }


            // REMOVE

            if (removeButton) {

                const index =
                    Number(
                        removeButton.dataset.removeIndex
                    );


                removeFromCart(index);

            }

        }
    );

}


// ==================================================
// CHANGE QUANTITY
// ==================================================

function changeQuantity(
    index,
    amount
) {

    if (!cart[index]) {
        return;
    }


    const currentQuantity =
        Number(
            cart[index].quantity
        ) || 1;


    cart[index].quantity =
        currentQuantity +
        amount;


    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    saveCart();


    displayCart();

    updateCartCount();

}


// ==================================================
// REMOVE PRODUCT
// ==================================================

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    const removedProduct =
        cart[index].name ||
        "Produit";


    cart.splice(index, 1);


    saveCart();


    displayCart();

    updateCartCount();


    showCartToast(
        `${removedProduct} a été supprimé du panier`
    );

}


// ==================================================
// CART TOTAL
// ==================================================

function updateCartTotal() {

    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const shippingElement =
        document.getElementById(
            "shipping"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    if (
        !subtotalElement ||
        !shippingElement ||
        !totalElement
    ) {

        return;

    }


    let subtotal = 0;


    cart.forEach(item => {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 0;


        subtotal +=
            price * quantity;

    });


    let shipping = 0;


    if (
        subtotal > 0 &&
        subtotal < 500
    ) {

        shipping = 30;

    }


    const total =
        subtotal + shipping;


    subtotalElement.textContent =
        subtotal.toFixed(2) +
        " DH";


    shippingElement.textContent =
        shipping === 0 &&
        subtotal > 0
            ? "Gratuite"
            : shipping.toFixed(2) +
              " DH";


    totalElement.textContent =
        total.toFixed(2) +
        " DH";

}


// ==================================================
// CHECKOUT BUTTON
// ==================================================

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showCartToast(
                    "Votre panier est vide."
                );

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


// ==================================================
// DISPLAY CART
// ==================================================

displayCart();


// ==================================================
// CHECKOUT
// ==================================================

function displayCheckout() {

    const checkoutProducts =
        document.getElementById(
            "checkoutProducts"
        );


    if (!checkoutProducts) {
        return;
    }


    const checkoutSubtotal =
        document.getElementById(
            "checkoutSubtotal"
        );


    const checkoutShipping =
        document.getElementById(
            "checkoutShipping"
        );


    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    checkoutProducts.innerHTML =
        "";


    if (cart.length === 0) {

        checkoutProducts.innerHTML = `

            <p style="
                margin: 0;
                color: rgba(255,255,255,.55);
                font-size: 12px;
            ">
                Votre panier est vide.
            </p>

        `;

        return;

    }


    let subtotal = 0;


    cart.forEach(product => {

        const price =
            Number(product.price) || 0;


        const quantity =
            Number(product.quantity) || 0;


        const productTotal =
            price * quantity;


        subtotal +=
            productTotal;


        checkoutProducts.innerHTML += `

            <div class="checkout-product">

                <div class="checkout-product-info">

                    <strong>
                        ${escapeHTML(
                            product.name
                        )}
                    </strong>

                    <span>
                        Quantité : ${quantity}
                    </span>

                </div>


                <strong class="checkout-product-price">

                    ${productTotal.toFixed(2)} DH

                </strong>

            </div>

        `;

    });


    let shipping = 0;


    if (
        subtotal > 0 &&
        subtotal < 500
    ) {

        shipping = 30;

    }


    const total =
        subtotal + shipping;


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            subtotal.toFixed(2) +
            " DH";

    }


    if (checkoutShipping) {

        checkoutShipping.textContent =
            shipping === 0
                ? "Gratuite"
                : shipping.toFixed(2) +
                  " DH";

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
            total.toFixed(2) +
            " DH";

    }

}


// ==================================================
// CONFIRM ORDER
// ==================================================

const confirmOrder =
    document.getElementById(
        "confirmOrder"
    );


if (confirmOrder) {

    confirmOrder.addEventListener(
        "click",
        () => {

            const firstName =
                document.getElementById(
                    "firstName"
                )?.value.trim() || "";


            const lastName =
                document.getElementById(
                    "lastName"
                )?.value.trim() || "";


            const email =
                document.getElementById(
                    "email"
                )?.value.trim() || "";


            const phone =
                document.getElementById(
                    "phone"
                )?.value.trim() || "";


            const address =
                document.getElementById(
                    "address"
                )?.value.trim() || "";


            const city =
                document.getElementById(
                    "city"
                )?.value.trim() || "";


            if (
                firstName === "" ||
                lastName === "" ||
                email === "" ||
                phone === "" ||
                address === "" ||
                city === ""
            ) {

                alert(
                    "Veuillez remplir tous les champs."
                );

                return;

            }


            if (cart.length === 0) {

                alert(
                    "Votre panier est vide."
                );

                return;

            }


            alert(
                "Merci " +
                firstName +
                " ! Votre commande a été confirmée."
            );


            try {

                localStorage.removeItem(
                    "atlasCart"
                );

            } catch (error) {

                console.warn(error);

            }


            cart = [];


            updateCartCount();


            window.location.href =
                "index.html";

        }
    );

}


// ==================================================
// DISPLAY CHECKOUT
// ==================================================

displayCheckout();


// ==================================================
// PRODUCT DETAILS
// ==================================================

const productData = {

    "atlas-runner": {

        name:
            "Atlas Runner",

        price:
            899,

        description:
            "Une chaussure pensée pour accompagner vos entraînements et vos sessions de running avec confort et légèreté."

    },


    "motion-hoodie": {

        name:
            "Motion Hoodie",

        price:
            549,

        description:
            "Un hoodie moderne et confortable pensé pour le sport et le quotidien."

    },


    "performance-tee": {

        name:
            "Performance Tee",

        price:
            299,

        description:
            "Un t-shirt léger et respirant conçu pour accompagner vos entraînements."

    },


    "training-pro": {

        name:
            "Training Pro",

        price:
            749,

        description:
            "Une pièce conçue pour les séances de training intensives et les mouvements dynamiques."

    },


    "atlas-essential": {

        name:
            "Atlas Essential",

        price:
            399,

        description:
            "Une pièce lifestyle simple, confortable et polyvalente pour votre quotidien."

    },


    "move-shorts": {

        name:
            "Move Shorts",

        price:
            349,

        description:
            "Un short confortable et léger conçu pour vos séances de training et vos mouvements."

    }

};


// ==================================================
// PRODUCT DETAIL LOAD
// ==================================================

const productNameElement =
    document.getElementById(
        "productName"
    );


if (productNameElement) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");


    const product =
        productData[productId];


    if (product) {

        const productPrice =
            document.getElementById(
                "productPrice"
            );


        const productDescription =
            document.getElementById(
                "productDescription"
            );


        const quantityElement =
            document.getElementById(
                "productQuantity"
            );


        const plusBtn =
            document.getElementById(
                "plusBtn"
            );


        const minusBtn =
            document.getElementById(
                "minusBtn"
            );


        const addProductToCart =
            document.getElementById(
                "addProductToCart"
            );


        const favoriteProduct =
            document.getElementById(
                "favoriteProduct"
            );


        const breadcrumbProduct =
            document.getElementById(
                "breadcrumbProduct"
            );


        const productVisualText =
            document.getElementById(
                "productVisualText"
            );


        productNameElement.textContent =
            product.name;


        if (productPrice) {

            productPrice.textContent =
                product.price +
                " DH";

        }


        if (productDescription) {

            productDescription.textContent =
                product.description;

        }


        if (breadcrumbProduct) {

            breadcrumbProduct.textContent =
                product.name;

        }


        if (productVisualText) {

            productVisualText.textContent =
                product.name;

        }


        let quantity = 1;


        if (quantityElement) {

            quantityElement.textContent =
                quantity;

        }


        // PLUS

        if (plusBtn) {

            plusBtn.addEventListener(
                "click",
                () => {

                    quantity++;


                    if (quantityElement) {

                        quantityElement.textContent =
                            quantity;

                    }

                }
            );

        }


        // MINUS

        if (minusBtn) {

            minusBtn.addEventListener(
                "click",
                () => {

                    if (quantity > 1) {

                        quantity--;


                        if (quantityElement) {

                            quantityElement.textContent =
                                quantity;

                        }

                    }

                }
            );

        }


        // ADD PRODUCT TO CART

        if (addProductToCart) {

            addProductToCart.addEventListener(
                "click",
                () => {

                    const existingProduct =
                        cart.find(
                            item =>
                                item.name ===
                                product.name
                        );


                    if (existingProduct) {

                        existingProduct.quantity =
                            (
                                Number(
                                    existingProduct.quantity
                                ) || 0
                            ) + quantity;

                    } else {

                        cart.push({

                            id:
                                Date.now(),

                            name:
                                product.name,

                            description:
                                product.description,

                            price:
                                product.price,

                            quantity:
                                quantity

                        });

                    }


                    saveCart();


                    updateCartCount();


                    showCartToast(
                        `${product.name} a été ajouté au panier`
                    );

                }
            );

        }


        // FAVORITE

        if (favoriteProduct) {

            favoriteProduct.addEventListener(
                "click",
                function () {

                    this.classList.toggle(
                        "active"
                    );


                    this.textContent =
                        this.classList.contains(
                            "active"
                        )
                            ? "♥"
                            : "♡";

                }
            );

        }

    } else {

        productNameElement.textContent =
            "Produit introuvable";

    }

}


// ==================================================
// INITIAL SHOP FILTER
// ==================================================

if (shopProducts.length) {

    applyShopFilters();

}