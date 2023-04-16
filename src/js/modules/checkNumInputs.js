const checkNumInputs = (selector) => {
	const numInputs = document.querySelectorAll(selector);

	// проверка номера валидность
	numInputs.forEach((item) => {
		item.addEventListener("input", () => {
			item.value = item.value.replace(/\D/, "");
		});
	});
};

export default checkNumInputs;
