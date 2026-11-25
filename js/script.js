/* =====================================================
   JOHN LEE BIRTHDAY WEBSITE — JAVASCRIPT
   This file controls password, music, surprises and timers.
   ===================================================== */

/* 1. SETTINGS */
const WEBSITE_PASSWORD = "111524";

// November is month 10 in JavaScript (months start at 0).
const ANNIVERSARY_DATE = new Date(2024, 10, 15, 0, 0, 0);

/* 2. PASSWORD SCREEN */
const passwordForm = document.getElementById("passwordForm");
passwordForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("passwordInput");
  const error = document.getElementById("passwordError");

  if (input.value === WEBSITE_PASSWORD) {
    document.getElementById("gate").classList.add("hidden");
    document.getElementById("website").classList.remove("hidden");
    window.scrollTo(0, 0);
  } else {
    error.textContent = "Incorrect password. Try again ♡";
    input.value = "";
    input.focus();
  }
});

/* 3. MUSIC PLAYER */
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async function () {
  if (song.paused) {
    try {
      await song.play();
      musicButton.textContent = "♫ Pause our song";
    } catch (error) {
      musicButton.textContent = "Please add music.mp3";
    }
  } else {
    song.pause();
    musicButton.textContent = "♫ Play our song";
  }
});

/* 4. PHOTO LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

document.querySelectorAll(".photo-card").forEach(function (card) {
  const image = card.querySelector("img");

  image.addEventListener("error", function () {
    image.style.display = "none";
    card.querySelector(".placeholder").style.display = "grid";
  });

  card.addEventListener("click", function () {
    if (!image.complete || image.naturalWidth === 0) return;
    lightboxImage.src = card.dataset.src;
    document.getElementById("lightboxCaption").textContent = card.dataset.caption;
    lightbox.classList.remove("hidden");
  });
});

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
}
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeLightbox();
});

/* 5. FLIP CARD */
const flipCard = document.getElementById("flipCard");
const flipButton = document.getElementById("flipButton");
flipButton.addEventListener("click", function () {
  flipCard.classList.toggle("flipped");
  flipButton.textContent = flipCard.classList.contains("flipped") ? "Flip it back" : "Flip the card";
});

/* 6. OPEN SECRET LETTER */
const letterButton = document.getElementById("letterButton");
const secretLetter = document.getElementById("secretLetter");
letterButton.addEventListener("click", function () {
  secretLetter.classList.toggle("hidden");
  letterButton.textContent = secretLetter.classList.contains("hidden") ? "Open letter" : "Close letter";
});

/* 7. RANDOM REASON PICKER */
const reasonsList = [
  "You always make ordinary moments feel memorable.",
  "Your smile can always brighten my day.",
  "I love your determination basta naa kay gusto ma accomplish na butang.",
  "You have your own way of making people laugh.",
  "I appreciate the little things you do, especially kanang ga care ka sako.",
  "You are so appreciated john lee my love and i will be always proud of you."
];
document.getElementById("reasonButton").addEventListener("click", function () {
  const randomNumber = Math.floor(Math.random() * reasonsList.length);
  document.getElementById("reasonResult").textContent = reasonsList[randomNumber];
});

/* 8. ANNIVERSARY QUIZ */
document.querySelectorAll(".quiz-options button").forEach(function (button) {
  button.addEventListener("click", function () {
    const result = document.getElementById("quizResult");
    document.querySelectorAll(".quiz-options button").forEach(function (choice) {
      choice.disabled = true;
    });
    result.textContent = button.dataset.correct === "true"
      ? "Correct! November 15, 2024 — a date to remember. ♡"
      : "Not quite! Our anniversary is November 15, 2024. ♡";
  });
});

/* 9. VIRTUAL GIFT */
document.getElementById("giftButton").addEventListener("click", function () {
  const message = document.getElementById("giftMessage");
  const isOpening = message.classList.contains("hidden");
  message.classList.toggle("hidden", !isOpening);
  this.classList.toggle("open", isOpening);
  this.setAttribute("aria-expanded", String(isOpening));
  this.setAttribute("aria-label", isOpening ? "Close your birthday letter" : "Unwrap your birthday gift");
  document.getElementById("giftHint").textContent = isOpening
    ? "A little love, wrapped just for you ♡"
    : "Tap the present to unwrap your letter ♡";
});

/* 10. FLOATING HEART EFFECT */
document.getElementById("heartButton").addEventListener("click", function () {
  const symbols = ["♡", "♥", "✧", "❀"];
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";
    heart.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(heart);
    setTimeout(function () { heart.remove(); }, 4000);
  }
});

/* 11. POP-TO-REVEAL REASONS */
document.querySelectorAll(".reason-balloon").forEach(function (balloon) {
  balloon.addEventListener("click", function () {
    if (balloon.disabled) return;
    balloon.disabled = true;
    balloon.classList.add("popping");

    setTimeout(function () {
      balloon.classList.add("hidden");
      const card = balloon.closest(".reason-item").querySelector(".reason-card");
      card.classList.remove("hidden");
      card.setAttribute("tabindex", "-1");
      card.focus();
    }, 280);
  });
});

/* 11. ANNIVERSARY COUNT-UP TIMER
   Displays complete years, then remaining days, hours, minutes and seconds.
*/
function updateAnniversaryTimer() {
  const now = new Date();
  let years = now.getFullYear() - ANNIVERSARY_DATE.getFullYear();

  const anniversaryThisYear = new Date(
    now.getFullYear(),
    ANNIVERSARY_DATE.getMonth(),
    ANNIVERSARY_DATE.getDate()
  );

  if (now < anniversaryThisYear) years--;

  const lastAnniversary = new Date(
    ANNIVERSARY_DATE.getFullYear() + years,
    ANNIVERSARY_DATE.getMonth(),
    ANNIVERSARY_DATE.getDate()
  );

  let remaining = Math.max(0, now - lastAnniversary);
  const dayMs = 24 * 60 * 60 * 1000;
  const hourMs = 60 * 60 * 1000;
  const minuteMs = 60 * 1000;

  const days = Math.floor(remaining / dayMs);
  remaining %= dayMs;
  const hours = Math.floor(remaining / hourMs);
  remaining %= hourMs;
  const minutes = Math.floor(remaining / minuteMs);
  const seconds = Math.floor((remaining % minuteMs) / 1000);

  document.getElementById("years").textContent = years;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

/* 12. START TIMER */
updateAnniversaryTimer();
setInterval(updateAnniversaryTimer, 1000);

/* 13. INTERACTIVE BIRTHDAY CAKE */
const cakeSection = document.getElementById("cake");
const blowButton = document.getElementById("blowButton");
const relightButton = document.getElementById("relightButton");
const wishStatus = document.getElementById("wishStatus");

function celebrateWish() {
  const colors = ["#78a7da", "#5279a8", "#d79aab", "#ffd36d", "#a9c8eb"];
  for (let i = 0; i < 42; i++) {
    const spark = document.createElement("span");
    spark.className = "wish-spark";
    spark.style.left = (25 + Math.random() * 50) + "vw";
    spark.style.top = (35 + Math.random() * 25) + "vh";
    spark.style.background = colors[Math.floor(Math.random() * colors.length)];
    spark.style.setProperty("--spark-x", ((Math.random() - 0.5) * 280) + "px");
    spark.style.setProperty("--spark-y", (Math.random() * 230 - 60) + "px");
    document.body.appendChild(spark);
    setTimeout(function () { spark.remove(); }, 1900);
  }
}

blowButton.addEventListener("click", function () {
  if (cakeSection.classList.contains("cake-blown")) return;
  cakeSection.classList.add("cake-blown");
  wishStatus.textContent = "Wish made! May every beautiful thing find you. ♡";
  blowButton.classList.add("hidden");
  relightButton.classList.remove("hidden");
  celebrateWish();
});

relightButton.addEventListener("click", function () {
  cakeSection.classList.remove("cake-blown");
  wishStatus.textContent = "The candles are glowing for you ♡";
  relightButton.classList.add("hidden");
  blowButton.classList.remove("hidden");
});
