import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { collection, doc, getDoc, getDocs } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

const firebaseConfig = {
// enter your api ids here
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let dbUsers = [];
let userSteps = 0;


async function fetchUsersFromDatabase() {
  const querySnapshot = await getDocs(collection(db, "StepCount"));
  querySnapshot.forEach((doc) => {
    dbUsers.push(doc.id);
  });
}

async function getStepCountFromUser(selectedUser) {
  const docRef = doc(db, "StepCount", selectedUser);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    userSteps = docSnap.data().steps.currentStepCount;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export { dbUsers, fetchUsersFromDatabase, getStepCountFromUser, userSteps};