document.addEventListener("DOMContentLoaded", function() {
  let sidenavElem = document.querySelector(".sidenav");
  M.Sidenav.init(sidenavElem, {});

  let collapsibleElems = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsibleElems, {});
});
