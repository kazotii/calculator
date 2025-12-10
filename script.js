const calculatorButtons = document.querySelector('.calculator-buttons')
let displayValue = '0';
let firstNumber = ''
let secondNumber = ''
let currentOperator = ''
let calculationResult = document.querySelector('.calculation-result');
function updateDisplay() {
    calculationResult.textContent = displayValue;
}
function handleInput(value, type) {
    if (type === 'number') {
        if (currentOperator === '') {
            if (value === '.' && displayValue.includes('.')) {
                return
            }
        }
        if (currentOperator !== '') {
            indexOperator = displayValue.indexOf(currentOperator);
            secondPart = displayValue.slice(indexOperator + 1);
            if (value === '.' && secondPart.includes('.')){
                return
            }
        }
        if (displayValue === '0' && value === '.') {
            displayValue = '0.'
        }
        else if (displayValue === '0') {
            displayValue = value
        }
        else {
            displayValue += value
        }
    }
    else if(type === 'action'){
        if(value === 'RESET'){
            displayValue = '0'
            firstNumber = ''
            secondNumber = ''
            currentOperator = ''
        }
        else if(value === 'DEL'){
            if (displayValue === '0') {
                return
            }
            else if(displayValue.length > 1){
                const lastChar = displayValue[displayValue.length - 1];
                if (lastChar === currentOperator) {
                    currentOperator = ''
                }
                displayValue = displayValue.slice(0, -1)
            }
            else{
                displayValue = '0'
            }
        }
    }
    else if (type === 'operator'){
        if (value === '=') {
            if (currentOperator === '') {
                return
            }
            indexOperator = displayValue.indexOf(currentOperator);
            secondPart = displayValue.slice(indexOperator + 1);
            if(secondPart === '') {
                return
            }
            else {
                secondNumber = Number(secondPart)
            }
            switch (currentOperator) {
                case '+':
                    result = firstNumber + secondNumber;
                    break;
                case '-':
                    result = firstNumber - secondNumber;
                    break;
                case 'x':
                    result = firstNumber * secondNumber;
                    break;
                case '/':
                    result = firstNumber / secondNumber;
                    break;
            }
            displayValue = Number(result)
            firstNumber = ''
            secondNumber = ''
            currentOperator = ''
        }
        else if (currentOperator === '') {
            firstNumber = Number(displayValue)
            currentOperator = value
            displayValue += currentOperator
        }
        else if (currentOperator !== '' && value !== '=') {
            indexOperator = displayValue.indexOf(currentOperator);
            secondPart = displayValue.slice(indexOperator + 1);
            if (secondPart === '') {
                currentOperator = value;
                displayValue = displayValue.slice(0, indexOperator) + value;
            }
            if (secondPart !== '') {
                secondNumber = Number(secondPart)
                switch (currentOperator) {
                    case '+':
                        result = firstNumber + secondNumber;
                        break;
                    case '-':
                        result = firstNumber - secondNumber;
                        break;
                    case 'x':
                        result = firstNumber * secondNumber;
                        break;
                    case '/':
                        result = firstNumber / secondNumber;
                        break;
                }
                firstNumber = result
                secondNumber = ''
                currentOperator = value
                displayValue = result + currentOperator
            }
        }
    }
}
calculatorButtons.addEventListener(('click'), (event) => {
    const target = event.target;
    const value = target.textContent;
    const type = target.dataset.type
    if (target.tagName === 'BUTTON'){
        handleInput(value, type)
    }
    updateDisplay()
})
document.addEventListener('keydown', (event) => {
    const key = event.key;
    let value = '';
    let type = '';
    if (key >= '0' && key <= '9'){
        value = key;
        type = 'number';
    }
    else if (key === '.') {
        value = '.';
        type = 'number';
    }
    else if (key === '+') {
        value = '+';
        type = 'operator';
    }
    else if (key === '-') {
        value = '-';
        type = 'operator';
    }
    else if (key === '/') {
        value = '/';
        type = 'operator';
    }
    else if (key === '*') {
        value = 'x';
        type = 'operator';
    }
    else if (key === 'Enter') {
        value = '=';
        type = 'operator';
    }
    else if (key === 'Backspace') {
        value = 'DEL';
        type = 'action';
    }
    else if (key === 'Backspace') {
        value = 'DEL';
        type = 'action';
    }
    else if (key === 'Escape') {
        value = 'RESET';
        type = 'action';
    }
    if(value && type) {
        handleInput(value, type);
        updateDisplay()
    }
})
