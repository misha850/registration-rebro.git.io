$(function() {
    $('.input-validation-error').addClass('is-invalid');
    
    var alertContainer = $('.messagesContainer.alert');
    if ($(alertContainer).length === 1 && $(alertContainer).html().trim().length > 0) {
        $(alertContainer).show();
    }
});