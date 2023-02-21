class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.message = [];
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => this.toggleState(chatBox));

    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;

    if (this.state) {
      chatbox.classList.add("chatbox--active");
    } else {
      chatbox.classList.remove("chatbox--active");
    }
  }

  onSendButton(chatbox) {
    let textFiled = chatbox.querySelector("input");
    let text1 = textFiled.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.message.push(msg1);

    // 'http://127.0.0.1:5000/predict

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "Sam", message: r.answer };
        this.message.push(msg2);
        this.updateChartText(chatbox);
        textFiled.value = "";
      })
      .catch((error) => {
        console.log("Error", error);
        this.updateChartText(chatbox);
        textFiled.value = "";
      });
  }
}
