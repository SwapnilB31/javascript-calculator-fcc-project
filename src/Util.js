var operators = ["+","-","*","/","^"];

var operatorPrecedence = {
  "+" : 0,
  "-" : 0,
  "*" : 1,
  "/" : 1,
  "^" : 2
};


function isNum(chunk) {
    var startInd = 0;
    if(chunk === '-')
      return false;
    if(chunk.lastIndexOf('-') === 0)
      startInd = 1;
    else if(chunk.lastIndexOf('-') > 0) 
      return false;
    for(var i = startInd; i < chunk.length; i++)
      if(!(isNumeral(chunk[i]) || chunk[i] === '.'))
        return false;
      return true;
}

function isNumeral(ele) {
  return ele >= '0' && ele <= '9';
}

function isOperator(ele) {
  for(var i in operators)
    if(ele === operators[i])
      return true;
    return false;
}

function getNumber(sliceExpr) {
    var i = sliceExpr[0] === '-' ? 1 : 0;
    while( i < sliceExpr.length && (isNumeral(sliceExpr[i]) || sliceExpr[i] === "."))
      i++;
    return i;
  }
  
  function Evaluate (A,B,op) {
    var result = 0;
    switch (op) {
      case "+":
        result = B + A;
        break;
      case "-":
          result = B - A;
          break;
      case "*":
        result = B * A;
        break;
      case "/":
        result = B / A;
        break;
      case "^":
        result = Math.pow(B,A);
        break;
      default:
          result = 0;
    }
    return result;
  }
  
  function toInfix (expr) {
    var infixExpression = [];
    for(var i = 0; i < expr.length; i++) {
      if (expr[i] === " ");
      else if (isNumeral(expr[i])) {
        var numLen = getNumber(expr.slice(i));
        infixExpression.push(expr.slice(i,i+numLen));
        i += numLen - 1;
      }
      else if (isOperator(expr[i])) {
        infixExpression.push(expr[i]);
      }
      else if (expr[i] === "(" || expr[i] === ")") {
        infixExpression.push(expr[i]);
      }
      else {
        return false;
      }
    }
    infixExpression.push(")");
    return infixExpression;
  }
  
  function toPostfix(infixExpr) {
    var infixOperatorStack = ["("];
    var postfixExpr = [];
    while(infixOperatorStack.length > 0) {
      if (isNum(infixExpr[0])) {
        postfixExpr.push(infixExpr.shift());
      }
      else if (infixExpr[0] === "(") {
        infixOperatorStack.push(infixExpr.shift());
      }
      else if (isOperator(infixExpr[0])) {
        if(infixOperatorStack[infixOperatorStack.length - 1] === "(")
          infixOperatorStack.push(infixExpr.shift());
        else {
          while (operatorPrecedence[infixOperatorStack[infixOperatorStack.length - 1]] >= operatorPrecedence[infixExpr[0]]) {
            postfixExpr.push(infixOperatorStack.pop());
            if(infixOperatorStack[infixOperatorStack.length - 1] === "(") break;
          }
          infixOperatorStack.push(infixExpr.shift());
        }
      }
      else if (infixExpr[0] === ")") {
        while(infixOperatorStack[infixOperatorStack.length - 1] !== "(") {
          postfixExpr.push(infixOperatorStack.pop());
        }
        infixOperatorStack.pop();
        infixExpr.shift();
      }
    }
    return postfixExpr;
  }
  
  function evaluatePostfix(postfixExpr) {
    var postfixOperandStack = [];
    postfixExpr.push(")");
    while(postfixExpr[0] !== ")") {
      if(isNum(postfixExpr[0])) {
        postfixOperandStack.push(postfixExpr.shift());
      }
      else if (isOperator(postfixExpr[0])) {
        var result = Evaluate(parseFloat(postfixOperandStack.pop()),parseFloat(postfixOperandStack.pop()),postfixExpr.shift());
        postfixOperandStack.push(result.toString());
      }
    }
    return postfixOperandStack.pop();
  }

  /**
   * 
   * @param {String} expr 
   */
  function evalExpr(expr) {
    const infix = toInfix(expr)
    const postfix = toPostfix(infix)
    const result = evaluatePostfix(postfix)
    return result
  }

  function oneOperatorBefore(expression) {
    let i = expression.length - 1;
    let opCount = 0;
 
    while(isOperator(expression[i]) || expression[i] == ' ') {
      console.log(expression[i])
      if(isOperator(expression[i]))
        opCount++;
      i--;
      if(isNum(expression[i]))
        break;
    }
    console.log(`opCount = ${opCount}`)
    return opCount < 2;
  }

export {isOperator}
export {isNum}
export {evalExpr}
export {oneOperatorBefore}