function Validator(options) {
    function Validate(inputElement,rule){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage = rule.test(inputElement.value)
        if(errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    var formElement = document.querySelector(options.form)
    if(formElement) {
        options.rules.forEach((rule) => {
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


Validator.isFullName = function(selector) {
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : 'Họ và tên không được để trống!'
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value){
            var regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Email không đúng định dạng'
        }
    }
}

Validator.isPassword = function(selector,minLength) {
    return {
        selector: selector,
        test: function(value){
            return value.length >= minLength ? undefined : 'Mật khẩu phải nhiều hơn 7 kí tự'
        }
    }
}