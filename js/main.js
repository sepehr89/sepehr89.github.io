const routes = {
  home:        "home.html",
  skills:    "skills.html",
  publications:"publications.html",
  projects:    "projects.html",
  others:    "others.html",
  contact:     "contact.html"
};

function setActiveLink(hash) {
  const links = document.querySelectorAll('.top-nav a');
  links.forEach(a => a.classList.remove('active'));
  const active = document.querySelector(`.top-nav a[href="${hash}"]`);
  if (active) active.classList.add('active');
}

async function loadRoute() {
    console.log(location.hash)
  let key = (location.hash || "#home").replace("#", "");
  if (!routes[key]) key = "home";
  setActiveLink(`#${key}`);

  try {
    const res = await fetch(routes[key], { cache: "no-store" });
    const html = await res.text();
    document.getElementById("content").innerHTML = html;
    // optional: scroll to top of container after load
    window.scrollTo({ top: 0, behavior: "instant" });
  } catch (e) {
    document.getElementById("content").innerHTML = "<p>Section not found.</p>";
  }
}

window.addEventListener("hashchange", loadRoute);
window.addEventListener("load", loadRoute);
