const modals = (
	triggerSelector,
	modalSelector,
	closeSelector,
	openModalTimerAdd = false,
	time = 60000
) => {
	const trigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector),
		close = document.querySelector(closeSelector),
		windows = document.querySelectorAll("[data-m]");

	function closeModal() {
		modal.classList.add("hide");
		modal.classList.remove("show");
		document.body.style.overflow = "";
	}

	function openModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
	}

	trigger.forEach((item) => {
		item.addEventListener("click", (e) => {
			// проверка на то что ел. был задействован(.target) и сброс стандартного поведения браезера (.preventDefault)
			if (e.target) {
				e.preventDefault();
			}

			openModal();
		});
	});

	close.addEventListener("click", () => {
		closeModal();
	});

	// закрытие modal по клику в области
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
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
