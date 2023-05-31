let calcButtons = document.getElementsByClassName("calc-button");
for (let i of calcButtons){
    i.addEventListener("mousedown", () => {
        i.style.bottom = "-1px";

    })
    i.addEventListener("mouseup", () => {
        i.style.bottom = "0px";
    })
}

let mainRow = document.getElementById("result");
let historyRow = document.getElementById("history");


//0-9
let Butt0 = document.getElementById("0");
let Butt1 = document.getElementById("1");
let Butt2 = document.getElementById("2");
let Butt3 = document.getElementById("3");
let Butt4 = document.getElementById("4");
let Butt5 = document.getElementById("5");
let Butt6 = document.getElementById("6");
let Butt7 = document.getElementById("7");
let Butt8 = document.getElementById("8");
let Butt9 = document.getElementById("9");


//C
let cButt = document.getElementById("c");
//+
let additionButt = document.getElementById("addition");
//+/-
let plusMinusButt = document.getElementById("plusMinus");
//%
let percentButt = document.getElementById("percent");
//÷
let divisionButt = document.getElementById("division");
//*
let multiplicationButt = document.getElementById("multiplication");
//-
let subtractionButt = document.getElementById("subtraction");
//.
let dotButt = document.getElementById("dot");
//=
let equalsButt = document.getElementById("equals");


//MR
let mrecallButt = document.getElementById("mrecall");
//x!
let factorialButt = document.getElementById("factorial");
//xⁿ
let exponentiationButt = document.getElementById("exponentiation");
//MC
let mclearButt = document.getElementById("mclear");
//√x
let rootButt = document.getElementById("root");
//M-
let mminusButt = document.getElementById("mminus");
//pl
let placeholderButt = document.getElementById("placeholder");
//M+
let mplusButt = document.getElementById("mplus");

let measures = document.getElementById("measures");
let fSelect = document.getElementById("f-measure-select");
let sSelect = document.getElementById("s-measure-select");

let secondFOption = document.getElementById("secondfoption");
let thirdFOption = document.getElementById("thirdfoption");
let fourthFOption = document.getElementById("fourthfoption");

let secondSOption = document.getElementById("secondsoption");
let thirdSOption = document.getElementById("thirdsoption");
let fourthSOption = document.getElementById("fourthsoption");

let firstInput = document.getElementById("f-measure-input");
let secondInput = document.getElementById("s-measure-input");

let firstSystemSelect = document.getElementById("f-system-select");
let secondSystemSelect = document.getElementById("s-system-select");

let firstSystemInput = document.getElementById("f-system-input");
let secondSystemInput = document.getElementById("s-system-input");

let convertSystemButt = document.getElementById("convertSystem");

secondCoefficient = 1;
thirdCoefficient = 100;
fourthCoefficient = 100000;

let convertButt = document.getElementById("convert");

function simplifyExpression(arr){
    for (let i = 0; i < arr.length; i++){
        if (arr[i].indexOf("!") >= 0){
            let isMinus = false;
            if (arr[i].split("")[0] === "-"){
                isMinus = true;
                arr[i] = arr[i].slice(1);
            }
            let buffBuff = arr[i].split("");
            buffBuff.splice(arr[i].indexOf("%"), 1);
            let factorial = Number(buffBuff.join(""));
            let newNum = 1;
            for (let j = factorial; j > 1; j--){
                newNum *= j;
            }
            if (isMinus) newNum *= -1;
            arr[i] = newNum.toString();
        }
        if (arr[i].indexOf("%") >= 0){
            let buffBuff = arr[i].split("");
            buffBuff.splice(arr[i].indexOf("%"), 1);
            let newNum = Number(buffBuff.join("")) / 100;
            arr[i] = newNum.toString();
        }
        if (arr[i].indexOf("√") >= 0){
            let buffArr = arr[i].split("").splice(arr[i].indexOf("%"), 1);
            let newNum = Math.sqrt(Number(buffArr.join("")));
            arr[i] = newNum.toString();
        }
        if (arr[i].indexOf("^") >= 0){
            let buffArr = arr[i].split("^");
            let newNum = 1;
            for (let j = 0; j < Number(buffArr[1]); j++){
                newNum *= buffArr[0];
            }
            arr[i] = newNum.toString();
        }
    }
}

function evaluateExpression(expr) {
    
    let tokens = expr.split(' ');
    simplifyExpression(tokens);
    let operIndex;
    //check for multiplication and division
     while((operIndex = tokens.indexOf('*')) !== -1 ||
            (operIndex = tokens.indexOf('÷')) !== -1) {
        let plusIndex = tokens.indexOf('*');
        let minusIndex = tokens.indexOf('÷');
        let myIndex;
        if (plusIndex < minusIndex) {
            myIndex = plusIndex;
            if (myIndex == -1){
                myIndex = minusIndex;
            }
        } else {
            myIndex = minusIndex;
            if (myIndex == -1){
                myIndex = plusIndex;
            }
        }
        let leftNum = tokens[myIndex - 1];
        let rightNum = tokens[myIndex + 1];
        if (tokens[myIndex] == '*') {
            var subRes = Number(leftNum) * Number(rightNum);
        } else if (tokens[myIndex] == '÷') {
            var subRes = Number(leftNum) / Number(rightNum);
        }
        tokens.splice(myIndex - 1, 3, subRes);
    }
    //check for plus/minus
    
    while((operIndex = tokens.indexOf('+')) !== -1 ||
            (operIndex = tokens.indexOf('-')) !== -1) {
        let plusIndex = tokens.indexOf('+');
        let minusIndex = tokens.indexOf('-');
        let myIndex;
        if (plusIndex < minusIndex) {
            myIndex = plusIndex;
            if (myIndex == -1){
                myIndex = minusIndex;
            }
        } else {
            myIndex = minusIndex;
            if (myIndex == -1){
                myIndex = plusIndex;
            }
        }
        let leftNum = tokens[myIndex - 1];
        let rightNum = tokens[myIndex + 1];
        if (tokens[myIndex] == '+') {
            var subRes = Number(leftNum) + Number(rightNum);
        } else if (tokens[myIndex] == '-') {
            var subRes = Number(leftNum) - Number(rightNum);
        }
        tokens.splice(myIndex - 1, 3, subRes);
    }
    if (isNaN(tokens[0])) return "Error";
   
    return `${tokens[0]}`;
}

function updateStringExpression(operator){
    if (currentStringExpression.charAt(currentStringExpression.length - 1) !== " " && operator === "√" && currentStringExpression !== "0"){
        currentStringExpression += " * √";
        return;
    }
    if (currentStringExpression.charAt(currentStringExpression.length - 1) !== " " && operator === "√" && currentStringExpression === "0"){
        currentStringExpression = "√";
        return;
    }
    if (currentStringExpression.charAt(currentStringExpression.length - 1) === "^"){
        currentStringExpression = currentStringExpression.slice(0, currentStringExpression.length - 1);
    }
    if (currentStringExpression.charAt(currentStringExpression.length - 1) === " " && operator !== "√"){
        currentStringExpression = currentStringExpression.slice(0, currentStringExpression.length - 3);
    } 
    if (operator === "!" && currentStringExpression.charAt(currentStringExpression.length - 1) === "!") return;
    if (operator === "%" && currentStringExpression.charAt(currentStringExpression.length - 1) === "%") return;
    currentStringExpression += operator;
}

function updateMainRow(){
    if (currentStringExpression.length > 13){
        mainRow.innerText = "..." + currentStringExpression.slice(currentStringExpression.length - 10);
    }
    else {
        mainRow.innerText = currentStringExpression;
    }
}

function updateResultRow(){
    if (currentStringExpression.length > 13){
        mainRow.innerText = currentStringExpression.slice(0, currentStringExpression.length - 10) + "...";
    }
    else {
        mainRow.innerText = currentStringExpression;
    }
}

let currentStringExpression = "";
let justEqualed = false;
let memoryValue = 0;
let historyArr = [];
const historyCon = document.getElementById('historyCon');
const showHistoryBtn = document.getElementById('showHistoryBtn');
const exportHistoryBtn = document.getElementById('exportHistory');
const importHistoryBtn = document.getElementById('importHistory');

showHistoryBtn.addEventListener('click', () => {
    let hconstyle = window.getComputedStyle(historyCon);
    if (hconstyle.display !== 'none') {
        historyCon.style.display = 'none';
        return;
    }
    else if (hconstyle.display === 'none' || hconstyle.display === ""){
        historyCon.style.display = 'block';
        return;
    }
    
});

exportHistoryBtn.addEventListener('click', () => {
    let text = JSON.stringify(historyArr);
        navigator.clipboard.writeText(text).then(function() {
            
        }, function(err) {
            
        });
});

importHistoryBtn.addEventListener('click', () => {
    let input = prompt('Input calculation history to restore it');
    if (input === undefined || input === null || input.trim() === '') return;
    historyArr = JSON.parse(input);
    if (historyArr.length == 0) return;
    historyRow.innerText = historyArr[historyArr.length - 1].slice(0,historyArr[historyArr.length - 1].indexOf('=') - 1 );
    currentStringExpression = historyArr[historyArr.length - 1].slice(historyArr[historyArr.length - 1].indexOf('=') + 2 , historyArr[historyArr.length - 1].length);
    updateMainRow();
    showHistory();
});

function showHistory() {
    historyCon.innerHTML = '';
    for (const e of historyArr) {
        historyCon.innerHTML +=`
        <p>${e}</p>
        `;
    }
}

function recallMemory() {
    mainRow.innerText = `${memoryValue}`;
    currentStringExpression = `${memoryValue}`;
}

function clearMemory() {
    memoryValue = 0;
}

function addMemory() {
    let val = evaluateExpression(currentStringExpression);
    memoryValue = Number(memoryValue) + Number(val);
}

function removeMemory() {
    let val = evaluateExpression(currentStringExpression);
    memoryValue = Number(memoryValue) - Number(val);
}

mrecallButt.addEventListener('click', recallMemory);
mclearButt.addEventListener('click', clearMemory);
mplusButt.addEventListener('click', addMemory);
mminusButt.addEventListener('click', removeMemory);

let numberButtons = document.getElementsByClassName("number-button");
for (let i of numberButtons){
    i.addEventListener("click", () =>{
        if (currentStringExpression.charAt(currentStringExpression.length - 1) === ("!" || "%")){
            currentStringExpression += " * " + i.innerHTML;
        }
        else if ((currentStringExpression.charAt(currentStringExpression.length - 1) === " " || justEqualed === false) && currentStringExpression !== "0"){
            currentStringExpression += i.innerHTML;
        }
        else if (currentStringExpression.charAt(currentStringExpression.length - 1) === "^" && justEqualed === true){
            currentStringExpression += i.innerHTML;
        }
        else {
            currentStringExpression = i.innerHTML;
            currentNumber = 0;
        }
        justEqualed = false;
        updateMainRow();
    })
}

dotButt.addEventListener("click", () => {
    if (currentStringExpression.charAt(currentStringExpression.length - 1) === " "){
        currentStringExpression += "0.";
    }
    else if (currentStringExpression.charAt(currentStringExpression.length - 1) === ("!" || "%")){
        currentStringExpression += " * " + dotButt.innerHTML;
    }
    else if ((currentStringExpression.charAt(currentStringExpression.length - 1) === " " || justEqualed === false) && currentStringExpression !== "0"){
        currentStringExpression += dotButt.innerHTML;
    }
    else if (currentStringExpression.charAt(currentStringExpression.length - 1) === "^" && justEqualed === true){
        currentStringExpression += dotButt.innerHTML;
    }
    else {
        currentStringExpression = dotButt.innerHTML;
        currentNumber = 0;
    }
    justEqualed = false;
    updateMainRow();
});

additionButt.addEventListener("click", () => {
    updateStringExpression(" + ");
    updateMainRow();
});
divisionButt.addEventListener("click", () => {
    updateStringExpression(" ÷ ");
    updateMainRow();
});

subtractionButt.addEventListener("click", () => {
    updateStringExpression(" - ");
    updateMainRow();
});
multiplicationButt.addEventListener("click", () => {
    updateStringExpression(" * ");
    updateMainRow();
});

equalsButt.addEventListener("click", ()=>{
    if (currentStringExpression === "") return;
    if (!/\d/.test(currentStringExpression.charAt(currentStringExpression.length - 1))) return;
    var result = evaluateExpression(currentStringExpression);
    historyRow.innerText = currentStringExpression;
    currentStringExpression = result;
    updateResultRow();
    historyArr.push(`${historyRow.innerText} = ${result}`);
    showHistory();
    justEqualed = true;

});

cButt.addEventListener("click", () => {
    currentStringExpression = "0";
    historyRow.innerText = mainRow.innerText;
    mainRow.innerText = currentStringExpression;
});

factorialButt.addEventListener("click", () =>{
    updateStringExpression("!");
    updateMainRow();
});

rootButt.addEventListener("click", () => {
    updateStringExpression("√");
    updateMainRow();
});

percentButt.addEventListener("click", () =>{
    updateStringExpression("%");
    updateMainRow();
});
exponentiationButt.addEventListener("click", () =>{
    updateStringExpression("^");
    updateMainRow();
});

plusMinusButt.addEventListener("click", () => {
    let buffArr = currentStringExpression.split(" ");
    for (let i = buffArr.length - 1; i >= 0; i--){
        if (/\d/.test(buffArr[i].split("")[0])){
            buffArr[i] = "-" + buffArr[i];
            break;
        }
        else if (buffArr[i].split("")[0] === "-"){
            buffArr[i] = buffArr[i].slice(1);
            break;
        }
    }
    currentStringExpression = buffArr.join(" ");
    updateMainRow();
});

convertButt.addEventListener("click", () => {
    let input = Number(firstInput.value);
    if (isNaN(input)) return;
    let convNum = input;
    console.log(convNum);
    console.log(thirdCoefficient);
    console.log(fourthCoefficient);
    if (fSelect.value === "Meters" || fSelect.value === "Kilograms" || fSelect.value === "Square kilometers"){
        convNum *= thirdCoefficient;
        console.log("umnozhilo" + convNum);
    } 
    if (fSelect.value === "Kilometers" || fSelect.value === "Tones" || fSelect.value === "Hectares"){
        convNum *= fourthCoefficient;
        console.log("umnozhilo" + convNum);
    } 
    if (sSelect.value === "Meters" || sSelect.value === "Kilograms" || sSelect.value === "Square kilometers"){
        convNum /= thirdCoefficient;
        console.log("podelilo" + convNum);
    } 
    if (sSelect.value === "Kilometers" || sSelect.value === "Tones" || sSelect.value === "Hectares"){
        convNum /= fourthCoefficient;
        console.log("podelilo" + convNum);
    } 
    secondInput.value = convNum;
});

measures.addEventListener("change", (e) => {
    if (e.target.value === "Length"){
        secondFOption.innerText = "Centimeters";
        secondSOption.innerText = "Centimeters";
        thirdFOption.innerText = "Meters";
        thirdSOption.innerText = "Meters";
        fourthFOption.innerText = "Kilometers";
        fourthSOption.innerText = "Kilometers";
        secondCoefficient = 1;
        thirdCoefficient = 100;
        fourthCoefficient = 100000;
    }
    if (e.target.value === "Weight"){
        secondFOption.innerText = "Grams";
        secondSOption.innerText = "Grams";
        thirdFOption.innerText = "Kilograms";
        thirdSOption.innerText = "Kilograms";
        fourthFOption.innerText = "Tones";
        fourthSOption.innerText = "Tones";
        secondCoefficient = 1;
        thirdCoefficient = 1000;
        fourthCoefficient = 1000000;
    }
    if (e.target.value === "Area"){
        console.log("checked");
        secondFOption.innerText = "Square meters";
        secondSOption.innerText = "Square meters";
        thirdFOption.innerText = "Square kilometers";
        thirdSOption.innerText = "Square kilometers";
        fourthFOption.innerText = "Hectares";
        fourthSOption.innerText = "Hectares";
        secondCoefficient = 1;
        thirdCoefficient = 1000000;
        fourthCoefficient = 10000;
    }
});

convertSystemButt.addEventListener("click", () => {
    if (firstSystemSelect.value === "Decimal"){
        let input = Number(firstSystemInput.value);
        if (secondSystemSelect.value === "Hexadecimal"){
            secondSystemInput.value = input.toString(16);
        }
        else if (secondSystemSelect.value === "Binary"){
            secondSystemInput.value = input.toString(2);
        }
        else{
            secondSystemInput.value = input;
        }
    }
    if (firstSystemSelect.value === "Hexadecimal"){
        if (secondSystemSelect.value === "Binary"){
            let inp = parseInt(firstSystemInput.value, 16);
            secondSystemInput.value = inp.toString(2);
        }
        if (secondSystemSelect.value === "Decimal"){
            secondSystemInput.value = parseInt(firstSystemInput.value, 16);
        }
        if (secondSystemInput.value === "Hexadecimal"){
            secondSystemInput.value = firstSystemInput.value;
        }
    }
    if (firstSystemSelect.value === "Binary"){
        if (secondSystemSelect.value === "Binary"){
            secondSystemInput.value = firstSystemInput.value;
        }
        if (secondSystemSelect.value === "Decimal"){
            secondSystemInput.value = parseInt(firstSystemInput.value, 2);
        }
        if (secondSystemInput.value === "Hexadecimal"){
            let inp = parseInt(firstSystemInput.value, 2);
            secondSystemInput.value = inp.toString(16);
        }
    }
});
