var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $resetFldBtn = document.querySelector("#resetFld");

$searchBtn.addEventListener("click", handleSearchButtonClick);
$resetFldBtn.addEventListener("click", resetInputFieldsButtonClick);

$(document).ready(function() {
  $('table').DataTable({
    "dom": '<"top">rt<"bottom"><"clear">', "pageLength": 50
  });
});

function resetInputFieldsButtonClick() {
  document.getElementById("search-form").reset();
}

var stateList = [];
var countryList = [];
var shapeList = [];

listData = dataSet.filter(function(data) {
  var dataState = data.state.toLowerCase();
  var dataCountry = data.country.toLowerCase();
  var dataShape = data.shape.toLowerCase();
  stateList.push(dataState)
  countryList.push(dataCountry)
  shapeList.push(dataShape)
});

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

stateList = stateList.filter(onlyUnique).sort();
countryList = countryList.filter(onlyUnique).sort();
shapeList = shapeList.filter(onlyUnique).sort();

var select = document.getElementById("state");
  
for (var i = 0; i < stateList.length; i++) {
  var opt = stateList[i];
  var ele = document.createElement("option");
  ele.textContent = opt;
  ele.value = opt;
  select.appendChild(ele);
}

var select = document.getElementById("country");

for (var i = 0; i < countryList.length; i++) {
  var opt = countryList[i];
  var ele = document.createElement("option");
  ele.textContent = opt;
  ele.value = opt;
  select.appendChild(ele);
}

var select = document.getElementById("shape");

for (var i = 0; i < shapeList.length; i++) {
  var opt = shapeList[i];
  var ele = document.createElement("option");
  ele.textContent = opt;
  ele.value = opt;
  select.appendChild(ele);
}

var filteredData = dataSet;

function renderTable() {
  totalRecords = 0,
  records = [],
  displayRecords = [],
  recPerPage = 50,
  page = 1,
  totalPages = 0;

  records = filteredData;
  totalRecords = records.length;
  totalPages = Math.ceil(totalRecords / recPerPage);

  apply_pagination();
}

var $pagination = $('.pagination');
var $pagination_tbody = $('tbody');

function apply_pagination() {
  if($pagination.data("twbs-pagination")){
    $pagination.twbsPagination('destroy');
    $pagination_tbody.twbsPagination('destroy');
  }

  $pagination.twbsPagination({
    totalPages: totalPages,
    visiblePages: 6,
    onPageClick: function (event, page) {
      displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
      endRec = (displayRecordsIndex) + recPerPage;
      
      if (endRec >= totalRecords) {
        endRec = totalRecords;
      }

      displayRecords = records.slice(displayRecordsIndex, endRec);

      generate_table();
    }
  });
}

function generate_table() {
  for (var i = 0; i < displayRecords.length; i++) {
    var data = displayRecords[i];
    var fields = Object.keys(data);
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

function handleSearchButtonClick() {
  var filterDatetime = $datetimeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  filteredData = dataSet.filter(function(data) {
    var dataDatetime = data.datetime.toLowerCase();
    var dataCity = data.city.toLowerCase();
    var dataState = data.state.toLowerCase();
    var dataCountry = data.country.toLowerCase();
    var dataShape = data.shape.toLowerCase();

  if (filterDatetime) {
    var filterDatetimeVal = dataDatetime === filterDatetime
  }
  else {
    var filterDatetimeVal = dataDatetime != filterDatetime
  }

  if (filterCity) {
    var filterCityVal = dataCity === filterCity
  }
  else {
    var filterCityVal = dataCity != filterCity
  }

  if (filterState) {
    var filterStateVal = dataState === filterState
  }
  else
  {
    var filterStateVal = dataState != filterState
  }

  if (filterCountry) {
    var filterCountryVal = dataCountry === filterCountry
  }
  else {
    var filterCountryVal = dataCountry != filterCountry
  }

  if (filterShape) {
    var filterShapeVal = dataShape === filterShape
  }
  else {
    var filterShapeVal = dataShape != filterShape
  }

  return ((filterDatetimeVal) && (filterCityVal) && (filterStateVal) && (filterCountryVal) && (filterShapeVal));
  });

  renderTable();
}

renderTable();