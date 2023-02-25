if (!IikoBiz) {
    IikoBiz = {};
}

if (!IikoBiz.Loyalty) {
    IikoBiz.Loyalty = {};
}

IikoBiz.Loyalty.Get = function (context) {
    // https://gijgo.com/datepicker/configuration
    var birthdayFormat = 'dd.mm.yyyy';
    var birhdayMask = '00.00.0000';
    var $birthday = $('#Birthday');
    $birthday.datepicker({
        locale: context.locale === "ru-RU" ? "ru-ru" : "en-us",
        weekStartDay: 1,
        uiLibrary: 'bootstrap4',
        format: birthdayFormat,
        minDate: '01.01.1900',
        maxDate: getMaxDateToPick()
    });

    
    $birthday.mask(birhdayMask);

    $birthday.keyup(onBirthdayChanged);

    function onBirthdayChanged() {
        var value = $birthday.val();
        value = addPointToDate(value, 2);
        value = addPointToDate(value, 5);
        if (value.length > birthdayFormat.length) {
            value = value.slice(0, birthdayFormat.length);
        }
        $birthday.val(value);
    }

    function addPointToDate(source, position) {
        if (source.length >= position && source[position] !== '.')
            return [source.slice(0, position), '.', source.slice(position)].join('');
        return source;
    }

    function getMaxDateToPick() {
        var today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }

    var phoneMask = '+0000000000099';
    var $phone = $('#Phone');
    $phone.mask(phoneMask, { placeholder: context.enterPhoneText });
    if ($phone.val().length === 0) {
        $phone.val("+");
    }

    var amplitudeApi = new IikoBiz.Loyalty.Amplitude(context.crmId, context.productVersion);
    amplitudeApi.logRegPageIsOpened();

    this.submitForm = function() {
        amplitudeApi.logRegButtonIsClicked();
        $('form').submit();
    };

    return this;
}