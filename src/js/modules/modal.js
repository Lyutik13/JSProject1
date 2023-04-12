const modals = (
	triggerSelector,
	modalSelector,
	closeSelector,
    closeClickOverlay = true,
	openModalTimerAdd = false,
	time = 60000
) => {
	const trigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector),
		close = document.querySelector(closeSelector),
		windows = document.querySelectorAll("[data-modal]");

	function closeModal() {
		/* 		modal.classList.add("hide");
		modal.classList.remove("show");
		document.body.style.overflow = ""; */
		modal.style.display = "none";
		document.body.style.overflow = "";
	}

	function openModal() {
		/* 		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden"; */
		modal.style.display = "block";
		document.body.style.overflow = "hidden";
	}

	function displayNone() {
		windows.forEach((item) => {
			item.style.display = "none";
		});
	}

	trigger.forEach((item) => {
		item.addEventListener("click", (e) => {
			// проверка на то что ел. был задействован(.target) и сброс стандартного поведения браезера (.preventDefault)
			if (e.target) {
				e.preventDefault();
			}

			displayNone();
			openModal();
		});
	});

	close.addEventListener("click", () => {
        displayNone();
		closeModal();
	});

	// закрытие modal по клику в области
	modal.addEventListener("click", (e) => {
		if (e.target === modal && closeClickOverlay) {
            displayNone();
			closeModal();
		}
	});

	// Закрытие модального окна при клике на клавишу ESC.
	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});

	// Открытие модалки через некоторое время (time = 60sec)
	function showModalByTime() {
		setTimeout(function () {
			openModal();
		}, time);
	}

	if (openModalTimerAdd) {
		// showModalByTime();
	}
};

export default modals;
