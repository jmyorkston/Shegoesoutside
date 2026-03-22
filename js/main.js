/* ============================================================
   SHE GOES OUTSIDE — Main JavaScript
   ============================================================ */

/* ─── MOBILE NAV TOGGLE ─── */
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.parentElement;
      // Close all others
      document.querySelectorAll('.faq-item').forEach(function (other) {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

  /* ─── EVENT FILTER ─── */
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const type = btn.dataset.filter;
      document.querySelectorAll('.event-card').forEach(function (card) {
        if (type === 'all' || card.dataset.type === type) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ─── CALENDAR ─── */
  if (document.getElementById('cal-grid')) {
    initCalendar();
  }

  /* ─── NEWSLETTER FORM ─── */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    const btn = form.querySelector('.btn');
    const input = form.querySelector('input[type="email"]');
    if (btn && input) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (input.value && input.value.includes('@')) {
          btn.textContent = '✓ You\'re in!';
          btn.style.background = '#2A7264';
          btn.style.color = 'white';
          input.value = '';
          setTimeout(function () {
            btn.textContent = '✦ Subscribe';
            btn.style.background = 'white';
            btn.style.color = '#E07B3F';
          }, 3000);
        } else {
          input.style.borderColor = '#E07B3F';
          setTimeout(function () { input.style.borderColor = ''; }, 2000);
        }
      });
    }
  });

  /* ─── CONTACT FORM ─── */
  const contactSubmit = document.querySelector('.form-submit');
  if (contactSubmit) {
    contactSubmit.addEventListener('click', function (e) {
      e.preventDefault();
      contactSubmit.textContent = '✓ Message Sent!';
      contactSubmit.style.background = '#2A7264';
      setTimeout(function () {
        contactSubmit.textContent = '✦ Send Message';
        contactSubmit.style.background = '#E07B3F';
      }, 3000);
    });
  }
});

/* ─── CALENDAR ENGINE ─── */
var calYear  = 2026;
var calMonth = 3; // 0-indexed → April

var CAL_EVENTS = {
  '2026-4-19':  'Skagit Valley Tulip Festival',
  '2026-5-3':   'Tea & Trails: Snohomish',
  '2026-5-10':  'Snow Lake Morning Hike',
  '2026-5-24':  'Burke-Gilman Trail Ride',
  '2026-6-21':  'Summer Solstice Kayak',
  '2026-10-11': 'Fall Colors Hike'
};

function initCalendar() {
  renderCalendar();

  document.getElementById('cal-prev').addEventListener('click', function () {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  });
  document.getElementById('cal-next').addEventListener('click', function () {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  });
}

function renderCalendar() {
  var monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  document.getElementById('cal-month-label').textContent =
    monthNames[calMonth] + ' ' + calYear;

  var grid  = document.getElementById('cal-grid');
  var days  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var html  = days.map(function (d) {
    return '<div class="cal-day-label">' + d + '</div>';
  }).join('');

  var firstDay = new Date(calYear, calMonth, 1).getDay();
  var totalDays = new Date(calYear, calMonth + 1, 0).getDate();
  var today = new Date();

  for (var i = 0; i < firstDay; i++) {
    html += '<div class="cal-day empty"></div>';
  }
  for (var d = 1; d <= totalDays; d++) {
    var key = calYear + '-' + (calMonth + 1) + '-' + d;
    var isToday = (
      today.getFullYear() === calYear &&
      today.getMonth()    === calMonth &&
      today.getDate()     === d
    );
    var hasEvent = !!CAL_EVENTS[key];
    var classes  = 'cal-day';
    if (isToday)  classes += ' today';
    if (hasEvent) classes += ' has-event';
    html += '<div class="' + classes + '" title="' + (CAL_EVENTS[key] || '') + '">' + d + '</div>';
  }
  grid.innerHTML = html;
}
