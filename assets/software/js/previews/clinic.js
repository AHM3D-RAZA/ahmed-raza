// Preview: Aster Clinic System. Book as a patient, then switch to the staff dashboard and confirm it.
(function () {
  const SERVICES = ['General visit', 'Dental check', 'Eye test'];
  const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  const LABELS = ['STEP 1 / CHOOSE A SERVICE', 'STEP 2 / PICK A TIME', 'STEP 3 / CHECK AND SEND', 'REQUEST SENT. OPEN THE STAFF DASHBOARD TO CONFIRM IT.'];
  let view = 'patient', step = 0, service = '', slot = '', requests = []; // kept here so bookings survive switching projects

  PREVIEWS.clinic = function (el) {
    function draw() {
      const options = step === 0 ? SERVICES.map((s) => [s, s]) : step === 1 ? SLOTS.map((s) => [s, s])
        : step === 2 ? [[`Send request: ${service} at ${slot}`, 'send']] : [['Book another', 'again']];
      const patient = `<p class="mono sun" style="margin-top:18px">${LABELS[step]}</p><div class="opts">${options.map(([name, v]) => `<button class="opt" data-act="opt" data-v="${v}">${name}</button>`).join('')}</div>`;
      const staff = `<p class="mono sun" style="margin-top:18px">BOOKING REQUESTS</p>${requests.length ? '' : '<p class="dim">No requests yet. Book one as a patient first.</p>'}
        ${requests.map((r, i) => `<div class="req"><span>${r.text}</span><button class="btn sm ${r.ok ? 'ok' : ''}" data-act="confirm" data-i="${i}">${r.ok ? 'Confirmed' : 'Confirm'}</button></div>`).join('')}`;
      el.innerHTML = `<div class="pv"><div class="pv-top"><span class="mono dim">Sample clinic / booking</span><span class="tabs">
        <button class="pill" data-act="view" data-v="patient" aria-pressed="${view === 'patient'}">Patient</button><button class="pill" data-act="view" data-v="staff" aria-pressed="${view === 'staff'}">Staff dashboard</button></span></div>
        ${view === 'patient' ? patient : staff}</div>`;
    }
    el.onclick = (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const a = b.dataset.act, v = b.dataset.v;
      if (a === 'view') view = v;
      if (a === 'confirm') requests[+b.dataset.i].ok = true;
      if (a === 'opt') {
        if (step === 0) { service = v; step = 1; }
        else if (step === 1) { slot = v; step = 2; }
        else if (v === 'send') { requests.push({ text: `${service} at ${slot}`, ok: false }); step = 3; }
        else step = 0;
      }
      draw();
    };
    draw();
  };
})();
