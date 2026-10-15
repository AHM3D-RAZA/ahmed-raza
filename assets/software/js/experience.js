// Sections 3 and 4: roles (click to open) and certifications. Data: ROLES, EDUCATION, CERTS in content.js.
function initExperience() {
  const [degree, school, dates] = EDUCATION;
  $('#roles').innerHTML = ROLES.map(([title, org, when, bullets], i) => `<div class="role ${i === 0 ? 'open' : ''}">
    <div class="rail"><span class="dot-r"></span><span class="rail-line"></span></div>
    <div class="role-body"><button class="role-head" aria-expanded="${i === 0}"><span><b>${title}</b><span class="org">${org}</span></span><span class="mono dim when">${when}</span></button>
    <div class="role-more"><div><ul>${bullets.map((b) => `<li>${b}</li>`).join('')}</ul></div></div></div></div>`).join('')
    + `<div class="role edu"><div class="rail"><span class="sq"></span></div><p><b>${degree}</b>, ${school} <span class="mono dim">/ ${dates}</span></p></div>`;

  // open one role at a time; the open/close animation is CSS (see experience.css)
  $('#roles').addEventListener('click', (e) => {
    const head = e.target.closest('.role-head'); if (!head) return;
    const role = head.closest('.role'), wasOpen = role.classList.contains('open');
    document.querySelectorAll('#roles .role').forEach((r) => { r.classList.remove('open'); const h = r.querySelector('.role-head'); if (h) h.setAttribute('aria-expanded', 'false'); });
    if (!wasOpen) { role.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
  });

  $('#certs').innerHTML = CERTS.map(([name, year, href]) => `<a class="cert" href="${href}"><p class="mono dim">FREECODECAMP / ${year}</p><b>${name}</b><span class="mono sun">View credential &#8599;</span></a>`).join('');
}
