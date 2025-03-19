const runBtn = document.getElementById("runButton");
const inputCode = document.getElementById("codeEditor");
const previewOutput =  document.getElementById("preview");


runBtn.addEventListener("click", function(){

    try{
        // console.log(inputCode.value);// gives the tag textfield
        // console.log(inputCode.value);// gives the value inside the tag
        const evalContent = eval(inputCode.value);
        console.log(evalContent);
        previewOutput.innerHTML = evalContent;
    }
    //gives the tag 
   catch(err){
    previewOutput.innerHTML = `Exception: ${err.message}`;
   }

})