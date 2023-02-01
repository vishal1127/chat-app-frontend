window.addEventListener("DOMContentLoaded", loadData);
const userName = document.querySelector(".UserName");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
const localUserData = localStorage.getItem("User Details");
const token = localStorage.getItem("Authorization");
console.log("token", token);

async function loadData() {
  console.log("ushdeuhueh", localUserData);
}

async function sendMessage() {
  messageInput.reportValidity();
  if (messageInput.checkValidity()) {
    const message = { text: messageInput.value };
    try {
      const response = await axios.post(
        "http://localhost:3000/sendMessage",
        message,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (response) {
        messageInput.value = "";
      }
      console.log("reponse message", response);
    } catch (error) {
      console.log("Error:", error);
    }
  }
}
