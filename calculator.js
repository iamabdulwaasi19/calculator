

    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalToButton = document.getElementById('equals');
    const clearButton = document.getElementById('clear');
    const memoryButton = document.getElementById('memory');
    const decimalButton = document.getElementById('decimal');

    let currentDisplay = '0';
    let memory = null;
    let operation = null;
    let resetDisplay = false;

    // Update the display
    function updateDisplay() {
        display.textContent = currentDisplay;
    }

    // Handle number button clicks
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Number clicked');
            const number = button.getAttribute('data-number');
            if (currentDisplay === '0' || resetDisplay) {
                currentDisplay = number;
                resetDisplay = false;
            } else {
                currentDisplay += number;
            }
            updateDisplay();
        });
    });

    // Handle operation button clicks
    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const op = button.getAttribute('data-operation');
            const current = parseFloat(currentDisplay);
            if (memory === null) {
                memory = current;
            } else if (operation) {
                const result = calculate(memory, current, operation);
                memory = result;
                currentDisplay = String(result);
                updateDisplay();
            }

            operation = op;
            resetDisplay = true;
        });
    });

    // Handle equals button click
    equalToButton.addEventListener('click', () => {
        if (!operation || memory === null)
            return;
        const current = parseFloat(currentDisplay);
        const result = calculate(memory, current, operation);

        currentDisplay = String(result);
        memory = null;
        operation = null;
        resetDisplay = true;

        updateDisplay();
    });

    // Handle decimal button click 
    decimalButton.addEventListener('click', () => {
        if (resetDisplay) {
            currentDisplay = '0';
            resetDisplay = false;
        } else if (!currentDisplay.includes('.')) {
            currentDisplay += '.';
        }

        updateDisplay();
    });

    // Handle clear button click
    clearButton.addEventListener('click', () => {
        currentDisplay = '0';
        memory = null;
        operation = null;
        resetDisplay = false;

        updateDisplay();
    });

    // Handle memory clear button click
    memoryButton.addEventListener('click', () => {
        memory = null;
    });

     // Calculate the result based on the operation
    function calculate(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            case '%': return (a * b) / 100;
            default: return b;
        }
    };