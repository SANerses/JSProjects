import { init, render, setupListeners } from "./dom.js";

function main() {
    init();
    setupListeners();
    render();
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});