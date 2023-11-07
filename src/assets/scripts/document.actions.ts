import { slideDown, slideToggle, slideUp } from "./functions";

export async function documentActions() {
   document.addEventListener("click", function (e: any) {
      if (e.target.closest("[data-filter-open]")) {
         e.target.classList.toggle("_active")
         slideToggle(document.querySelector("[data-filter-section]"))
      }
   });
}

