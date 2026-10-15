// Section 6, Contact: the pigeon lands on whichever link you point at. Links: CONTACT in content.js.
function initContact() {
  const section = $('#contact'), perch = $('#perch'), grid = $('#contact-links');
  perch.innerHTML = PIGEON;
  grid.innerHTML = CONTACT.links.map((l) => `<a class="link" href="${l.href}"><span class="mono">${l.label}</span><b>${l.text}</b></a>`).join('');
  const links = [...grid.children];

  function land(a) { // sit on top of link `a`, measured from the page so it works at any width
    const s = section.getBoundingClientRect(), r = a.getBoundingClientRect();
    perch.style.left = r.left - s.left + r.width / 2 - 45 + 'px';
    perch.style.top = r.top - s.top - 60 + 'px';
  }
  links.forEach((a) => { a.addEventListener('mouseenter', () => land(a)); a.addEventListener('focus', () => land(a)); });
  land(links[0]);
  addEventListener('load', () => land(links[0]));
  addEventListener('resize', () => land(links[0]));
}
