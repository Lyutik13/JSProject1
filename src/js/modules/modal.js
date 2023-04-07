const modal = () => {
	const modalTrigger = document.querySelectorAll("[data-modal]"),
		modalCloseBtn = document.querySelector("[data-close]"),
		modalWindow = document.querySelector(".popup_engineer");

	function closeModal() {
		modalWindow.classList.add("hide");
		modalWindow.classList.remove("show");
		document.body.style.overflow = "";
	}

	function openModal() {
		modalWindow.classList.add("show");
		modalWindow.classList.remove("hide");
		document.body.style.overflow = "hidden";
	}

	modalTrigger.forEach((item) => {
		item.addEventListener("click", () => openModal());
	});

	modalCloseBtn.addEventListener("click", () => closeModal());

	// закрытие modal по клику в области
	modalWindow.addEventListener("click", (e) => {
		if (e.target === modalWindow) {
			closeModal();
		}
	});

	// Закрытие модального окна при клике на клавишу ESC.
	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modalWindow.classList.contains("show")) {
			closeModal();
		}
	});
};

export default modal;
