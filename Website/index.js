import { dbUsers, fetchUsersFromDatabase, getStepCountFromUser, } from './firebasedb.js';

document.addEventListener('DOMContentLoaded', async function() {

    await fetchUsersFromDatabase(); 

    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    const userList = document.getElementById('userList');
    const startButton = document.querySelector('.start-button');

    // Populate the user list from the dbUsers array
    dbUsers.forEach(userName => {
        const option = document.createElement('option');
        option.value = userName;
        option.text = userName;
        userList.appendChild(option);
    });

    const viewButtons = document.querySelectorAll('.button');

    function updateStartButtonState() {
        const viewSelected = Array.from(viewButtons).some(btn => btn.classList.contains('selected'));
        const userSelected = userList.value; // !== '';

        if (viewSelected && userSelected) {
            startButton.classList.add('active');
            startButton.disabled = false;
            selectedUser = userSelected;
        } else {
            startButton.classList.remove('active');
            startButton.disabled = true;
            selectedUser = null;
        }
    }

    let selectedUser = null;

    userList.addEventListener('change', updateStartButtonState);

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            updateStartButtonState();
        });
    });

    startButton.addEventListener('click', async function() {
        const selectedView = document.querySelector('.button.selected');

        if (selectedView) {
            let selectedViewName = selectedView.getAttribute('data-type');
            let targetURL = `${selectedViewName}_view.html?user=${encodeURIComponent(selectedUser)}`;
            window.location.href = targetURL;
        }
    });
});
