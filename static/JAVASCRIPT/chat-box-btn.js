function toggle() {
    if (document.getElementById("chat-btn").value == "OFF") {
      document.getElementById("chat-btn").value = "ON";
    }
    else if (document.getElementById("chat-btn").value == "ON") {
      document.getElementById("chat-btn").value = "OFF";
    }
    if (document.getElementById("chat-btn").value == "ON") {
      document.getElementById("stick").className = "stick";
      console.log("this button is toggle on")
    }
    else if (document.getElementById("chat-btn").value == "OFF") {
      document.getElementById("stick").className = "hide";
      console.log("this button is toggle off")
    }
  }