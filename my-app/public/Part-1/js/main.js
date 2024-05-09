/*
    open and close nav links div in small screen
*/
const navLinks = document.getElementById("nav_links");
navToggle = document.getElementById("toggle_button");
navClose = document.getElementById("close_button");

// show nav links div
navToggle.addEventListener("click", () => {
	navLinks.classList.add("show_menu");
});

// hide nav links div
navClose.addEventListener("click", () => {
	navLinks.classList.remove("show_menu");
});

// async function loadData() {
//     const response = await fetch("data/products.json");
//     const usersData = await response.json();
//     localStorage.setItem("products", JSON.stringify(usersData));
//     add.addEventListener("click", loadData);
//     async function loadData() {
//         const response = await fetch("data/items.json");
//         const usersData = await response.json();
//         localStorage.setItem("products", JSON.stringify(usersData));

//         console.log(localStorage.getItem("users"));
//     }

//     // loadData();
//     // womenSec;
// }
/*
    show and hide the search bar

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
});*/

async function fetchDataFromAPI() {
	try {
		const response = await fetch("http://localhost:3000/api/products");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return [];
	}
}
// Hoodie section
document.querySelector(".men_hoodie").addEventListener("click", function (event) {
	event.preventDefault();
	var searchQuery = "hoodie";
	localStorage.setItem("searchQuery", searchQuery);

	//  const items = JSON.parse(localStorage.getItem("items"));

	const items = fetchDataFromAPI();

	const filteredItems = items.filter((item) => {
		return (
			item.gender.toLowerCase() === "male" &&
			(item.name.toLowerCase().includes(searchQuery) ||
				item.type.toLowerCase().includes(searchQuery) ||
				item.material.toLowerCase().includes(searchQuery) ||
				item.description.toLowerCase().includes(searchQuery))
		);
	});
	localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
	window.location.href = "searchItems.html";
});

// Sweatshirt section
document
	.querySelector(".men_sweatshirt")
	.addEventListener("click", function (event) {
		event.preventDefault();
		var searchQuery = "sweatshirt";
		localStorage.setItem("searchQuery", searchQuery);

		// const items = JSON.parse(localStorage.getItem("items"));
		const items = fetchDataFromAPI();
		const filteredItems = items.filter((item) => {
			return (
				item.gender.toLowerCase() === "male" &&
				(item.name.toLowerCase().includes(searchQuery) ||
					item.type.toLowerCase().includes(searchQuery) ||
					item.material.toLowerCase().includes(searchQuery) ||
					item.description.toLowerCase().includes(searchQuery))
			);
		});
		localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
		window.location.href = "searchItems.html";
	});

// Pants section
document.querySelector(".men_pants").addEventListener("click", function (event) {
	event.preventDefault();
	var searchQuery = "pant";
	localStorage.setItem("searchQuery", searchQuery);

	// const items = JSON.parse(localStorage.getItem("items"));
	const items = fetchDataFromAPI();
	const filteredItems = items.filter((item) => {
		return (
			item.gender.toLowerCase() === "male" &&
			(item.name.toLowerCase().includes(searchQuery) ||
				item.type.toLowerCase().includes(searchQuery) ||
				item.material.toLowerCase().includes(searchQuery) ||
				item.description.toLowerCase().includes(searchQuery))
		);
	});
	localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
	window.location.href = "searchItems.html";
});

// Shoes section
document.querySelector(".men_shoes").addEventListener("click", function (event) {
	event.preventDefault();
	var searchQuery = "shoe";
	localStorage.setItem("searchQuery", searchQuery);

	// const items = JSON.parse(localStorage.getItem("items"));
	const items = fetchDataFromAPI();
	const filteredItems = items.filter((item) => {
		return (
			item.gender.toLowerCase() === "male" &&
			(item.name.toLowerCase().includes(searchQuery) ||
				item.type.toLowerCase().includes(searchQuery) ||
				item.material.toLowerCase().includes(searchQuery) ||
				item.description.toLowerCase().includes(searchQuery))
		);
	});
	localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
	window.location.href = "searchItems.html";
});

// Accessories section
document
	.querySelector(".men_accessories")
	.addEventListener("click", function (event) {
		event.preventDefault();
		var searchQuery = "accessories";
		localStorage.setItem("searchQuery", searchQuery);

		// const items = JSON.parse(localStorage.getItem("items"));
		const items = fetchDataFromAPI();
		const filteredItems = items.filter((item) => {
			return (
				item.gender.toLowerCase() === "male" &&
				(item.name.toLowerCase().includes(searchQuery) ||
					item.type.toLowerCase().includes(searchQuery) ||
					item.material.toLowerCase().includes(searchQuery) ||
					item.description.toLowerCase().includes(searchQuery))
			);
		});
		localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
		window.location.href = "searchItems.html";
	});

// Women Hoodie section
document.querySelector(".women_hoodie").addEventListener("click", function (event) {
	event.preventDefault();
	var searchQuery = "hoodie";
	localStorage.setItem("searchQuery", searchQuery);

	// const items = JSON.parse(localStorage.getItem("items"));
	const items = fetchDataFromAPI();
	const filteredItems = items.filter((item) => {
		return (
			item.gender.toLowerCase() === "female" &&
			(item.name.toLowerCase().includes(searchQuery) ||
				item.type.toLowerCase().includes(searchQuery) ||
				item.material.toLowerCase().includes(searchQuery) ||
				item.description.toLowerCase().includes(searchQuery))
		);
	});
	localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
	window.location.href = "searchItems.html";
});

// Women Sweatshirt section
document
	.querySelector(".women_sweatshirt")
	.addEventListener("click", function (event) {
		event.preventDefault();
		var searchQuery = "sweatshirt";
		localStorage.setItem("searchQuery", searchQuery);

		// const items = JSON.parse(localStorage.getItem("items"));
		const items = fetchDataFromAPI();
		const filteredItems = items.filter((item) => {
			return (
				item.gender.toLowerCase() === "female" &&
				(item.name.toLowerCase().includes(searchQuery) ||
					item.type.toLowerCase().includes(searchQuery) ||
					item.material.toLowerCase().includes(searchQuery) ||
					item.description.toLowerCase().includes(searchQuery))
			);
		});
		localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
		window.location.href = "searchItems.html";
	});

// Women Pants section
document.querySelector(".women_pants").addEventListener("click", function (event) {
	event.preventDefault();
	var searchQuery = "pant";
	localStorage.setItem("searchQuery", searchQuery);

	// const items = JSON.parse(localStorage.getItem("items"));
	const items = fetchDataFromAPI();
	const filteredItems = items.filter((item) => {
		return (
			item.gender.toLowerCase() === "female" &&
			(item.name.toLowerCase().includes(searchQuery) ||
				item.type.toLowerCase().includes(searchQuery) ||
				item.material.toLowerCase().includes(searchQuery) ||
				item.description.toLowerCase().includes(searchQuery))
		);
	});
	localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
	window.location.href = "searchItems.html";
});

// Women Shoes section
document.querySelector(".women_shoes").addEventListener("click", function (event) {
	event.preventDefault();
	var searchQuery = "shoe";
	localStorage.setItem("searchQuery", searchQuery);

	// const items = JSON.parse(localStorage.getItem("items"));
	const items = fetchDataFromAPI();
	const filteredItems = items.filter((item) => {
		return (
			item.gender.toLowerCase() === "female" &&
			(item.name.toLowerCase().includes(searchQuery) ||
				item.type.toLowerCase().includes(searchQuery) ||
				item.material.toLowerCase().includes(searchQuery) ||
				item.description.toLowerCase().includes(searchQuery))
		);
	});
	localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
	window.location.href = "searchItems.html";
});

// Women Accessories section
document
	.querySelector(".women_accessories")
	.addEventListener("click", function (event) {
		event.preventDefault();
		var searchQuery = "accessories";
		localStorage.setItem("searchQuery", searchQuery);

		// const items = JSON.parse(localStorage.getItem("items"));
		const items = fetchDataFromAPI();
		const filteredItems = items.filter((item) => {
			return (
				item.gender.toLowerCase() === "female" &&
				(item.name.toLowerCase().includes(searchQuery) ||
					item.type.toLowerCase().includes(searchQuery) ||
					item.type.toLowerCase().includes("jewelery") ||
					item.material.toLowerCase().includes(searchQuery) ||
					item.description.toLowerCase().includes(searchQuery))
			);
		});
		localStorage.setItem("filteredItems", JSON.stringify(filteredItems));
		window.location.href = "searchItems.html";
	});

document.querySelector(".paralax-btn").addEventListener("click", function () {
	window.location.href = "about.html";
});
