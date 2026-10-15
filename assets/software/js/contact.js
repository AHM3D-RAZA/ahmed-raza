// Section 6, contact: click the big button to copy the email. Data: CONTACT in content.js.
function initContact() {
  const btn = $('#copy');
  btn.textContent = CONTACT.email;
  $('#mail').href = 'mailto:' + CONTACT.email;
  btn.onclick = () => {
    try { navigator.clipboard.writeText(CONTACT.email); } catch (e) { /* the mail link below still works */ }
    btn.textContent = 'Copied'; btn.classList.add('done');
    setTimeout(() => { btn.textContent = CONTACT.email; btn.classList.remove('done'); }, 1800);
  };
  $('#contact-links').innerHTML = CONTACT.links.map(([label, text, href]) => `<a class="card" href="${href}"><span class="mono dim">${label}</span><b>${text} &#8599;</b></a>`).join('');
}
