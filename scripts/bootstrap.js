const myModal = new bootstrap.Modal("#groupChatModal", {
  keyboard: false,
});
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

window.openModal = function () {
  myModal.show();
};

window.hideModal = function () {
  myModal.hide();
};
