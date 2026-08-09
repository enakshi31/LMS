// Constructor function for creating a question object

const home = document.getElementById('home');

home.addEventListener('click', () => {
    window.location.href = '../index.html';
});

function Question(text, tags, status, difficulty) {
    this.text = text;
    this.tags = tags;
    this.status = status;
    this.difficulty = difficulty;
    this.createdAt = new Date().toLocaleDateString();
}

let editIndex = null;

function saveQuestion(question) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const questions = JSON.parse(localStorage.getItem('questions')) || [];

            if (editIndex !== null) {
                questions[editIndex] = question;
                editIndex = null;
            } else {
                questions.push(question);
            }

            localStorage.setItem('questions', JSON.stringify(questions));
            resolve('Question saved!');
        }, 500);
    });
}

function getQuestions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const questions = JSON.parse(localStorage.getItem('questions')) || [];
            resolve(questions);
        }, 500);
    });
}

function deleteQuestion(index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const questions = JSON.parse(localStorage.getItem('questions')) || [];
            questions.splice(index, 1);
            localStorage.setItem('questions', JSON.stringify(questions));
            resolve('Question deleted!');
        }, 500);
    });
}

function renderQuestions(questions) {
    const questionList = document.getElementById('question-list');
    questionList.innerHTML = '';

    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        let solvedColor = 'white';
        let difficultyColor;

        if (question.difficulty === 'Easy') {
            difficultyColor = 'green';
        } else if (question.difficulty === 'Medium') {
            difficultyColor = 'yellow';
        } else if (question.difficulty === 'Hard') {
            difficultyColor = 'red';
        }

        if (question.status === 'Solved') {
            solvedColor = 'green';
        }
        else if (question.status === 'Attempted') {
            solvedColor = 'yellow';
        }

        row.innerHTML = `
        <td>${index + 1}</td>
        <td style="color: ${solvedColor};">${question.status}</td>
        <td>${question.text}</td>
        <td>${question.tags.join(', ')}</td>
        <td style="color: ${difficultyColor};">${question.difficulty}</td>
        <td class="action-buttons">
          <button onclick="editQuestion(${index})">Edit</button>
          <button onclick="removeQuestion(${index})">Delete</button>
        </td>
      `;

        questionList.appendChild(row);
    });
}

function loadQuestions() {
    getQuestions().then((questions) => {
        renderQuestions(questions);
    });
}

function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function editQuestion(index) {
    getQuestions().then((questions) => {
        const question = questions[index];

        document.getElementById('question-text').value = question.text;
        document.getElementById('question-tags').value = question.tags.join(', ');
        document.getElementById('question-status').value = question.status;
        document.getElementById('question-difficulty').value = question.difficulty;

        document.getElementById('form-heading').innerText = 'Edit Question';
        document.getElementById('submit-button').innerText = 'Save Changes';

        editIndex = index;

        smoothScrollTo(document.getElementById('question-form-section'));
    });
}

document.getElementById('question-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const text = document.getElementById('question-text').value;
    const tags = document.getElementById('question-tags').value.split(',').map(tag => tag.trim());
    const status = document.getElementById('question-status').value;
    const difficulty = document.getElementById('question-difficulty').value;

    const newQuestion = new Question(text, tags, status, difficulty);

    saveQuestion(newQuestion).then(() => {
        loadQuestions();

        document.getElementById('form-heading').innerText = 'Add New Question';
        document.getElementById('submit-button').innerText = 'Add Question';
        document.getElementById('question-form').reset();

        const rowToScrollTo = document.querySelector(`#question-list tr:nth-child(${editIndex + 1})`);
        if (rowToScrollTo) {
            smoothScrollTo(rowToScrollTo);
        }
    });
});

function removeQuestion(index) {
    deleteQuestion(index).then(() => {
        loadQuestions();
    });
}

loadQuestions();