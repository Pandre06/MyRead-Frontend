/* ---------- Sample data ---------- */
const sampleInstructors = [
  {id:'i1',name:'Asha Patel',title:'Senior Frontend Engineer',bio:'12+ yrs building web apps',avatar:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=60'},
  {id:'i2',name:'Rahul Mehta',title:'Data Analyst',bio:'Ex-consulting, loves charts',avatar:'https://images.unsplash.com/photo-1545996124-1f1f5f4b9e5b?w=400&q=60'},
  {id:'i3',name:'Lina Gomez',title:'UI/UX Designer',bio:'Design systems & accessibility',avatar:'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&q=60'}
];

const sampleCourses = [
  {id:'c1',title:'Modern JavaScript for Beginners',desc:'Learn ES6+, DOM, async/await and build real projects.',cat:'web',img:'https://picsum.photos/seed/js/400/300',price:0,instructor:'i1',rating:4.7,students:1240},
  {id:'c2',title:'Responsive Web Design',desc:'HTML, CSS, Flexbox, Grid and accessibility best practices.',cat:'web',img:'https://picsum.photos/seed/css/400/300',price:19,instructor:'i3',rating:4.6,students:820},
  {id:'c3',title:'Data Visualization with JavaScript',desc:'Charts using Chart.js and D3, storytelling with data.',cat:'data',img:'https://picsum.photos/seed/data/400/300',price:29,instructor:'i2',rating:4.8,students:640},
  {id:'c4',title:'Intro to Machine Learning',desc:'Supervised learning, regression, classification basics.',cat:'ml',img:'https://picsum.photos/seed/ml/400/300',price:39,instructor:'i2',rating:4.5,students:410},
];

/* ---------- App State ---------- */
let courses = JSON.parse(localStorage.getItem('edu_courses')) || sampleCourses.slice();
let instructors = JSON.parse(localStorage.getItem('edu_instructors')) || sampleInstructors.slice();
let enrollments = JSON.parse(localStorage.getItem('edu_enrollments')) || [];

/* ---------- DOM refs ---------- */
const coursesEl = document.getElementById('courses');
const instructorsEl = document.getElementById('instructors');
const enrollmentSummaryEl = document.getElementById('enrollmentSummary');
const visibleCountEl = document.getElementById('visibleCount');

/* ---------- Controls ---------- */
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');
const addCourseBtn = document.getElementById('addCourseBtn');

/* ---------- Modal ---------- */
const modal = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const enrollForm = document.getElementById('enrollForm');
const studentName = document.getElementById('studentName');
const studentEmail = document.getElementById('studentEmail');
const cancelEnroll = document.getElementById('cancelEnroll');

let activeCourseId = null;

/* ---------- Functions ---------- */
function saveState(){
  localStorage.setItem('edu_courses', JSON.stringify(courses));
  localStorage.setItem('edu_instructors', JSON.stringify(instructors));
  localStorage.setItem('edu_enrollments', JSON.stringify(enrollments));
}

function formatPrice(p){return p===0? 'Free' : '₹'+p}

function escapeHtml(text){
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ---------- Rendering ---------- */
function renderCourses(list){
  coursesEl.innerHTML='';
  list.forEach(c=>{
    const inst = instructors.find(i=>i.id===c.instructor) || {};
    const card = document.createElement('article');
    card.className='course';
    card.innerHTML = `
      <img src="${c.img}" alt="${c.title} image">
      <div class="meta">
        <h3>${escapeHtml(c.title)}</h3>
        <p class="muted">${escapeHtml(c.desc)}</p>
        <div class="tags" aria-hidden>
          <span class="tag">${c.cat.toUpperCase()}</span>
          <span class="tag">⭐ ${c.rating}</span>
          <span class="tag">👩‍🏫 ${inst.name||'Staff'}</span>
        </div>
      </div>
      <div class="actions">
        <div class="price">${formatPrice(c.price)}</div>
        <button class="btn" data-enroll="${c.id}">Enroll</button>
        <button class="select" data-view="${c.instructor}">View Instructor</button>
      </div>
    `;
    coursesEl.appendChild(card);
  });
  visibleCountEl.textContent = list.length;
}

function renderInstructors(){
  instructorsEl.innerHTML='';
  instructors.forEach(i=>{
    const el = document.createElement('div');
    el.className='instructor';
    el.innerHTML = `
      <img class="avatar" src="${i.avatar}" alt="${i.name}">
      <div>
        <h4>${escapeHtml(i.name)}</h4>
        <p class="small muted">${escapeHtml(i.title)}</p>
      </div>
    `;
    el.addEventListener('click',()=>{ alert(i.name + " — " + i.bio); })
    instructorsEl.appendChild(el);
  });
}

function renderEnrollments(){
  enrollmentSummaryEl.innerHTML='';
  if(enrollments.length===0){ 
    enrollmentSummaryEl.innerHTML='<p class="muted">No enrollments yet.</p>'; 
    return 
  }
  enrollments.forEach(e=>{
    const course = courses.find(c=>c.id===e.courseId) || {title:'(deleted)'};
    const item = document.createElement('div');
    item.className='enroll-item';
    item.innerHTML = `<div>${escapeHtml(course.title)}<div class="small muted">${escapeHtml(e.name)}</div></div><div style="text-align:right"><div class="small muted">${new Date(e.date).toLocaleString()}</div><button class="select" data-cancel="${e.id}" style="margin-top:6px">Cancel</button></div>`;
    enrollmentSummaryEl.appendChild(item);
  });
}

/* ---------- Filter & Sort ---------- */
function filterAndSort(){
  const q = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;
  let list = courses.filter(c=>{
    if(cat!=='all' && c.cat!==cat) return false;
    if(!q) return true;
    return (c.title+c.desc).toLowerCase().includes(q) || (instructors.find(i=>i.id===c.instructor)||{}).name.toLowerCase().includes(q);
  });
  const s = sortBy.value;
  if(s==='price-low') list.sort((a,b)=>a.price-b.price);
  if(s==='price-high') list.sort((a,b)=>b.price-a.price);
  if(s==='newest') list = list.slice().reverse();
  if(s==='popular') list.sort((a,b)=>b.students-a.students);
  renderCourses(list);
}

/* ---------- Modal ---------- */
function openEnrollModal(courseId){
  activeCourseId = courseId;
  const c = courses.find(x=>x.id===courseId);
  modalTitle.textContent = 'Enroll — ' + (c?c.title:'Course');
  modal.setAttribute('aria-hidden','false');
  modal.classList.add('active');
  studentName.value=''; studentEmail.value='';
  studentName.focus();
}

function closeEnrollModal(){ 
  modal.classList.remove('active'); 
  modal.setAttribute('aria-hidden','true'); 
  activeCourseId=null 
}

/* ---------- Event Listeners ---------- */
document.addEventListener('click', e=>{
  if(e.target.matches('[data-enroll]')){
    openEnrollModal(e.target.getAttribute('data-enroll'))
  }
  if(e.target.matches('[data-view]')){
    const iid = e.target.getAttribute('data-view');
    const i = instructors.find(x=>x.id===iid);
    if(i) alert(i.name + '\n' + i.title + '\n\n' + i.bio);
  }
  if(e.target.matches('[data-cancel]')){
    const id = e.target.getAttribute('data-cancel');
    enrollments = enrollments.filter(x=>x.id!==id); 
    saveState(); 
    renderEnrollments();
  }
});

enrollForm.addEventListener('submit', e=>{
  e.preventDefault();
  if(!activeCourseId) return;
  const name = studentName.value.trim();
  const email = studentEmail.value.trim();
  if(!name || !email) return;
  const enrollment = {id:'enr_'+Date.now(), courseId:activeCourseId, name, email, date:new Date().toISOString()};
  enrollments.unshift(enrollment);
  saveState(); renderEnrollments(); closeEnrollModal();
  alert('Enrollment confirmed — check the enrollment panel (right side).');
});

closeModal.addEventListener('click', closeEnrollModal);
cancelEnroll.addEventListener('click', closeEnrollModal);

document.getElementById('viewEnrollments').addEventListener('click', ()=>{
  enrollmentSummaryEl.scrollIntoView({behavior:'smooth',block:'center'});
});

searchInput.addEventListener('input', debounce(filterAndSort, 220));
categoryFilter.addEventListener('change', filterAndSort);
sortBy.addEventListener('change', filterAndSort);

addCourseBtn.addEventListener('click', ()=>{
  const newc = {id:'c'+(Date.now()), title:'Build Responsive UI Patterns', desc:'Hands-on patterns: header, cards, responsive grids', cat:'web', img:'https://picsum.photos/seed/'+Date.now()+'/400/300', price:9, instructor:instructors[0].id, rating:4.4, students:Math.floor(Math.random()*300)};
  courses.unshift(newc); saveState(); filterAndSort();
});

document.getElementById('themeToggle').addEventListener('click', ()=>{
  document.body.classList.toggle('alt-theme');
  if(document.body.classList.contains('alt-theme')){
    document.documentElement.style.setProperty('--accent','#06b6d4');
    document.documentElement.style.setProperty('--accent-2','#0ea5a3');
  } else {
    document.documentElement.style.setProperty('--accent','#7c3aed');
    document.documentElement.style.setProperty('--accent-2','#06b6d4');
  }
});

document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeEnrollModal(); });

/* ---------- Init ---------- */
renderInstructors(); renderCourses(courses); renderEnrollments();
function debounce(fn, ms){ let t; return function(...a){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a), ms) }}
window.__EDUSPARK = {courses, instructors, enrollments};
