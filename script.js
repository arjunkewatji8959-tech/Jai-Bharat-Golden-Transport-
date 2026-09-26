const OWNER_WHATSAPP = "919691804027";
const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");
menuBtn?.addEventListener("click", () => { const open = navLinks?.classList.toggle("show"); menuBtn?.setAttribute("aria-expanded", String(!!open)); });
document.querySelectorAll("#navLinks a").forEach(link => link.addEventListener("click", () => { navLinks?.classList.remove("show"); menuBtn?.setAttribute("aria-expanded","false"); }));

const routeBtn = document.querySelector("#routeBtn");
routeBtn?.addEventListener("click", () => {
  const from = document.querySelector("#routeFrom")?.value.trim();
  const to = document.querySelector("#routeTo")?.value.trim();
  const box = document.querySelector("#routeResult"); if (!box) return;
  if (!from || !to) { box.hidden=false; box.textContent="Please enter both pickup and delivery locations."; return; }
  box.hidden=false;
  const text = `Hello Jai Bharat Golden Transport, I need a route enquiry from ${from} to ${to}. Please share vehicle availability and freight details.`;
  box.innerHTML = `<strong>${escapeHtml(from)} → ${escapeHtml(to)}</strong><br><span>Send this route enquiry directly on WhatsApp.</span> <a class="route-wa" target="_blank" rel="noopener" href="https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}">WhatsApp Enquiry →</a>`;
});

document.querySelectorAll(".fleet-book").forEach(btn => btn.addEventListener("click", () => {
  const select = document.querySelector("#vehicleSelect");
  if (select) select.value = btn.dataset.vehicle || "";
  document.querySelector("#booking")?.scrollIntoView({behavior:"smooth"});
  setTimeout(() => document.querySelector('[name="name"]')?.focus(), 500);
}));

const bookingForm = document.querySelector("#bookingForm");
bookingForm?.addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(bookingForm).entries());
  if (!data.date) { alert("Please select your pickup date before booking."); document.querySelector('[name="date"]')?.focus(); return; }
  const pickupDate = new Date(`${data.date}T00:00:00`);
  const formattedDate = pickupDate.toLocaleDateString("en-IN", {day:"2-digit",month:"long",year:"numeric"});
  const message = `Hello Jai Bharat Golden Transport,\n\nI would like to book a vehicle.\n\nCustomer Name: ${data.name}\nMobile Number: ${data.phone}\nVehicle: ${data.vehicle}\nCargo Weight: ${data.ton} Ton\nPickup Location: ${data.pickup}\nDelivery Location: ${data.delivery}\nGoods Type: ${data.goods || "Not specified"}\nPickup Date: ${formattedDate}\nAdditional Details: ${data.message || "None"}\n\nPlease confirm vehicle availability, freight and booking details.`;
  window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

const dateInput = document.querySelector('[name="date"]');
if (dateInput) { const today=new Date(); const yyyy=today.getFullYear(); const mm=String(today.getMonth()+1).padStart(2,"0"); const dd=String(today.getDate()).padStart(2,"0"); dateInput.min=`${yyyy}-${mm}-${dd}`; }
document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}

// v9: vehicle detail modal
const vehicleDetails={
  "Tata Pickup":{image:"tata-pickup.svg",capacity:"1–2 Ton",use:"Small cargo, local delivery and short routes",text:"Compact vehicle option for smaller commercial loads and local transport requirements."},
  "14 Feet":{image:"14-ft.svg",capacity:"4–5 Ton",use:"General cargo and business stock",text:"A practical medium vehicle for regular commercial goods and route-based cargo."},
  "17 Feet":{image:"17-ft.svg",capacity:"6–7 Ton",use:"Larger commercial loads",text:"Longer body option for businesses needing more cargo space and load capacity."},
  "19 Feet":{image:"19-ft.svg",capacity:"8–9 Ton",use:"Heavy commercial goods",text:"Heavy-duty option for larger commercial cargo and longer transport requirements."},
  "22 Feet":{image:"22-ft.svg",capacity:"9–12 Ton",use:"Large cargo and long-distance routes",text:"Large-body vehicle option for bigger cargo requirements, subject to availability."}
};
const modal=document.querySelector('#vehicleModal');
function openVehicleModal(name){const d=vehicleDetails[name];if(!modal||!d)return;document.querySelector('#vehicleModalTitle').textContent=name;document.querySelector('#vehicleModalText').textContent=d.text;document.querySelector('#vehicleModalCapacity').textContent=d.capacity;document.querySelector('#vehicleModalUse').textContent=d.use;document.querySelector('#vehicleModalImage').src=d.image;document.querySelector('#vehicleModalImage').alt=name;modal.dataset.vehicle=name;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeVehicleModal(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('.fleet-card h3').forEach(h=>h.addEventListener('click',()=>openVehicleModal(h.textContent.trim())));
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeVehicleModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeVehicleModal();});
document.querySelector('#modalBookBtn')?.addEventListener('click',()=>{const name=modal?.dataset.vehicle;closeVehicleModal();const select=document.querySelector('#vehicleSelect');if(select&&name)select.value=name;document.querySelector('#booking')?.scrollIntoView({behavior:'smooth'});setTimeout(()=>document.querySelector('[name="name"]')?.focus(),450);});

// Replace fleet buttons with detail-first interaction while keeping booking flow.
document.querySelectorAll('.fleet-book').forEach(btn=>{btn.addEventListener('click',()=>openVehicleModal(btn.dataset.vehicle));});

// Booking request counter is intentionally local to this device; no fake global count.
const countKey='jbt_booking_request_count';
const countEl=document.querySelector('#requestCount');
let requestCount=Number(localStorage.getItem(countKey)||0);
if(countEl)countEl.textContent=`${requestCount} request${requestCount===1?'':'s'} sent from this device`;

// Scroll reveal animations.
const revealTargets=document.querySelectorAll('main section, .fleet-card, .service-card, .why-grid article, .gallery-grid figure, .testimonial-grid article, .faq-list details');
revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}}),{threshold:.08});revealTargets.forEach(el=>io.observe(el));}else revealTargets.forEach(el=>el.classList.add('visible'));

// Show a clear confirmation before opening WhatsApp.
const originalSubmit=bookingForm?.onsubmit;
bookingForm?.addEventListener('submit',()=>{
  requestCount++;localStorage.setItem(countKey,String(requestCount));
  if(countEl)countEl.textContent=`${requestCount} request${requestCount===1?'':'s'} sent from this device`;
  setTimeout(()=>{const status=document.querySelector('.booking-status strong');if(status)status.textContent='Booking request prepared for WhatsApp';},250);
});
