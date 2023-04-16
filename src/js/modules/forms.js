const forms = (state) => {
	const form = document.querySelectorAll("form"),
		inputs = document.querySelectorAll("input"),
		phoneInputs = document.querySelectorAll("input[name='user_phone']");

	// проверка номера валидность
	/* 	phoneInputs.forEach((item) => {
		item.addEventListener("input", () => {
			item.value = item.value.replace(/\D/, "");
		});
	}); */
	phoneInputs.forEach((item) => {
		item.addEventListener("focus", () => {
			// Если там ничего нет или есть, но левое
			if (!/^\+\d*$/.test(item.value))
				// То вставляем знак плюса как значение
				item.value = "+7";
		});

		item.addEventListener("keypress", (e) => {
			// Отменяем ввод не цифр
			if (!/\d/.test(e.key)) e.preventDefault();
		});

		var old = 0;

		item.onkeydown = function () {
			var curLen = item.value.length;

			if (curLen < old) {
				old--;
				return;
			}

			if (curLen == 2) item.value = item.value + "(";

			if (curLen == 6) item.value = item.value + ")-";

			if (curLen == 11) item.value = item.value + "-";

			if (curLen == 14) item.value = item.value + "-";

			if (curLen > 16)
				item.value = item.value.substring(0, item.value.length - 1);

			old++;
		};
	});

	const message = {
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы с вами свяжемся",
		error: "Что то пошло не так...",
	};

	// отправка одного запроса, если больше делай файлик с ними
	const postData = async (url, data) => {
		document.querySelector(".status").textContent = message.loading;
		let res = await fetch(url, {
			method: "POST",
			body: data,
		});

		return await res.text();
	};

	const clearInouts = () => {
		inputs.forEach((item) => {
			item.value = "";
		});
	};

	// Перебор всех форм, событие, отмена ст. поведения браузера(перезагрузки)
	form.forEach((item) => {
		item.addEventListener("submit", (e) => {
			e.preventDefault();

			// оповещение пользователя (создали, +класс стилей, добавили в конец)
			let statusMessage = document.createElement("div");
			statusMessage.classList.add("status");
			item.appendChild(statusMessage);

			// собираем данные
			const formData = new FormData(item);

			if (item.getAttribute("data-calc") === "end") {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			// отправляем данные
			postData("server.php", formData)
				.then((res) => {
					console.log(res);
					statusMessage.textContent = message.success;
				})
				.catch(() => (statusMessage.textContent = message.error))
				.finally(() => {
					clearInouts();
					setTimeout(() => {
						statusMessage.remove();
					}, 3000);
				});
		});
	});
};

export default forms;
