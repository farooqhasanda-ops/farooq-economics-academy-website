document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
function closeMenu() {
  navigation.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const courses = {
  CEC: {title: 'For CEC students', description: 'Build your understanding across key subjects and turn it into stronger exam answers.', subjects: ['Civics', 'Economics', 'Commerce']},
  'Economics & Commerce': {title: 'Economics & Commerce tuition', description: 'Targeted lessons in either subject, with regular revision and exam practice.', subjects: ['Economics', 'Commerce']},
  Accountancy: {title: 'Accountancy support', description: 'Step-by-step explanations and regular problem practice to develop accuracy.', subjects: ['Accountancy']}
};
const tabs = [...document.querySelectorAll('.course-tabs [role="tab"]')];
const panel = document.getElementById('course-panel');
function chooseCourse(tab) {
  const course = tab.dataset.course;
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  panel.setAttribute('aria-labelledby', tab.id);
  document.getElementById('course-title').textContent = courses[course].title;
  document.getElementById('course-description').textContent = courses[course].description;
  document.getElementById('course-subjects').replaceChildren(...courses[course].subjects.map(subject => { const chip = document.createElement('span'); chip.textContent = subject; return chip; }));
  document.getElementById('course-cta').firstChild.textContent = `Ask about ${course} support `;
  document.getElementById('enquiry-stream').value = course;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => chooseCourse(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    chooseCourse(tabs[next]); tabs[next].focus();
  });
});

document.querySelectorAll('[data-choose-course]').forEach(link => {
  link.addEventListener('click', () => {
    const tab = tabs.find(item => item.dataset.course === link.dataset.chooseCourse);
    if (tab) chooseCourse(tab);
  });
});

const form = document.getElementById('enquiry-form');
const draft = document.getElementById('draft');
const draftMessage = document.getElementById('draft-message');
const draftStatus = document.getElementById('draft-status');
form.addEventListener('submit', event => event.preventDefault());
document.getElementById('prepare-draft').addEventListener('click', () => {
  if (!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  draftMessage.value = `Hello Farooq Economics Academy,\n\nI would like to discuss Intermediate tuition and a guidance call.\n\nStudent: ${values.student.trim()}\nParent: ${values.parent.trim() || 'Not provided'}\nYear: ${values.year}\nTuition focus: ${values.stream}\nSubject: ${values.subject}\nPreferred arrangement: ${values.mode || 'Open to discussing'}\n\nPlease share the available timings and next steps.`;
  draft.hidden = false;
  draftStatus.textContent = 'This draft stays in your browser. Copying it does not send it.';
  draft.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest'});
  draftMessage.focus({preventScroll: true});
});
document.getElementById('copy-draft').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(draftMessage.value); draftStatus.textContent = 'Copied. Choose when and how to share it.'; }
  catch { draftMessage.select(); draftStatus.textContent = 'Select and copy the draft above. Nothing was sent.'; }
});

// Use the same owner-supplied portrait in the hero and About section.
const portrait = new Image();
portrait.onload = () => document.querySelectorAll('[data-founder-photo]').forEach(image => {
  image.src = portrait.src;
  image.removeAttribute('aria-hidden');
  image.closest('.portrait-wrap').classList.add('has-photo');
});
portrait.src = '/static/farooq-hasan.jpg';

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), {threshold: .08, rootMargin: '0px 0px 30px 0px'});
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
} else document.querySelectorAll('.reveal').forEach(item => item.classList.add('is-visible'));
