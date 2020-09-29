// This script controls the begin page for the Fanuc UI

function load_begin() /*html*/ {
  const text = `  <div class="container">
  <div class="col align-items-center d-flex flex-column">
  <br>
  <div class="row-3 main-row">
  <img id="nextflex-logo" src="./img/logo_large.png" alt="nextflex logo">
  </div><br>
  <div class="row-3 main-row">
    <h1>Welcome to The Fanuc</h1>
  </div>
      <button class="btn btn-info btn-lg btn-block" type="button" id="begin-btn">Begin</button>
    </div><br>
  </div>
</div>`;
  document.getElementById("body").innerHTML = text;
  console.log("Begin page loaded.");
  fadeIn();
}

// Provides a smooth fade-in transition for the body element
function fadeIn() {
  mainText = document.getElementById("body");
  mainText.style.opacity = 0; // Initialize the element as not visible

  var val = 0;
  var id = setInterval(fadeInStep, 2.5);
  function fadeInStep() {
    if (val >= 1) {
      clearInterval(id);
    } else {
      val = val + 0.01;
      mainText.style.opacity = val;
    }
  }
}

// Provides a smooth fade-out transition and allows you to load the next page
// Argument load_page is a function to load the next page
function fadeOut(load_page) {
  mainText = document.getElementById("body");

  var out = 1;
  var id2 = setInterval(frame, 2.5);
  function frame() {
    if (out <= 0) {
      clearInterval(id2);
      load_page();
    } else {
      out = out - 0.01;
      mainText.style.opacity = out;
    }
  }
}

load_begin();
