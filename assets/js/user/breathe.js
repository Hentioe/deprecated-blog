const Url = require("url");
const url = Url.parse(location.href);

const mapping = [
  { start: "/p/", path: "/readding" },
  { start: "/c/", path: "/" },
  { start: "/t/", path: "/" },
  { start: "/", end: "/", path: "/" }
];

for (let i = 0, len = mapping.length; i < len; i++) {
  const { start, path } = mapping[i];
  const end = mapping[i].end;

  if (url.pathname.startsWith(start) && (end ? url.pathname.endsWith(end) : true)) {
    icon = document.querySelector(`.navbar-item[href="${path}"]`);
    if (icon) {
      icon.classList.add("breathe");
      break;
    }
  }
}
