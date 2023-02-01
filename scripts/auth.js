const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passInput = document.getElementById("password");
const registerBtn = document.getElementById("register");
const alertMsgDiv = document.getElementById("alert-msg");

registerBtn?.addEventListener("click", registerUser);

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
