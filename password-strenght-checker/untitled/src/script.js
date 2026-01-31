window.addEventListener("DOMContentLoaded", () => {
  const password = document.getElementById("password");
  const strengthBar = document.getElementById("strength");
  const message = document.getElementById("message");
  const tips = document.querySelectorAll("#tips li");
  const showPassword = document.getElementById("showPassword");

  if (!(showPassword && password && strengthBar && message && tips.length === 4)) return;

  // إظهار / إخفاء كلمة المرور
  showPassword.addEventListener("change", () => {
    password.type = showPassword.checked ? "text" : "password";
  });

  // التحقق من التكرار المتكرر (>2)
  function hasTooManyRepeats(str) {
    return /(.)\1{2,}/.test(str);
  }

  password.addEventListener("input", () => {
    const val = password.value;
    let score = 0;

    // طول ≥8
    if (val.length >= 8) {
      score++;
      tips[0].textContent = "✔ على الأقل 8 أحرف";
    } else {
      tips[0].textContent = "❌ على الأقل 8 أحرف";
    }

    // خليط الحروف الكبيرة والصغيرة
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) {
      score++;
      tips[1].textContent = "✔ خليط من الحروف الكبيرة والصغيرة";
    } else {
      tips[1].textContent = "❌ خليط من الحروف الكبيرة والصغيرة";
    }

    // أرقام
    if (/[0-9]/.test(val)) {
      score++;
      tips[2].textContent = "✔ يحتوي على رقم (0-9)";
    } else {
      tips[2].textContent = "❌ يحتوي على رقم (0-9)";
    }

    // رموز خاصة
    if (/[^A-Za-z0-9]/.test(val)) {
      score++;
      tips[3].textContent = "✔ يحتوي على رمز خاص (!@#$%^&*)";
    } else {
      tips[3].textContent = "❌ يحتوي على رمز خاص (!@#$%^&*)";
    }

    // عقوبة للتكرار المتكرر
    if (hasTooManyRepeats(val)) {
      score = Math.max(score - 1, 0);
    }

    // التقييم الممتاز: طول ≥12 وكل الشروط مستوفاة بدون تكرار
    let veryStrong = val.length >= 12 &&
                     /[A-Z]/.test(val) && /[a-z]/.test(val) &&
                     /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val) &&
                     !hasTooManyRepeats(val);

    // تحديث شريط القوة
    let percent = (score / 4) * 100;
    strengthBar.style.width = percent + "%";

    // تدرج الألوان حسب القوة
    let gradient;
    if (score <= 1) gradient = "linear-gradient(to right, #ff4d4d, #ff6666)";
    else if (score === 2) gradient = "linear-gradient(to right, #ffb84d, #ffcc66)";
    else if (score === 3) gradient = "linear-gradient(to right, #ffff66, #ccff66)";
    else gradient = veryStrong ? "linear-gradient(to right, #00ff99, #00cc66)" : "linear-gradient(to right, #66ff66, #33cc33)";
    strengthBar.style.background = gradient;

    // الرسائل
    if (score <= 1) message.textContent = "ضعيفة جدًا 🔴";
    else if (score === 2) message.textContent = "متوسطة 🟠";
    else if (score === 3) message.textContent = "جيدة 🟡";
    else message.textContent = veryStrong ? "ممتازة جدًا 🔥💎" : "قوية 🟢";
  });
});
