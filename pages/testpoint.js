// This script controls the tespoint page for the Fanuc UI

const NUM_READINGS = 98
var testpoints // This variable holds the numbers of the testpoints that are selected

function load_testpoint() {
  fadeIn()
  const text = /*html*/ ` 
    <div class="container">
        <div class="col align-items-center d-flex flex-column">
          <div class="row-3 main-row">
            <h1>Select Test Points</h1>
          </div>

          <form method="POST" class="form-inline">
            <div class="row">
                <div class="col-9">
                    <div class="form-group mx-sm-3 mb-2 scrollbox" id="scrollbox">
                        ${renderBoxes(NUM_READINGS)}
                    </div>
                </div>
                <div class="col-3">
                    <button onclick="{return false}" class="btn btn-sm btn-warning select-all mb-2" id="select-all"> Select All </button>
                    <button onclick="{return selectAll(false)}" class="btn btn-sm btn-warning deselect-all" id="deselect-all"> Deselect All </button>
                </div>
            </div>
            <button class="btn btn-info btn-lg btn-block mb-2" id="run-test">Run Test</button>    
          </form>
      </div>
    </div>
      `
  document.getElementById('body').innerHTML = text

  testpoints = ''

  // Load status page when run test button is clicked
  var runTestButton = document.getElementById('run-test')
  runTestButton.addEventListener('click', function (e) {
    console.log('Run Test btn clicked.')
    // Save values of checkboxes to session storage
    saveBoxes()
    startJob()
    fadeOut(load_status)
    e.preventDefault() // To prevent the page from reloading and going back to the start
  })

  // Add functionality to SelectAll button
  var selectAllBtn = document.getElementById('select-all')
  selectAllBtn.addEventListener('click', function () {
    console.log('SelectAll btn clicked.')
    selectAll(true)
  })
}

// Returns HTML for a given number of boxes
function renderBoxes(count) {
  var boxes = ''
  for (var i = 0; i < count; i++) {
    if (i == count / 2) {
      boxes += `<br>
      `
    }
    boxes += `
    <div class="testpoint-box">
        <input name="testpoint-box" type="checkbox" id="ch${i + 1}" name="ch${
      i + 1
    }" value="ch${i + 1}">
        <label class="put-left" for="ch${i + 1}">   CH${i + 1}</label> 
    </div>`
  }
  return boxes
}

// A function to select/deselect all of the text boxes
// Argument: boolean "checkAll" if true, sets all boxes to checked
//          if false, sets all boxes to unchecked
function selectAll(checked) {
  const checkboxes = document.getElementsByName('testpoint-box')
  const n = checkboxes.length
  for (var i = 0; i < n; i++) {
    checkboxes[i].checked = checked
  }
  if (checked) {
    console.log('All boxes selected.')
  } else {
    console.log('All boxes deselected.')
  }
  return false
}

// Saves the numbers of the testpoints selected
// Iterates through each testpoint box and saves the index of the checked boxes
function saveBoxes() {
  const checkboxes = document.getElementsByName('testpoint-box')
  const n = checkboxes.length
  for (var i = 0; i < n; i++) {
    if (checkboxes[i].checked) {
      testpoints += `${i + 1},`
    }
  }
  testpoints = testpoints.substring(0, testpoints.length - 1) // Remove the last comma
}

// Makes the service call which will start the job
function startJob() {
  var startJobURL =
    SERVICE_URL + `startjob?lot_num=${lotNum}&job_str="${testpoints}"`
  console.log('startJobURL: ', startJobURL)
  fetch(startJobURL).then((res) =>
    res.text().then((message) => handleStartJob(message)),
  )
}

// Handles the result of a fetch call
// Prints the text to console (for debugging purposes)
function handleStartJob(text) {
  console.log('text: ' + text)
}
