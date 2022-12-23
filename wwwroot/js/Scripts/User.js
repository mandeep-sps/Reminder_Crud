
$(document).ready(function () {
    GenderList();
    clearRegisterForm();
});



function GenderList() {
    $.get('/User/GetGenders', function (response) {
        $('#list-gender').empty();
        console.log(response)
        $.each(response, function (index, item) {
            $('#list-gender').append('<option value="' + item.id + '">' + item.name + '</option>');
        })
    });
}

$('#register-user-form').off().on('submit', function (e) {
    e.preventDefault()
    console.log($(this).serializeArray())
    $.ajax({
        url: '/User/AddUser',
        data: $(this).serializeArray(),
        method: 'POST',
        success: function (resposne) {
            if (resposne.statusCode === 200) {
                clearRegisterForm();
                swal(resposne.message,null, "success")
            }
        },
        error: function (response) {
            swal("Somthing went wrong !",null, "error");
        }
    })
})

$('#login-form-id').off().on('submit', function (e) {
    e.preventDefault()
    console.log($(this).serializeArray())
    $.ajax({
        url:'/Login/ValidateUser' ,
        data: $(this).serializeArray(),
        method: 'POST',
        success: function (resposne) {
            swal("Login Succesfull", "success")
        },
        error: function (response) {
            console.log(response.responseText)
            swal("Somthing went wrong !",null, "error");
        }
    })
})

function clearRegisterForm() {
    $('#txt-fName').val("");
    $('#txt-lName').val("");
    $('#email').val("");
    $('#txt-password').val("");
    $('#result').text("");
}

function verifyPassword() {
    alert('pw')
    var isValid = true;
    //check empty password field  
    if ($('#txt-password').val().trim() == "") {
        $('#txt-password').css('border-color', 'Red');
        $('#txt-password-message').html('**Fill the password please!');
        isValid= false;
    }
    else {
        $('#txt-password').css('border-color', 'lightgrey');
    }


    //minimum password length validation  
    if ($('#txt-password').val().length < 8) {
        $('#txt-password').css('border-color', 'Red');
        $('#txt-password-message').html('**Password length must be atleast 8 characters');
        isValid = false;
    }
    else {
        $('#txt-password').css('border-color', 'lightgrey');
    }

    //maximum length of password validation  
    if ($('#txt-password').val().length > 15) {
        $('#txt-password').css('border-color', 'Red');
        $('#txt-password-message').html('**Password length must not exceed 15 characters');
        isValid = false;
    }
    else {
        alert("Password is correct");
    }
} 


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validate = () => {
    const $result = $('#result');
    const email = $('#email').val();
    $result.text('');

    if (validateEmail(email)) {
        $result.css('border-color', 'lightgrey');
    } else {
        $result.text(email + ' is not valid :(');
        $result.css('color', 'red');
    }
    return false;
}

$('#email').on('input', validate);
