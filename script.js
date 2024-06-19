document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const currentDateFormatted = formatDate(currentDate);
    document.getElementById('current-date').textContent = currentDateFormatted;
    document.getElementById('day-title').textContent = currentDateFormatted;

    // Initialize input fields with saved data if available
    const savedData = JSON.parse(localStorage.getItem('dayData')) || {};
    document.getElementById('note-input').value = savedData[currentDateFormatted]?.notes || '';
    document.getElementById('hours-input').value = savedData[currentDateFormatted]?.hours || '';

    // Save button click event
    document.getElementById('save-button').addEventListener('click', function() {
        const notes = document.getElementById('note-input').value;
        const hours = parseInt(document.getElementById('hours-input').value) || 0;

        // Save data to local storage
        savedData[currentDateFormatted] = { notes, hours };
        localStorage.setItem('dayData', JSON.stringify(savedData));

        // Update UI
        alert('Data saved successfully!');
    });

    // Previous day button click event
    document.getElementById('prev-day').addEventListener('click', function() {
        const previousDate = new Date(currentDate);
        previousDate.setDate(previousDate.getDate() - 1);
        const previousDateFormatted = formatDate(previousDate);

        // Update UI with previous day's data if available
        document.getElementById('day-title').textContent = previousDateFormatted;
        document.getElementById('note-input').value = savedData[previousDateFormatted]?.notes || '';
        document.getElementById('hours-input').value = savedData[previousDateFormatted]?.hours || '';
    });

    // View history button click event
    document.getElementById('view-history').addEventListener('click', function() {
        const historyPanel = document.getElementById('history-panel');
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';

        Object.keys(savedData).forEach(date => {
            const listItem = document.createElement('li');
            listItem.textContent = `${date}: Notes - ${savedData[date]?.notes}, Hours - ${savedData[date]?.hours}`;
            historyList.appendChild(listItem);
        });

        historyPanel.style.display = 'block';
    });

    // Close history button click event
    document.getElementById('close-history').addEventListener('click', function() {
        document.getElementById('history-panel').style.display = 'none';
    });
});

// Function to format date as "Month Day, Year"
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}
