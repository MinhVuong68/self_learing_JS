function Validator(options) {
    var selectorRules = {}
    function Validate(inputElement,rule){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage

        // Lay ra cac rule cua selector
        var rules = selectorRules[rule.selector]

        for(var i=0;i<rules.length;i++) {
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break
        }
        if(errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errorMessage
    }
    var formElement = document.querySelector(options.form)
    //Khi submit form
    formElement.onsubmit = function(e) {
        e.preventDefault()

        var isFormValid = true
        options.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector)
            var isValid = Validate(inputElement,rule)
            if(!isValid) {
                isFormValid = false
            }
        })

        if(isFormValid) {
            if(typeof options.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')   
                console.log(enableInputs)
                var formValues = Array.from(enableInputs).reduce(function (values,input){
                     return (values[input.name] = input.value) && values
                },{})
                options.onSubmit(formValues)
            }else {
                formElement.submit()
            }
        }
    }
    if(formElement) {
        options.rules.forEach((rule) => {

            // Luu lai cac rule cho moi input

            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement) {
                inputElement.onblur = function() {
                    Validate(inputElement,rule)
                }
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
            
        })
    }
}


Validator.isRequired = function(selector,message) {
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector,message) {
    return {
        selector: selector,
        test: function(value){
            var regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Email không đúng định dạng'
        }
    }
}

Validator.minLength = function(selector,minLength,message) {
    return {
        selector: selector,
        test: function(value){
            return value.length >= minLength ? undefined : message || `Vui lòng nhập từ ${minLength} kí tự trở lên`
        }
    }
}


Validator.isConfirmed = function(selector,getConfirmed,message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmed() ? undefined : message || 'Giá trị nhập vào không chính xác!'
        }
    }
}
