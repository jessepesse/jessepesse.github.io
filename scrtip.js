var span = document.getElementById("time");

function time() {
  let d = new Date();
  let s = d.getSeconds();
  let m = d.getMinutes();
  let h = d.getHours();
  let n = d.getTimezoneOffset();
  if (s < 10) {
    s = "0" + s;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (h < 10) {
    h = "0" + h;
  }
  span.textContent = h + ":" + m + ":" + s;
}

setInterval(time, 1000);
