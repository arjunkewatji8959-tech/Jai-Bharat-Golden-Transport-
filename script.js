const $ = (s) => document.querySelector(s);

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");
const dotsBtn = $("#dotsBtn");
const dotsMenu = $("#dotsMenu");

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("show"));
dotsBtn?.addEventListener("click", () => dotsMenu.classList.toggle("show"));
document.addEventListener("click", (e) => {
  if (!dotsMenu.contains(e.target) && e.target !== dotsBtn) dotsMenu.classList.remove("show");
});
document.querySelectorAll("#navLinks a, .dots-menu a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("show")));

const routeBtn = $("#routeBtn");
routeBtn?.addEventListener("click", () => {
  const from = $("#routeFrom").value.trim();
  const to = $("#routeTo").value.trim();
  const box = $("#routeResult");
  if (!from || !to) {
    box.hidden = false;
    box.textContent = "कृपया Pickup और Delivery दोनों location भरें।";
    return;
  }
  box.hidden = false;
  box.innerHTML = `<b>Route Enquiry:</b> ${escapeHtml(from)} → ${escapeHtml(to)}<br>
  इस route की vehicle availability और freight के लिए owner से WhatsApp पर बात करें।`;
});

$("#bookingForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget).entries());
  const message =
`नमस्ते जय भारत गोल्डन ट्रांसपोर्ट,

मुझे वाहन बुक करना है।

नाम: ${data.name}
मोबाइल: ${data.phone}
Vehicle: ${data.vehicle}
माल का वजन: ${data.ton} Ton
Pickup: ${data.pickup}
Delivery: ${data.delivery}
माल का प्रकार: ${data.goods || "नहीं बताया"}
Pickup Date: ${data.date || "जल्द"}
अतिरिक्त जानकारी: ${data.message || "नहीं है"}

कृपया vehicle availability और booking details बताएं।`;

  window.open(`https://wa.me/919691804027?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
$("#year").textContent = new Date().getFullYear();
