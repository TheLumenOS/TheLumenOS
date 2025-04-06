// scripts.js

const terminalOutput = document.getElementById('output');
const userInput = document.getElementById('userInput');

// Array of valid commands
const commands = {
    'help': 'Available commands: help, clear, validate, documents, system, logout.',
    'clear': () => { 
        terminalOutput.innerHTML = '';
        return 'Terminal cleared.';
    },
    'validate': () => {
        // Example of interacting with the backend
        return validateKey();
    },
    'documents': () => {
        return 'Documents available: ReflectionsOfLight.txt, SystemLogs.txt';
    },
    'system': () => {
        return 'System check in progress... Please wait.';
    },
    'logout': () => {
        window.location.href = '/logout'; // Or reset to home page
        return 'Logging out...';
    }
};

// Function to handle user input
function handleUserInput() {
    const input = userInput.value.trim();
    if (input === '') return;

    displayOutput(`LumenOS:~$ ${input}`);

    // Check if the input is a valid command
    if (commands[input]) {
        const result = commands[input];
        if (typeof result === 'function') {
            displayOutput(result());
        } else {
            displayOutput(result);
        }
    } else {
        displayOutput(`command not found: ${input}`);
    }

    // Clear the input field
    userInput.value = '';
    userInput.focus();
}

// Function to display output in the terminal
function displayOutput(text) {
    const p = document.createElement('p');
    p.textContent = text;
    terminalOutput.appendChild(p);
    terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll
}

// Function to validate key (mock API call)
async function validateKey() {
    const enteredKey = userInput.value.trim();

    try {
        const response = await fetch('http://localhost:5000/check_key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: enteredKey })
        });
        const data = await response.json();

        if (data.status === 'success') {
            return `Access Granted: ${data.message}`;
        } else {
            return `Invalid Key: ${data.message}`;
        }
    } catch (error) {
        return 'ERROR: Unable to connect to the server.';
    }
}

// Listen for the Enter key and submit the command
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});
