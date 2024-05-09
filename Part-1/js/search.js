document.addEventListener("DOMContentLoaded", () => {
    /* put data from items.json into localStorage whenever page is loaded*/
    async function fetchItems() {
        if (!localStorage.getItem("items")) {
            const response = await fetch("data/items.json");
            const itemsData = await response.json();
            localStorage.setItem("items", JSON.stringify(itemsData));

            console.log(localStorage.getItem("items"));
        }
    }

    fetchItems();

    /* show and hide the search bar */
    const searchContainer = document.querySelector(".search_container");
    searchCloseButton = document.getElementById("search_close_button");
    searchNavButton = document.querySelector("nav .search_button");

    searchNavButton.addEventListener("click", () => {
        searchContainer.classList.remove("search_hidden");
        searchNavButton.style.fill = "white";
        setTimeout(() => {
            searchContainer.style.height = "100%";
        }, 10);
    });

    searchCloseButton.addEventListener("click", () => {
        searchContainer.style.height = "0";
        searchNavButton.style.fill = "black";
        setTimeout(() => {
            searchContainer.classList.add("search_hidden");
        }, 500);
    });

    function displayItemsSearchPage(items, searchQuery) {
        // Store filtered items and search query in localStorage (will be used by searchItems.html page)
        localStorage.setItem("filteredItems", JSON.stringify(items));
        localStorage.setItem("searchQuery", searchQuery);

        // Redirect to searchItems.html
        window.location.href = "searchItems.html";
    }

    const searchForm = document.querySelector(".search_form");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const searchQuery = document.querySelector(".search__input").value.trim().toLowerCase();

        localStorage.setItem("searchQuery", searchQuery);

        const items = JSON.parse(localStorage.getItem("items"));

        // Filter items based on search query
        const filteredItems = items.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchQuery) ||
                item.type.toLowerCase().includes(searchQuery) ||
                item.material.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery)
            ); // need return for the includes function
        });

        console.log("Filtered Items:", filteredItems); // Log the filtered items

        // Render filtered items
        displayItemsSearchPage(filteredItems, searchQuery);
    });
});
