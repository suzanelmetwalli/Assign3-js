var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var sitesContainer = [];
if (localStorage.getItem("Sites") != null) {
  sitesContainer = JSON.parse(localStorage.getItem("Sites"));
  displayData();
}

function addSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  if (ValidURL(siteUrlInput.value) == true) {
    if (!sitesContainer.find((e) => e.name === siteNameInput.value)) {
      sitesContainer.push(site);
      displayData();
      localStorage.setItem("Sites", JSON.stringify(sitesContainer));
      clearDate();
    } else {
      alert("Bookmark name already exists");
    }
  }
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < sitesContainer.length; i++) {
    cartona += `<tr>
        <td>${i}</td>
        <td>${sitesContainer[i].name}</td>
        <td><a href ="${sitesContainer[i].url}" class=" btn btn-sm btn-success">Visit</a></td>
        <td><button class="btn btn-sm btn-danger" onclick="deleteSite(${i})">Delete</button></td>
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function deleteSite(index) {
  sitesContainer.splice(index, 1);
  displayData();
  localStorage.setItem("Sites", JSON.stringify(sitesContainer));
}

function ValidURL(str) {
  var regex =
    /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    alert("Please enter valid URL.");
    return false;
  } else {
    return true;
  }
}

function clearDate() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}
