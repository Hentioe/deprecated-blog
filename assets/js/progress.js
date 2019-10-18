const ProgressBar = require("progressbar.js");

class Progress {
  constructor(elem) {
    this.bar = new ProgressBar.Line("#progressbar", {
      easing: "easeInOut",
      strokeWidth: 0.2,
      from: { color: "#FF450F" },
      to: { color: "#82FFFA" },
      step: function(state, circle, attachment) {
        circle.path.setAttribute("stroke", state.color);
      }
    });

    this.finished = this.finished.bind(this);
    this.connecting = this.connecting.bind(this);
    this.hidden = this.hidden.bind(this);
  }

  finished(duration = 500, timeout = 200) {
    if (this.bar.value() < 1) {
      this.bar.animate(1, {duration: duration}, () => {
        this.hidden(timeout);
      });
    } else {
      this.hidden(timeout);
    }
  }

  connecting(value = 0.25, duration = 200) {
    this.bar.animate(0.25, { duration: duration });
  }

  hidden(timeout = 200) {
    setTimeout(() => {
      this.bar.set(0);
    }, timeout);
  }
}

export default Progress;
