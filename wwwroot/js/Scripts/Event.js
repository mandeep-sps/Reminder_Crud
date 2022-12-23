var controls;
$(document).ready(function () {
    controls = ['#txt-title', '#txt-description', '#txt-time-date'];
    loadAllEvents();
    $('#event-form-modal').on('hide.bs.modal', function () {
        clearEventForm()
    });

});

function loadAllEvents() {
    $.get('/Home/GetAllEvents', function (response) {
        console.log(response)
        $('#tbl').DataTable({
            ordering: false,
            destroy: true,
            data: response.data,
            columns: [
                { data: 'title' },
                { data: 'description' },
                { data: null, render: function (item) { return toFormat(item.time) } },
                {
                    data: null, render: function (item) {
                        var buttons = '<button class="btn btn-sm btn-outline-primary" onclick="openEventForm(' + item.eventId + ')"><i class="fas fa-pen-square fa-1x"></i></button>'
                            + ' <button class="btn btn-sm btn-outline-danger" onclick="RemoveEvent(' + item.eventId + ')"><i class="fas fa-trash fa-1x"></i></i></button>'

                        return buttons;
                    }
                },
            ],
        });

    });
}


function openEventForm(EventId) {
    if (EventId) {
        $.get('/Home/GetEventById', `id=${EventId}`, function (resposne) {
            $('#lbl-event').html(`Update Event <span class="text-primary"> ${resposne.data.eventId}</span>`)
            $('#txt-id').val(resposne.data.eventId)
            $('#txt-userId').val(resposne.data.userId)
            $('#txt-title').val(resposne.data.title)
            $('#txt-description').val(resposne.data.description)
            /*$('#txt-due-date').val(setDate(resposne.time))*/
            $('#txt-time-date').val(resposne.data.time)

        })
    }
    else {
        $('#lbl-event').html("Create new Event")
        $('#txt-id').val('')
    }
    $('#event-form-modal').modal('show');

}

$('#event-form-id').off().on('submit', function (e) {
    e.preventDefault()
    var url = $('#txt-id').val() ? '/Home/UpdateEvents' : '/Home/AddEvents'
    var method = $('#txt-id').val() ? 'PUT' : 'POST'
    console.log($(this).serializeArray())
    if (validateEventForm()) {
        $.ajax({
            url: url,
            data: $(this).serializeArray(),
            method: method,
            success: function (resposne) {
                if (resposne.statusCode === 200) {
                    clearEventForm();
                    loadAllEvents();
                    $('#event-form-modal').modal('hide');
                    swal(resposne.message, "success")
                }
            },
            error: function (response) {
                swal("Some thing went wrong !", "error")
            }
        })
    }
});

function RemoveEvent(eventId) {
    MessageUtility.ConfirmDialogue(`Are you sure you want to delete this record?`, null
, function () {
        $.get('/Home/DeleteEvent', 'id=' + eventId, function (response) {

            if (response.statusCode === 200) {
                //loadAllEvents();
                MessageUtility.MessageBoxInfo("Event removed successfully!", "Record Deleted!", loadAllEvents)
                //swal('Event Removed Successfully !', "success");
            }
        });
    })
    //swal({
    //    title: `Are you sure you want to delete this record?`,
    //    text: "If you delete this, it will be gone forever.",
    //    icon: "warning",
    //    //buttons: true,
    //    //dangerMode: true,
    //    showCancelButton: true,
    //    confirmButtonClass: "btn-danger",
    //    confirmButtonText: "Yes, delete it!",
    //    closeOnConfirm: false

    //}, function () {
    //    $.get('/Home/DeleteEvent', 'id=' + eventId, function (response) {

    //        if (response.statusCode === 200) {
    //            loadAllEvents();
    //            swal('Event Removed Successfully !', "success");
    //        }
    //    });
    //})
}


//function RemoveEvent(eventId) {
//    if (swal("Are you sure you want to delete this ?")) {
//        $.get('/Home/DeleteEvent', 'id=' + eventId, function (response) {
//            if (response.statusCode === 200) {
//                loadAllEvents();
//                swal('Event Removed Successfully !', "success");
//            }
//        });
//    }

//}

function countCharacter() {
    $('#description-character-count').html($('#txt-description').val().length);
}

function clearEventForm() {
    $('#txt-title').val("");
    $('#txt-description').val("");
    $('#txt-time-date').val("");
}

function formBlankInputVlaidatons(controls) {
    var isValid = true;
    $.each(controls, function (index, inputId) {
        if ($(inputId).val() == "") {
            $(inputId).css('border-color', 'Red');
            $(inputId + '-message').html('This field can not be blank!').addClass('text-danger');
            isValid = false;
        }
        else {
            $(inputId).css('border-color', 'lightgrey');
            $(inputId + '-message').html('');
        }
    });

    return isValid

}
//Valdidation using jquery  
function validateEventForm() {

    var isValid = true;
    isValid = formBlankInputVlaidatons(controls);

    if (/[^\w\s]/.test($('#txt-title').val()) || /[^\w\s]/.test($('#txt-description').val())) {
        swal('Only _ , text and numbers are allowed ')
        isValid = false;
    }
    return isValid;
}


function toFormat(date, settings) {
    //Setting default valaues
    var defaults = {
        format: 'ddmmyyyy HH:mm',
       

    };

    settings = $.extend(defaults, settings);
    var d = '';
    try {
        d = new Date(date)
        if (d == 'Invalid Date' || d == NaN)
            throw DOMException;
    }
    catch (err) {
        try {
            d = new Date(date.match(/\d+/)[0] * 1)
            if (d == 'Invalid Date' || d == NaN)
                throw DOMException;
        }
        catch (err) {
            console.log('Entered date is invalid')
            return '';

        }
    }
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    switch (settings.format) {
        case 'yyyymmdd':
            return [year, month, day].join(settings.seperator);

        case 'mmddyyyy':
            return [month, day, year].join(settings.seperator);

        default:
            return [day + '-'+ month + '-'+ year + ' '+ hours + ':'+ minutes];

    }
}


function setDate(date) {
    if (date)
        return toFormat(date, { format: 'yyyymmdd', seperator: '-' });
    else
        return toFormat(new Date(), { format: 'yyyymmdd', seperator: '-' });

}



