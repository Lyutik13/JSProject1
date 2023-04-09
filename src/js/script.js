import "./modules/slider";
import modals from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
	modals("[data-modal]", ".popup_engineer", "[data-close]");
});
