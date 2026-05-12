const DEFAULT_USERNAME = "adimin";
const DEFAULT_PASSWORD = "123456";
const AUTH_KEY = "guzheng-app-auth";

const form = document.getElementById("login-form");
const usernameInput = document.getElementById("login-username");
const passwordInput = document.getElementById("login-password");
const message = document.getElementById("login-message");

if (sessionStorage.getItem(AUTH_KEY) === "ok") {
  window.location.href = "./app.html";
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "ok");
    sessionStorage.setItem("guzheng-app-user", username);
    message.textContent = "登录成功，正在进入教学主控台...";
    window.setTimeout(() => {
      window.location.href = "./app.html";
    }, 260);
    return;
  }

  message.textContent = "账号或密码不正确，请使用初始账号重新登录。";
});
