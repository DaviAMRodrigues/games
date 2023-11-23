document.getElementById('btnA').addEventListener('click', () => simulateKeyPress('a'));
document.getElementById('btnD').addEventListener('click', () => simulateKeyPress('d'));
document.getElementById('btnW').addEventListener('click', () => simulateKeyPress('w'));

// Define a function to simulate key presses
function simulateKeyPress(key) {
    const event = new KeyboardEvent('keydown', { key: key });
    window.dispatchEvent(event);
    console.log('a')
}