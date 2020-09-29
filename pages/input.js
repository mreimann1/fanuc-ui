// This script controls the input container for the Fanuc UI

const SERVICE_URL = "http://127.0.0.1:8080/";
var lotNum; //initialize the lot number variable

function load_input() {
  const text = /*html*/ ` 
  <div class="container">
      <div class="col align-items-center d-flex flex-column">
        <div class="row-3 main-row">
          <h1>Enter Lot Number</h1>
        </div><br>
   
        <div class="form-group mx-sm-3 mb-2">
          <label for="lot-number" class="sr-only">Lot #</label>
          <input type="number" class="form-control" id="lot-number" placeholder="Lot #" maxlength="10" minlength="8">
        </div>
        <button class="btn btn-info mb-2" id="input-btn">Enter</button>
        <br>
        <p id="result"></p>
  
      </div>
  </div>
    `;
  document.getElementById("body").innerHTML = text;

  // Load testpoint page when enter button is clicked
  var inputBtn = document.getElementById("input-btn");
  inputBtn.addEventListener("click", function () {
    console.log("Enter btn clicked.");

    lotNum = document.getElementById("lot-number").value; //savelotnum
    let message = validateLotNum(lotNum);
  });
  fadeIn();
}

// Trigger a click of the enter btn when "Enter" key is pressed
document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Cancel the default form submittal
    document.getElementById("input-btn").click(); //click the button
  }
});

// Sends an API request to validate the lot number that the user gives
function validateLotNum(lotNum) {
  const body = { lotNum: lotNum };

  let validateLotNumURL = SERVICE_URL + "validatelotnum?lot_num=" + lotNum;
  // POST
  fetch(validateLotNumURL, {
    method: "POST",
    mode: "no-cors",
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (message) {
      console.log(message);
      handleMsg(message);
    });
}

// Handles the message sent back by the server
function handleMsg(message) {
  if (message == "True") {
    fadeOut(load_testpoint);
  } else {
    alert("Please enter a valid lot number.");
  }
  return;
}
