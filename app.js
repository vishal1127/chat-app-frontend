window.addEventListener("DOMContentLoaded", loadData);
const userName = document.querySelector(".UserName");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
const chatListData = document.getElementById("chat-list-data");
const signOutBtn = document.getElementById("signout-btn");

sendBtn.addEventListener("click", sendMessage);
signOutBtn.addEventListener("click", signOutUser);
const localUserData = localStorage.getItem("User Details");
const token = localStorage.getItem("Authorization");

async function loadData() {
  try {
    const allChats = await axios.get("http://localhost:3000/getAllChats", {
      headers: {
        authorization: token,
      },
    });
    chatListData.innerHTML = "";
    listChats(allChats.data.chats);
  } catch (error) {
    console.log("Error", error.response.data.message);
  }
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
      loadData();
      console.log("reponse message", response);
    } catch (error) {
      console.log("Error:", error.response.data.message);
    }
  }
}

async function listChats(chats) {
  chats.forEach((chat) => {
    chatListData.innerHTML += `<li class="list-group-item"><b>${chat.from}:</b> ${chat.text}</li>`;
  });
}

function signOutUser() {
  console.log("called signout");
  localStorage.clear();
  location.href = "http://127.0.0.1:5500/chat-app-frontend/index.html";
  token = "";
}
