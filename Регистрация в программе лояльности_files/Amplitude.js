// Scripts.Common.DateExtensions_js is required.

if (typeof IikoBiz == 'undefined' || !IikoBiz)
    var IikoBiz = {};

if (typeof IikoBiz.Loyalty == 'undefined' || !IikoBiz.Crm)
    IikoBiz.Loyalty = function() {};

IikoBiz.Loyalty.Amplitude = function(crmId, version) {
    var amplitudeSettings = {
        apiKey: 'a7bf6fb50dca1d4386391144e800ff46',
        ids: {
            regPageIsOpened: 'Loyalty registration page opened',
            regButtonIsClicked: 'Loyalty registration clicked ',
            confirmPhoneButtonIsClicked: 'Registration confirmed',
            loyaltyCardPageIsOpened: 'Loyalty card page opened',
            loyaltyCardIsSaved: 'Loyalty card saved'
        },
        keys: {
            guestNotification: 'guest_notification'
        }
    }

    // integration will work only on production.
    var disableIntergration = !window.isProductionSite();
    if (disableIntergration) {
        console.log('Integration with Amplitude is disabled');
    }

    this.logRegPageIsOpened = function() {
        if (disableIntergration)
            return true;

        // we do not know when external script is loaded, so solution uses interval.
        setLimitedInteval(function() {
            var userProperties = getDefaultUserProperties();
            userProperties[amplitudeSettings.keys.guestNotification] = 1;
            return logEvent(amplitudeSettings.ids.regPageIsOpened, userProperties);
        });
    };

    this.logLoyaltyCardPageIsOpened = function() {
        if (disableIntergration)
            return true;

        // we do not know when external script is loaded, so solution uses interval.
        setLimitedInteval(function() {
            return logEvent(amplitudeSettings.ids.loyaltyCardPageIsOpened);
        });
    };

    this.logConfirmPhoneButtonIsClicked = function() {
        if (disableIntergration)
            return true;

        try {
            logEvent(amplitudeSettings.ids.confirmPhoneButtonIsClicked);
        } catch (ex) {
            console.log(ex);
        }
        return true;
    }

    this.logLoyaltyCardIsSaved = function() {
        if (disableIntergration)
            return true;

        try {
            logEvent(amplitudeSettings.ids.loyaltyCardIsSaved);
        } catch (ex) {
            console.log(ex);
        }
        return true;
    }

    this.logRegButtonIsClicked = function() {
        if (disableIntergration)
            return true;

        try {
            var userProperties = getDefaultUserProperties();
            userProperties[amplitudeSettings.keys.guestNotification] =
                $('#ShouldReceivePromoActionsInfo:checked').length > 0 ? 1 : 0;
            logEvent(amplitudeSettings.ids.regButtonIsClicked, userProperties);
        } catch (ex) {
            console.log(ex);
        }
        return true;
    }

    function setLimitedInteval(repeatedFunc) {
        var attempts = 0;
        var attemptsMax = 20;
        var intervalId = setInterval(function() {
                attempts++;
                if (attempts > attemptsMax) {
                    clearInterval(intervalId);
                    return;
                }

                try {
                    if (repeatedFunc()) {
                        clearInterval(intervalId);
                        return;
                    }
                } catch (ex) {
                    console.log(ex);
                    clearInterval(intervalId);
                }
            },
            2000);
    }

    function logEvent(eventId, userProperties) {
        var amplitude = window.amplitude;
        if (!!amplitude) {
            if (!userProperties) {
                userProperties = getDefaultUserProperties();
            }
            amplitude.getInstance().init(amplitudeSettings.apiKey);
            amplitude.getInstance().setUserProperties(userProperties);
            amplitude.getInstance().setVersionName(version);
            amplitude.getInstance().logEvent(eventId);
            return true;
        }
        return false;
    }

    function getDefaultUserProperties() {
        var now = new Date();
        return {
            cohort_day: now.getDayInYear(),
            cohort_week: now.getWeekInYear(),
            cohort_month: now.getMonth() + 1,
            org_id: crmId
        };
    }

    return this;
}