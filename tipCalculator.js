// handles for form and feedback
const form = document.querySelector('form');
const feedback = document.querySelector('.feedback');
// error message handles
const nameError = document.querySelector('#nameError');
const passwordError = document.querySelector('#passwordError');
const mealCostError = document.querySelector('#mealCostError');
// input regex patterns
const namePattern = /^[ a-zA-Z]{4,}$/;
const passwordPattern = /^[0-9a-zA-Z]{12,12}$/;
const mealCostPattern = /^[0-9\.]{1,}$/;       
// clear error messages
const clearErrorMsg = function(){
    nameError.textContent = "";
    passwordError.textContent = "";
    mealCostError.textContent = "";
};

//validation upon submit
form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrorMsg();
    
    let validForm = true;
    let name = form.name.value;
    let password = form.password.value;
    let mealCost = form.mealCost.value;       

    if(!namePattern.test(name)){
        nameError.textContent = "Name must be at least 4 letters, no numbers";
        validForm = false;
    };
    if(!passwordPattern.test(password)){
        passwordError.textContent = "Password must be 12 characters, letters and numbers only";
        validForm = false;
    };
    if(!mealCostPattern.test(mealCost) || mealCost === "."){
        mealCostError.textContent = "Meal Cost must be numbers and decimal only";
        validForm = false;
    } else if(mealCost <= 0){
        mealCostError.textContent = "Meal Cost must be more than zero";
        validForm = false;
    };

    // display results if validForm
    if(validForm){
        mealCost = parseFloat(mealCost);
        let tip = (form.qs.value/100) * mealCost;
        let total = mealCost + tip;
        let moneyFormat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let formattedMealCost = moneyFormat.format(mealCost);
        let formattedTip = moneyFormat.format(tip);
        let formattedTotal = moneyFormat.format(total);

        feedback.innerHTML = `<p>Meal cost: ${formattedMealCost}<br>Tip: ${formattedTip}<br>Total: ${formattedTotal}</p>`;
    }
});

// live feedback

form.name.addEventListener('keyup', e => {        // name
    if(namePattern.test(e.target.value)){
        form.name.setAttribute('class', 'success');
    } else {
        form.name.setAttribute('class', 'error');
    }
});

form.password.addEventListener('keyup', e => {     // password
    if(passwordPattern.test(e.target.value)){
        form.password.setAttribute('class', 'success');
    } else {
        form.password.setAttribute('class', 'error');
    }
});

