const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passInput = document.getElementById("password");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const alertMsgDiv = document.getElementById("alert-msg");

registerBtn?.addEventListener("click", registerUser);
loginBtn?.addEventListener("click", loginUser);

async function registerUser(e) {
  e.preventDefault();
  nameInput.reportValidity();
  emailInput.reportValidity();
  phoneInput.reportValidity();
  passInput.reportValidity();
  let alertMsg;
  if (
    nameInput.checkValidity() &&
    emailInput.checkValidity() &&
    phoneInput.checkValidity() &&
    passInput.checkValidity()
  ) {
    try {
      const userData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        password: passInput.value,
      };
      const response = await axios.post(
        "http://localhost:3000/createUser",
        userData
      );
      alertMsg = response.data.message;
      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      passInput.value = "";
    } catch (error) {
      console.log("Error:", error);
      alertMsg = error.response.data.message;
      alertMsgDiv.style.backgroundColor = "#ac1724";
    }
    alertMsgDiv.innerText = alertMsg;
    alertMsgDiv.style.display = "block";
    setTimeout(() => {
      alertMsgDiv.style.display = "none";
    }, 4000);
  }
}
async function loginUser(e) {
  e.preventDefault();
  emailInput.reportValidity();
  passInput.reportValidity();
  if (emailInput.checkValidity() && passInput.checkValidity()) {
    try {
      const userData = {
        email: emailInput.value,
        password: passInput.value,
      };
      const response = await axios.post(
        "http://localhost:3000/loginUser",
        userData
      );
      alertMsg = response.data.message;
      const { name, email } = response.data.user;
      const userDetails = {
        name: name,
        email: email,
      };
      localStorage.setItem("User Details", JSON.stringify(userDetails));
      localStorage.setItem("Authorization", response.data.token);
      location.href = "./pages/homepage.html";
    } catch (error) {
      console.log("Error:", error);
      alertMsg = error.response.data.message;
      alertMsgDiv.style.backgroundColor = "#ac1724";
    }
    alertMsgDiv.innerText = alertMsg;
    alertMsgDiv.style.display = "block";
    setTimeout(() => {
      alertMsgDiv.style.display = "none";
    }, 4000);
  }
}
