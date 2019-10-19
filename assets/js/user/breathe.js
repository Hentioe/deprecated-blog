const Url = require("url");
const url = Url.parse(location.href);

const mapping = [
  { start: "/p/", path: "/readding" },
  { start: "/", path: "/" }
];

for (let i = 0, len = mapping.length; i < len; i++) {
  let { start, path } = mapping[i];

  if (url.pathname.startsWith(start)) {
    icon = document.querySelector(`.navbar-item[href="${path}"]`);
    if (icon) {
      icon.classList.add("breathe");
      break;
    }
  }
}
