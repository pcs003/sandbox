const HasHigherPrecedence = (op1, op2) => {
  //op1 is top of stack
  //op2 is operator in question
  if (op1 == "+") {
    return op2 == "-";
  } else if (op1 == "-") {
    return op2 == "+";
  } else if (op1 == "*" || op1 == "/") {
    console.log("* or /");
    return true;
  }
};

const InfixToPostfix = (str) => {
  // "((2 * 3) + ( 4 * 5 )) - 6" => "23*45*+6-"

  let result = "";
  let stack = [];
  let operators = ["+", "-", "*", "/"];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      continue;
    }
    if (operators.includes(str[i])) {
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== "(" &&
        HasHigherPrecedence(stack[stack.length - 1], str[i])
      ) {
        console.log("here");
        result += stack.pop();
      }
      stack.push(str[i]);
    } else if (str[i] === "(") {
      stack.push(str[i]);
    } else if (str[i] === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        result += stack.pop();
      }
      stack.pop();
    } else {
      result += str[i];
    }
  }

  while (stack.length > 0) {
    result += stack.pop();
  }
  return result;
};

const Operate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      return num2 + num1;
    case "-":
      return num2 - num1;
    case "*":
      return num2 * num1;
    case "/":
      return num2 / num1;
  }
};

const Calculator = (str) => {
  let stack = [];
  let operators = ["+", "-", "*", "/"];
  let postfixedStr = InfixToPostfix(str);

  for (let i = 0; i < postfixedStr.length; i++) {
    if (!operators.includes(postfixedStr[i])) {
      stack.push(parseInt(postfixedStr[i]));
    } else {
      let num1 = stack.pop();
      let num2 = stack.pop();
      stack.push(Operate(postfixedStr[i], num1, num2));
    }
  }

  return stack.pop();
};

console.log(Calculator("((2 * 3) + ( 4 * 5 )) - 6"));
