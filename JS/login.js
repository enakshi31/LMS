const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

showSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

showLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Handle user Sign Up
const signup = document.getElementById('signup');
const signupError = document.getElementById('signup-error');

signup.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        signupError.textContent = "Passwords do not match!";
        signupError.style.display = 'block';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("A user with this username already exists! Please choose a different username.");
        return;
    }

    const newUser = { username, password };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    signupError.style.display = 'none';
    alert("Sign up successful! You can now log in.");

    // Redirect to login form
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';

});

// Handle user Login
const login = document.getElementById('login');
const loginError = document.getElementById('login-error');

login.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Retrieve all users from localStorage and check for valid user
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.username === username && user.password === password);
    if (!user) {
        loginError.textContent = "Invalid username or password!";
        loginError.style.display = 'block';
        return;
    }

    loginError.style.display = 'none';

    sessionStorage.setItem('loggedIn', true);
    sessionStorage.setItem('loggedInUser', username);

    alert("Login successful! Welcome back " + sessionStorage.getItem('loggedInUser'));

    window.location.href = '../index.html';
});