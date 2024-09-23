const log = document.getElementById('log');
const community = document.getElementById('community');
const contentArea = document.getElementById('content-area');

log.addEventListener('click', () => {
    contentArea.innerHTML = `
        <div id="log-content">
            <p id="date-display">
                <span id="selected-date" style="cursor: pointer;"><2024년 7월></span>
            </p>

            <div id="edit-fields" style="display: none;">
                <label for="year">년도:</label>
                <input type="number" id="year" value="2024" min="2000" max="2099">
                <label for="month">월:</label>
                <input type="number" id="month" value="7" min="1" max="12">
                <button id="save-button">저장</button>
            </div>
        </div>
    `;

    const selectedDate = document.getElementById('selected-date');
    const editFields = document.getElementById('edit-fields');
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const saveButton = document.getElementById('save-button');

    selectedDate.addEventListener('click', () => {
        editFields.style.display = 'block';  // Show the input fields
    });

    saveButton.addEventListener('click', () => {
        const year = yearInput.value;
        const month = monthInput.value;
        selectedDate.textContent = `${year}년 ${month}월`;  // Update the selected date
        editFields.style.display = 'none';  // Hide the input fields
    });
});

community.addEventListener('click', () => {
    contentArea.innerHTML = '<p>커뮤니티 내용이 여기 들어갑니다.</p>';  // Change to desired content
});
