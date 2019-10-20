document.addEventListener("DOMContentLoaded", function() {
  const sidenavElem = document.querySelector(".sidenav");
  M.Sidenav.init(sidenavElem, {});

  const collapsibleElems = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsibleElems, {});

  const elems = document.querySelectorAll(".fixed-action-btn");
  M.FloatingActionButton.init(elems, {});
});
