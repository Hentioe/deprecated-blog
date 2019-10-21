document.addEventListener("DOMContentLoaded", function() {
  let sidenavElem = document.querySelector(".sidenav");
  M.Sidenav.init(sidenavElem, {});

  let collapsibleElems = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsibleElems, {});

  let actionBtnElems = document.querySelectorAll(".fixed-action-btn");
  M.FloatingActionButton.init(actionBtnElems, {});
});

export default function(page) {
  const pageSelect = `div[phx-hook="${page}"]`;

  M.FormSelect.init(document.querySelectorAll(`${pageSelect} select`), {});
  M.Tabs.init(document.querySelectorAll(`${pageSelect} .tabs`), {});
  M.Chips.init(document.querySelectorAll(`${pageSelect} .chips`), {});
  M.FloatingActionButton.init(
    document.querySelectorAll(`${pageSelect} .fixed-action-btn`),
    {}
  );
}
