// Section 5, about. Text from ABOUT in content.js; the numbers are counted from PROJECTS, ROLES and CERTS.
function initAbout() {
  $('#about-h').textContent = ABOUT.heading;
  $('#about-text').innerHTML = ABOUT.paragraphs.map((p) => `<p>${p}</p>`).join('');
  $('#stats').innerHTML = [[PROJECTS.length, 'PROJECTS'], [ROLES.length, 'ROLES'], [CERTS.length, 'CERTIFICATES']].map(([n, l]) => `<div class="card"><b>${n}</b><span class="mono dim">${l}</span></div>`).join('');
  $('#about-pigeon').innerHTML = PIGEON;
}
