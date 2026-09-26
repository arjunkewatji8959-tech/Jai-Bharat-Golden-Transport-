
const OWNER_WHATSAPP = "919691804027";

const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");
menuBtn?.addEventListener("click", () => navLinks?.classList.toggle("show"));
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => navLinks?.classList.remove("show"));
});

const routeBtn = document.querySelector("#routeBtn");
routeBtn?.addEventListener("click", () => {
  const from = document.querySelector("#routeFrom")?.value.trim();
  const to = document.querySelector("#routeTo")?.value.trim();
  const box = document.querySelector("#routeResult");
  if (!box) return;
  if (!from || !to) {
    box.hidden = false;
    box.textContent = "Please enter both pickup and delivery locations.";
    return;
  }
  box.hidden = false;
  box.innerHTML = `<strong>Route Enquiry:</strong> ${escapeHtml(from)} → ${escapeHtml(to)}<br>
  Contact our transport team on WhatsApp for vehicle availability and freight details.`;
});

const bookingForm = document.querySelector("#bookingForm");
bookingForm?.addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(bookingForm).entries());

  if (!data.date) {
    alert("Please select your pickup date before booking.");
    document.querySelector('[name="date"]')?.focus();
    return;
  }

  const pickupDate = new Date(`${data.date}T00:00:00`);
  const formattedDate = pickupDate.toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric"
  });

  const message = `Hello Jai Bharat Golden Transport,

I would like to book a vehicle.

Customer Name: ${data.name}
Mobile Number: ${data.phone}
Vehicle: ${data.vehicle}
Cargo Weight: ${data.ton} Ton
Pickup Location: ${data.pickup}
Delivery Location: ${data.delivery}
Goods Type: ${data.goods || "Not specified"}
Pickup Date: ${formattedDate}
Additional Details: ${data.message || "None"}

Please confirm vehicle availability, freight and booking details.`;

  window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

const dateInput = document.querySelector('[name="date"]');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[char]));
}
