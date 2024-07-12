const apiForm = document.querySelector("#api-form");
const nameInput = document.querySelector("#name");
const nameInputError = document.querySelector("#nameInputError");
const emailInputError = document.querySelector("#emailInputError");
const displayAgeError = document.querySelector("#displayAgeError");
const emailInput = document.querySelector("#email");
// const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
const nameRegex = /(?=^[A-Za-z]+\s?[A-Za-z]+$).{4,}/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const namespan = document.querySelector("#namespan");
const agespan = document.querySelector("#agespan");

function isFormValid() {
	let isValid = true;
	if (nameInput.value === "") {
		nameInputError.style.display = "block";
		isValid = false;
	} else if (!nameRegex.test(nameInput.value)) {
		nameInputError.style.display = "block";
		nameInputError.innerHTML =
			"Name should contain atleast 4 characters, no numbers and max one space";
		isValid = false;
	} else {
		nameInputError.style.display = "none";
	}

	if (emailInput.value === "") {
		emailInputError.style.display = "block";

		isValid = false;
	} else if (!emailRegex.test(emailInput.value)) {
		emailInputError.style.display = "block";
		isValid = false;
	} else {
		emailInputError.style.display = "none";
	}

	return isValid;
}

apiForm.addEventListener("submit", function (evt) {
	evt.preventDefault();

	if (isFormValid()) {
		// apiForm.submit();
		guessAge(nameInput.value);
	}
});

async function guessAge(name) {
	const lowername = name.toLowerCase();

	try {
		const apiURL = `https://api.agify.io?name=${lowername}`;

		const response = await fetch(apiURL, { method: "GET" });
		if (!response.ok) {
			throw new Error("Couldn't fetch data");
		}
		const data = await response.json();

		displayAgeError.style.display = "none";
		namespan.innerHTML = name;
		agespan.innerHTML = data.age;
		if (!data.age) {
			displayAgeError.style.display = "block";
			agespan.innerHTML = "?";
			throw new Error("Couldn't guess age for this name");
		}
	} catch (err) {
		console.log(err.message);
	}
}
