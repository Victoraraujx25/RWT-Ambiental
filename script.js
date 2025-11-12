
// smooth internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// WhatsApp widget behavior (renders only on selected pages)
(function(){
  const widgetPages = window.WH_PAGES || ['index','servicos','contato'];
  const page = document.body.getAttribute('data-page') || '';
  if(!widgetPages.includes(page)) return;

  const phoneAdmin = '556599015315'; // Administrativo
  const phoneMeio = '5565999968139'; // Meio Ambiente
  const preset = encodeURIComponent('Olá, estou entrando em contato pelo site da RWT Ambiental!');

  const container = document.createElement('div');
  container.className = 'wh-widget';

  const mainBtn = document.createElement('button');
  mainBtn.className = 'wh-btn';
  mainBtn.innerHTML = 'Fale conosco ▾';
  container.appendChild(mainBtn);

  const panel = document.createElement('div');
  panel.className = 'wh-panel';

  const item1 = document.createElement('div');
  item1.className = 'wh-item';
  item1.innerHTML = '💼 Administrativo<br/><small style="color:#667b73"> +55 (65) 9901-5315</small>';
  item1.addEventListener('click', ()=> window.open(`https://wa.me/${phoneAdmin}?text=${preset}`,'_blank'));
  panel.appendChild(item1);

  const item2 = document.createElement('div');
  item2.className = 'wh-item';
  item2.innerHTML = '🌿 Meio Ambiente<br/><small style="color:#667b73"> +55 (65) 99996-8139</small>';
  item2.addEventListener('click', ()=> window.open(`https://wa.me/${phoneMeio}?text=${preset}`,'_blank'));
  panel.appendChild(item2);

  container.appendChild(panel);
  document.body.appendChild(container);

  let open = false;
  mainBtn.addEventListener('click', ()=>{
    open = !open;
    panel.style.display = open ? 'flex' : 'none';
  });
})();
