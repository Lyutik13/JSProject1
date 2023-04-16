"use strict";

import "./modules/slider";
import modals from "./modules/modal";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";

window.addEventListener("DOMContentLoaded", () => {

    let modalState = {};

    changeModalState(modalState);

    modals(".header_btn", ".popup_engineer", ".popup_dialog-close", true, true);
    modals(".phone_link", ".popup", ".popup_close");
    modals(".popup_calc_btn", ".popup_calc", ".popup_calc_close", false);
    modals(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false);
    modals(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false);

    tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
    tabs(".decoration_slider", ".no_click", ".decoration_content > div > div", "after_click");
    tabs(".balcon_icons", ".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");

    forms(modalState);
});
