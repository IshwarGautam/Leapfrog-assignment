const app = document.querySelector("#app");

class shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.element = document.createElement("div");
    this.element.style.width = "8%";
    this.element.style.height = "15%";
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "%";
    this.element.style.position = "absolute";
    this.element.style.borderRadius = "50%";
    this.element.style.background = "#292";
    this.counter = false;

    app.appendChild(this.element);

    this.element.addEventListener("click", this.setToggled.bind(this));
  }

  setToggled() {
    this.counter=!this.counter;
    this.element.style.background = this.counter?"#01a2e8":"#292";
  }
}

const c1 = new shape(60, 40);
