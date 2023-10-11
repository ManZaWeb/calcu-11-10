document.addEventListener('DOMContentLoaded', function() {
  //Getting elements from DOM
  const operationDisplay = document.querySelector('.calcu-screen')
  

  const digits = document.querySelectorAll('.calcu-key')
  const opers = document.querySelectorAll('.calcu-key-ope')
  const equals = document.getElementById("equals")
  const pi = document.getElementById("pi")
  const inverse = document.getElementById("inverse")
  
  const clear = document.getElementById("clear")
  const erase = document.getElementById("delete")
  
  //Variables needed for the calculator
  
  let resul = "";
  let isNewOperation = true;
  let lastInputType = null;

  //Limits the max characters on screen to 12
  function limit12() {
    if (operationDisplay.innerText.length > 12) {
        operationDisplay.innerText = operationDisplay.innerText.slice(0, 12);
    }
}

  //Function for digits
  digits.forEach(digit => {
    digit.addEventListener('click', function() {
      let displayValue = digit.textContent;
  
      if (isNewOperation) {
        operationDisplay.innerText = displayValue;
        isNewOperation = false;
      } else {
        operationDisplay.innerText += displayValue;
      }
      lastInputType = null
      limit12()
    });
  });
  
    //Function for operators
    opers.forEach(oper => {
      oper.addEventListener('click', function() {
        let operator = oper.value;
        if (!isNewOperation && lastInputType !== 'operator') {
          operationDisplay.innerText += operator;
          isNewOperation = false;
          lastInputType = 'operator';
        }
        limit12()
      });
    });    


    //Function for equals button
    equals.addEventListener('click', function() {
      let resolve = operationDisplay.innerText;
    
      try {
        // Use eval to perform the calculation
        resul = eval(resolve);
    
        // Update the display with the result
        operationDisplay.innerText = resul;
        isNewOperation = false;
      } catch (error) {
        // Handle any errors that may occur during evaluation
        operationDisplay.innerText = 'Error';
        isNewOperation = true;
      }
      limit12()
    });

    //Function for pi button
    pi.addEventListener('click', function() {
      let pi = Math.PI.toFixed(5)
      if (isNewOperation === true) {
        operationDisplay.innerText = pi;
        isNewOperation = false;
      }else if(lastInputType === 'operator'){
        operationDisplay.innerText += pi;
      }
    });

    //Function for clear button
    clear.addEventListener('click', function() {

      operationDisplay.innerText = '0';
      isNewOperation = true
      lastInputType = null

    });

    //Function for erase button
    erase.addEventListener('click', function() {
      if(isNewOperation === false && operationDisplay.innerText.length > 1){
      operationDisplay.innerText = operationDisplay.innerText.slice(0, -1)
      }
      lastInputType = null //Allows to write an operator after erasing one
  });
  
    //Function for inverse button
      inverse.addEventListener('click', function(){
        if(lastInputType !== 'operator')//Denies bug when u inverse a number next to a operator
        operationDisplay.innerText = (operationDisplay.innerText * -1)
      })
   
});
