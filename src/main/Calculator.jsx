import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState };

    clear() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return;
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + n;
        
        //Seta quando acaba a função
        this.setState({ displayValue, clearDisplay: false });

        if (n !== '.') {
            const floatDisplayValue = parseFloat(displayValue);        
            const values = this.state.values;
            
            values[this.state.current] = floatDisplayValue;
            this.setState({values});
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button content="AC" click={() => this.clear()} three></Button>
                <Button content="/" click={op => this.setOperation(op)} operation></Button>
                <Button content="7" click={digit => this.addDigit(digit)}></Button>
                <Button content="8" click={digit => this.addDigit(digit)}></Button>
                <Button content="9" click={digit => this.addDigit(digit)}></Button>
                <Button content="*" click={op => this.setOperation(op)} operation></Button>
                <Button content="4" click={digit => this.addDigit(digit)}></Button>
                <Button content="5" click={digit => this.addDigit(digit)}></Button>
                <Button content="6" click={digit => this.addDigit(digit)}></Button>
                <Button content="-" click={op => this.setOperation(op)} operation></Button>
                <Button content="1" click={digit => this.addDigit(digit)}></Button>
                <Button content="2" click={digit => this.addDigit(digit)}></Button>
                <Button content="3" click={digit => this.addDigit(digit)}></Button>
                <Button content="+" click={op => this.setOperation(op)} operation></Button>
                <Button content="0" click={digit => this.addDigit(digit)} two></Button>
                <Button content="." click={digit => this.addDigit(digit)}></Button>
                <Button content="=" click={op => this.setOperation(op)} operation></Button>
            </div>
        );
    }
}