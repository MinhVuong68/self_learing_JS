// Đối tượng
function Validator(options){

    function validate(inputElement,rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage = rule.test(inputElement.value);
        if(errorMessage){
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }else{
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    var formElement = document.querySelector(options.form)
    if(formElement){
        options.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector)
            
            if(inputElement){

                // Xử lí trường hợp blur khỏi input
                inputElement.onblur = function(){
                    // value: inputElement.value
                    // test func: rule.test
                    validate(inputElement,rule)
                }

                // Xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

// Định nghĩa rules
// Nguyên tắc của các rule
//1. Khi có lỗi => trả ra message lỗi
//2. Khi hợp lệ => Không trả ra cái gì hết (undefined)
Validator.isRequired = function(selector){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : 'Vui lòng nhập trường này!'
        }
    }
}

Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email!'
        }
    }
}

Validator.isPassword = function(selector,minLength){
    return {
        selector: selector,
        test: function(value){
            return value.length>=minLength ? undefined : `Mật khẩu phải có từ ${minLength} kí tự trở lên!`
        }
    }
}