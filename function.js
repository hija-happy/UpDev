const runBtn = document.getElementById("runButton");
const inputCode = document.getElementById("codeEditor");
const previewOutput =  document.getElementById("preview");


//to load the page for every refresh and page loads
window.addEventListener("load",function(){
   if(localStorage.getItem("savedCode")){
    inputCode.value = localStorage.getItem("savedCode")
   }
    
   if(localStorage.getItem("savedOutput")){
    previewOutput.innerHTML = localStorage.getItem("savedOutput")
   }
});

inputCode.addEventListener("input",function(){
    localStorage.setItem("savedCode",inputCode.value);
})


runBtn.addEventListener("click", function(){

    // clear the output area for each click
    previewOutput.innerHTML = '';

     // reset the consoleOutputs array for each click
     //array to store the original outputs
     let consoleOutputs = [];
       
      // to capture the console, store the original console methods
    const originalConsole = {
        log: console.log,
        warn: console.warn,
        error: console.error,
        info: console.info,
       }; 

    //override the 4 console methods
    // for CONSOLE.LOG
    console.log = function(...args){
    originalConsole.log(...args);
    
    const output = args.map(arg=>{
        if(typeof arg === 'object'){
            try{
                return JSON.stringify(arg);
            }
            catch(err){
                return String(arg);
            }
        }
        return String(arg);
    }).join(' ');

    consoleOutputs.push(`<span class="log-output">${output}</span>`);
   }

   // for CONSOLE.WARN
   console.warn = function(...args){
    originalConsole.warn(...args);
    const output = args.map(String).join('');
    consoleOutputs.push(`<span class ="warn-output">${output}</span>`)
   }

   //for CONSOLE.ERROR 
   console.error = function(...args){
    originalConsole.error(...args);
    const output = args.map(String).join('');
    consoleOutputs.push(`<span class="error-output">${output}</span>`)
   }

    // for CONSOLE.INFO
    console.info = function(...args) {
        originalConsole.info(...args);
        const output = args.map(String).join('');
        consoleOutputs.push(`<span class="info-output">${output}</span>`)
    }

    try{
        // console.log(inputCode.value);// gives the tag textfield
        // console.log(inputCode.value);// gives the value inside the tag
        const evalContent = eval(inputCode.value);
        
        if(consoleOutputs.length>0){
            previewOutput.innerHTML = consoleOutputs.join('<br>')+'<br>';
          }

        if(evalContent !== undefined){
            previewOutput.innerHTML += `<span class="result-output">${String.evalContent}</span>`;
    }
    // to save it into the local storage for runs
    localStorage.setItem("savedOutput",previewOutput.innerHTML)
}
    //gives the tag 
   catch(err){
   // previewOutput.innerHTML = `Exception: ${err.message}`;
   previewOutput.innerHTML = `<span class="error-output">Bro!!! Error: ${err.message}</span>`;
   localStorage.setItem("savedOutput",previewOutput.innerHTML)

   }
   finally {
    // restore original console methods
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
}

})

// to clear the input and preiew box when clicked in the clear btn
function clearCodeAll (event){

    const button = event.target;

    if(button.id==="clearInput")
   { inputCode.value = '';
    previewOutput.innerHTML = '';
}
else if(button.id==="clearOutput"){
    previewOutput.innerHTML = '';
}
}

document.getElementById("clearInput").addEventListener("click",clearCodeAll);
document.getElementById("clearOutput").addEventListener("click",clearCodeAll)
