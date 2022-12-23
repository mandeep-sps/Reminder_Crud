//Date Extenstions
function toFormat(date, settings) {
    //Setting default valaues
    var defaults = {
        format: 'ddmmyyyy',
        seperator: '/'
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
        year = d.getFullYear();

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
            return [day, month, year].join(settings.seperator);

    }
}

function setDate(date) {
    if (date)
        return toFormat(date, { format: 'yyyymmdd', seperator: '-' });
    else
        return toFormat(new Date(), { format: 'yyyymmdd', seperator: '-' });

}


//Select Drop extentions
function refreshDropdown(element, data) {
    $(element).empty();
    $(element).selectpicker();
    $.each(data, function (index, item) {
        $(element).append("<option value=" + item.Id + ">" + item.Name + "</option>");
    });
    $(element).selectpicker('refresh')
}



class MessageUtility {
    constructor() { }
    static MessageBox(message, settings, callback, callback_2) {
        debugger
        //Default Settings/Parameters values
        var defaults = {
            modalId: '#sporta-modal-dialog',
            divId: '#sporta-modal-dialog-div', //add div element with this id for injection.
            modalSize: 'modal-md', //variants: modal-md(medium size), modal-lg(large size)
            type: 'info', // four types (int/string): 1/'success', 2/'error', 3/'warinng', 4/'info'
            heading: 'Message Box',
            heading_icon: '',
            message: message,
            buttonText: ['OK'],
        };
        let globalSettings = $.extend(defaults, settings);
        //To remove any previous shown popup shadow
        $('.modal-backdrop').remove();
        $('.customized').remove();
        let icon,
            btnClass,
            borderClass
        //Type Settings
        switch (globalSettings.type) {
            case 'success':
            case 1:
                if (!globalSettings.heading)
                    globalSettings.heading = "Successful!";
                if (!globalSettings.heading_icon)
                    globalSettings.heading_icon = "<i class='text-success fas fa-check-circle'></i> ";
                btnClass = "btn-outline-success";
                icon = "<h4>" + globalSettings.heading_icon + "&nbsp; " + globalSettings.heading + "</h4>";
                borderClass = 'border-success';
                break;
            case 'danger':
            case 'error':
            case 2:
                if (!globalSettings.heading)
                    globalSettings.heading = "Error!";
                if (!globalSettings.heading_icon)
                    globalSettings.heading_icon = "<i class='text-red fas fa-times-circle'></i> ";
                btnClass = 'btn-outline-danger';
                icon = "<h4>" + globalSettings.heading_icon + "&nbsp; " + globalSettings.heading + "</h4>";
                borderClass = 'border-danger';
                break;
            case 'warning':
            case 3:
                if (!globalSettings.heading)
                    globalSettings.heading = "Warning!";
                if (!globalSettings.heading_icon)
                    globalSettings.heading_icon = "<i class='text-warning fas fa-exclamation-circle'></i> ";
                btnClass = 'btn-outline-warning';
                icon = "<h4>" + globalSettings.heading_icon + "&nbsp; " + globalSettings.heading + "</h4>";
                borderClass = 'border-warning';
                break;
            case 'info':
            case 4:
                if (!globalSettings.heading)
                    globalSettings.heading = "Information";
                if (!globalSettings.heading_icon)
                    globalSettings.heading_icon = "<i class='text-info fas fa-info-circle'></i> ";
                btnClass = 'btn-outline-info';
                icon = "<h4>" + globalSettings.heading_icon + "&nbsp; " + globalSettings.heading + "</h4>";
                borderClass = 'border-info';
                break;
        }
        //Modal Creation
        var modalHtml = "<div id='" + globalSettings.modalId.replace('#', '') + "' class='modal customized shadow' style='z-index:9990' role='dialogue'>"
            + "<div class='modal-dialog modal-dialog-centered modal-dialog-scrollable " + globalSettings.modalSize + "'>"
            + "<div class='modal-content'>"
            + "<div class='modal-header justify-content-center " + borderClass + "'>"
            + "" + icon + ""
            + "</div>"
            + "<div class='modal-body text-center'>"
            + "<p>" + globalSettings.message + "</p>"
            + "</div>";
        modalHtml += "<div class='modal-footer justify-content-center " + borderClass + "'>";
        switch (globalSettings.buttonText.length) {
            case 1:
                modalHtml += "<button type='button' id='btn-callback'  class='btn btn-sm " + btnClass + "' style='border-radius:5px!important;width:25%' data-bs-dismiss='modal'>" + globalSettings.buttonText[0] + "</button>";
                break;
            case 2:
                modalHtml += "<button type='button' id='btn-callback' class='btn btn-sm " + btnClass + "' style='border-radius:5px!important;width:25%' data-bs-dismiss='modal'>" + globalSettings.buttonText[0] + "</button > "
                    + "<button type='button'  class='btn btn-sm btn-outline-secondary'  style='border-radius:5px!important;width:25%' data-bs-dismiss='modal'>" + globalSettings.buttonText[1] + "</button > ";
                break;
            case 3:
                modalHtml += "<button type='button' id='btn-callback' class='btn btn-sm " + btnClass + "' style='border-radius:5px!important;width:25%' data-bs-dismiss='modal'>" + globalSettings.buttonText[0] + "</button > "
                    + "<button type='button' id='btn-callback-2' class='btn btn-sm " + btnClass + "' style='border-radius:5px!important;width:25%' data-bs-dismiss='modal'>" + globalSettings.buttonText[1] + "</button > "
                    + "<button type='button'  class='btn btn-sm btn-outline-secondary'  style='border-radius:5px!important;width:25%' data-bs-dismiss='modal'>" + globalSettings.buttonText[2] + "</button > ";
                break;
        }
        modalHtml += "</div>"
            + "</div>"
            + "</div>"
            + "</div>";
        //Injecting the Modal in div


        $(globalSettings.divId).html(modalHtml);
        debugger
        const messageModal = new bootstrap.Modal(globalSettings.modalId, {
            keyboard: false,
            backdrop: 'static'
        })
        messageModal.show();
        //$(globalSettings.modalId).modal({ backdrop: 'static', keyboard: true });
        //$(globalSettings.modalId).modal('show');

        //Setting the focus on load
        $(globalSettings.modalId).on('shown.bs.modal', function (event) {
            $("#btn-callback").focus();
        });
        $('#btn-callback').on('click', function () {
            if (callback !== undefined)
                callback();
            else
                $(globalSettings.modalId).modal('hide');
        });
        $('#btn-callback-2').on('click', function () {
            if (callback_2 !== undefined)
                callback_2();
            else if (globalSettings.buttonText.length > 2)
                alert('Callback function is not defined for' + globalSettings.buttonText[1] + ' button')
        });
    }
    static MessageBoxInfo(message, heading, callback) {
        let settings = {
            type: 'info',
            heading: heading ? heading : 'Information',
            heading_icon: '<i class="fas text-info fa-exclamation-circle"></i>',
            message: message,
            buttonText: ['OK'],
        };
        this.MessageBox(message, settings, callback);
    }
    static MessageBoxWarning(message, heading, callback) {
        let settings = {
            type: 'warning',
            heading: heading ? heading : 'Warning',
            heading_icon: '<i class="fas text-warning fa-exclamation-triangle"></i>',
            message: message,
            buttonText: ['OK'],
        };
        this.MessageBox(message, settings, callback);
    }
    static MessageBoxSuccess(message, heading, callback) {
        let settings = {
            type: 'success',
            heading: heading ? heading : 'Success',
            heading_icon: '<i class="fas text-success fa-check-circle"></i>',
            message: message,
            buttonText: ['OK'],
        };
        this.MessageBox(message, settings, callback);
    }
    static MessageBoxDanger(message, heading, callback) {
        let settings = {
            type: 'error',
            heading: heading ? heading : 'Error',
            heading_icon: '<i class="fas text-danger fa-times-circle"></i>',
            message: message,
            buttonText: ['OK'],
        };
        this.MessageBox(message, settings, callback);
    }
    static ConfirmDialogue(message, settings, callback, callback_2) {
        let defaults = {
            type: 'danger',
            heading: 'Confirmation',
            heading_icon: '<i class="fas text-danger fa-exclamation-circle"></i>',
            message: message,
            buttonText: ['YES', 'NO'],
        };
        settings = $.extend(defaults, settings);
        this.MessageBox(message, settings, callback, callback_2);
    }
}



