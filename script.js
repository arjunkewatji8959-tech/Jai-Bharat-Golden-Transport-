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
