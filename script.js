// script.js

// توليد بريد إلكتروني عشوائي
function generateEmail() {
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${randomString}@temp-mail.com`;
}

// نسخ النص إلى الحافظة
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("تم نسخ البريد الإلكتروني إلى الحافظة!");
  });
}

// التعامل مع زر إنشاء البريد
document.getElementById("generate-email").addEventListener("click", () => {
  const email = generateEmail();
  const emailDisplay = document.getElementById("email-display");
  const emailAddress = document.getElementById("email-address");

  emailAddress.textContent = email;
  emailDisplay.classList.remove("hidden");
});

// التعامل مع زر النسخ
document.getElementById("copy-email").addEventListener("click", () => {
  const email = document.getElementById("email-address").textContent;
  copyToClipboard(email);
});
document.getElementById("check-messages").addEventListener("click", () => {
  const email = document.getElementById("email-address").textContent;
  fetch(`/api/messages/${email}`)
    .then((response) => response.json())
    .then((data) => {
      const messageList = document.getElementById("message-list");
      messageList.innerHTML = "";

      if (data.length === 0) {
        messageList.innerHTML = "<li>لا توجد رسائل مستلمة</li>";
      } else {
        data.forEach((message) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>الموضوع:</strong> ${message.subject} <br>
            <strong>الرسالة:</strong> ${message.body}
          `;
          messageList.appendChild(listItem);
        });
      }

      document.getElementById("messages").classList.remove("hidden");
    })
    .catch((error) => console.error("خطأ في جلب الرسائل:", error));
});
