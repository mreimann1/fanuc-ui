// This script controls the summary page for the Fanuc UI

const fastcsv = require("fast-csv"); // For formatting files as csv
const fs = require("fs"); // For writing files to memory

function load_summary() {
  fadeIn();
  const text = /*html*/ ` 
      <div class="container">
          <div class="col align-items-center d-flex flex-column">
            <div class="row-3 main-row">
              <h1>Summary:</h1>
            </div><br>
       
            <div class="status-field" id="status-field">
              <table class="table" id="status-table">
              </table>
            </div>
            <button class="btn btn-warning btn-block" id="save-to-csv">Save to CSV</button>
            <button class="btn btn-info btn-block" id="done">Done</button>    
      </div>
        `;
  document.getElementById("body").innerHTML = text;

  // Save to CSV
  var saveToCSVButton = document.getElementById("save-to-csv");
  saveToCSVButton.addEventListener("click", function () {
    console.log("Save to CSV btn clicked.");
    saveToCSV();
  });

  // Load input page
  var retestButton = document.getElementById("done");
  retestButton.addEventListener("click", function () {
    console.log("Retest btn clicked.");
    load_input();
  });

  renderSummary();
}

// A function to render the list of passes or fails
function renderSummary() {
  document.getElementById("status-table").innerHTML = resultTable.innerHTML;
  // Set inner HTML of the status field to the result table
}

// Formats and
function saveToCSV() {
  const ws = fs.createWriteStream("summary.csv");

  var rowsAsNodes = document.querySelectorAll("table tr"); // Get table rows as node objects
  var rows = []; // Initiate an empty array for the rows to go in

  // Loop through each row of nodes and fill 'rows' with the inner text of the nodes
  for (var i = 0; i < rowsAsNodes.length; i++) {
    var entries = rowsAsNodes[i].querySelectorAll("td, th"); // Get the table entries
    var row = []; // Initiate an empty array for the inner text to go in

    // Loop through the entries and push their text to 'row'
    for (var j = 0; j < entries.length; j++) {
      row.push(entries[j].innerText);
    }

    rows.push(row); // Push row to rows
  }
  // Write rows to csv
  fastcsv
    .write(rows, { delimiter: ",", rowDelimiter: "\n", headers: true })
    .pipe(ws);
}
