import { getStepCountFromUser, userSteps} from './firebasedb.js';

// Function to get URL parameters by name
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get the user parameter from the URL
const selectedUser = getParameterByName('user');
console.log(selectedUser);

await getStepCountFromUser(selectedUser);

const stepCountText = document.getElementById("numberDisplay");
stepCountText.innerHTML = userSteps;
