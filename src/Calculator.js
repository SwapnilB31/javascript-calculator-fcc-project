import React from 'react'
import './Calculator.css'
import {isNum,isOperator,evalExpr, oneOperatorBefore} from './Util'

class Calculator extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            input : '0',
            expression : '',
            negativeNum : false
        }
        this.inputNum = this.inputNum.bind(this)
        this.inputOperator = this.inputOperator.bind(this)
        this.inputDecimal = this.inputDecimal.bind(this)
        this.evaluate = this.evaluate.bind(this)
        this.reset = this.reset.bind(this)
    }

    inputNum(num) {
        if(this.state.input === "0") {
            this.setState({
                input : num
            })
        }
        else if(isNum(this.state.input)) {
            this.setState(state => {
                return {
                    input : state.input + num
                }
            })
        }
        else if(isOperator(this.state.input)) {
            if(this.state.negativeNum) {
                this.setState(state => {
                    return {
                        input : '-' + num,
                        negativeNum : false
                    }
                })
            }
            else {
                this.setState(state => {
                    return {
                        expression : state.expression + ' ' + state.input,
                        input : num,
                        negativeNum : false
                    }
                })
            }
        }
    }

    inputOperator(operator) {
        console.log("inputOperator")
        if(this.state.input === "0" && operator === "-") {
            this.setState({
                negativeNum : true,
                input : operator
            })
        } 
        else if(isNum(this.state.input)) {
            this.setState(state => {
                return {
                    expression : state.expression + ' ' + state.input,
                    input : operator
                }
            })
        }
        if(isOperator(this.state.input)) {
            if(operator === '-') {
                this.setState(state => {
                    console.log(`oneOperatorBefore(${state.expression}) = ${oneOperatorBefore(state.expression)}`)
                    if(oneOperatorBefore(state.expression))
                    return {
                        negativeNum : true,
                        expression : state.expression + ' ' + state.input,
                        input : operator,
                    }
                    else return {
                        negativeNum : false
                    } 
                })
            
            }
            else {
                if(this.state.negativeNum) {
                    this.setState(state => {
                        return {
                            negativeNum : false,
                            expression : state.expression.slice(0,state.expression.length-1),
                            input : operator
                        }
                    })
                }
                else {
                    this.setState(state => {
                        return {
                            negativeNum : false,
                            input : operator
                        }
                    })
                }   
            }
        }
    }

    inputDecimal() {
        console.log("inside input decimal")
        console.log(this.state)
        if(isNum(this.state.input)) {
            if(this.state.input.indexOf('.') === -1) {
                this.setState(state =>({
                    input : state.input + '.'
                }))
            }
        }
        if(isOperator(this.state.input)) {
            this.setState(state => ({
                expression : state.expression + state.input,
                input : '0.'
            }))
        }
    }

    evaluate() {
        console.log("inside evaluate")
        if(isNum(this.state.input)) {
            /*this.setState((state,callback) => {
                const exp = state.expression + state.input
                const result = eval(exp)
                callback(result)
                
            },(result) => {
                this.setState(state => ({
                    input : result,
                    expression : ''
                }))
            })*/
            const exp = this.state.expression + ' ' + this.state.input
            let result = eval(exp)
            if(result.toString().length > 13) {
                result = parseFloat(parseFloat(result).toPrecision(12))
            }
            this.setState({
                input : result.toString(),
                expression : ''
            })
        }
        if(isOperator(this.state.input)) {
            let result = eval(this.state.expression)
            if(result.toString().length > 13) {
                result = parseFloat(parseFloat(result).toPrecision(12))
            }
            this.setState({
                input : result.toString(),
                expression : ''
            })
        }
    }

    reset() {
        this.setState({
            input : '0',
            expression : ''
        })
    }

    render() {
        console.log(this.state)
        return(
            <div className="container">
                <div className="calculator-body">
                    <div id="display" className="calculator-display">
                        {this.state.input}
                    </div>
                    <div className="calculator-buttons">
                        <button id='one' className="one calc-button" onClick={() => {this.inputNum('1')}}>1</button>
                        <button id='two' className="two calc-button" onClick={() => {this.inputNum('2')}}>2</button>
                        <button id='three' className="three calc-button" onClick={() => {this.inputNum('3')}}>3</button>
                        <button id='four' className="four calc-button" onClick={() => {this.inputNum('4')}}>4</button>
                        <button id='five' className="five calc-button" onClick={() => {this.inputNum('5')}}>5</button>
                        <button id='six' className="six calc-button" onClick={() => {this.inputNum('6')}}>6</button>
                        <button id='seven' className="seven calc-button" onClick={() => {this.inputNum('7')}}>7</button>
                        <button id='eight' className="eight calc-button" onClick={() => {this.inputNum('8')}}>8</button>
                        <button id='nine' className="nine calc-button" onClick={() => {this.inputNum('9')}}>9</button>
                        <button id='zero' className="zero calc-button" onClick={() => {this.inputNum('0')}}>0</button>
                        <button id='clear' className="ac-button calc-button" onClick={this.reset}>AC</button>
                        <button id='divide' className="div-button calc-button" onClick={() => {this.inputOperator('/')}}>/</button>
                        <button id='multiply' className="mul-button calc-button" onClick={() => {this.inputOperator('*')}}>x</button>
                        <button id='subtract' className="sub-button calc-button" onClick={() => {this.inputOperator('-')}}>-</button>
                        <button id='add' className="add-button calc-button" onClick={() => {this.inputOperator('+')}}>+</button>
                        <button id='equals' className="equal-button calc-button" onClick={this.evaluate}>=</button>
                        <button id='decimal' className="decimal-button calc-button" onClick={this.inputDecimal}>.</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator