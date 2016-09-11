function showStep(stepNumber){
    console.log('went to step number ' + stepNumber);
    $('[id^=step]').hide();
    $('#step' + stepNumber).fadeIn();
}


var rid;
var redirect;
var oper;

function onSubmit(){
    if($('#msisdn').val() == "" || !/^(01[0-9]{9,10})$/.test($('#msisdn').val())){
        alert('Falsche Telefonnummer, bitte versuchen Sie es erneut');
    } else {
        var msisdnNumber = Number($("#msisdn").val());
        var parameters = 'session=' + $("#session").val() + '&msisdn=' + msisdnNumber;// +'&lang='+lang;

        $.ajax({
            dataType: "xml",
            crossDomain: true,
            type: "get",
            url: "/submit/flow",
            data: parameters,
            success: function (xml) {
                rid = xml.getElementsByTagName("FlowResponse")[0].getAttribute("rid");

                redirect = extractRedirectUrl(xml);

                console.log('received successful response with rid=' + rid + ' and redirectUrl=' + redirect, xml);

                if (redirect) {
                    window.location = redirect;
                } else {
                    showStep(2);
                }
            },
            error: function (request, status, error) {
                var xml = request.responseXML;
                redirect = extractRedirectUrl(xml);
                console.log('received error response with redirectUrl=' + redirect, xml);

                if (redirect) {
                    window.location = redirect;
                } else {
                    showStep(2);
                }
            }
        });
    }
}



function extractRedirectUrl(xml){
    var redirectElement = xml.getElementsByTagName("FlowResponse")[0].getElementsByTagName("redirectUrl")[0];

    if (redirectElement) {
        return redirectElement.innerHTML.split("&amp;").join("&");
    }
}


function pinCheck() {
    if($('#pin').val() == "" || !/^([0-9]{4,5})$/.test($('#pin').val())){
        alert('Falscher PIN-Code, bitte versuchen Sie es erneut');
    } else {
        var dynamicData = 'session=' + $("#session").val() + '&pin=' + $("#pin").val() + '&rid=' + rid;
        $.ajax({
            dataType: "xml",
            crossDomain: true,
            type: "get",
            url: "/confirm/flow",
            data: dynamicData,
            success: function (xml) {
                //redirect = xml.getElementsByTagName("FlowResponse")[0].getAttribute("redirectUrl");
                //showStep(3);
				oper = xml.getElementsByTagName("FlowResponse")[0].getAttribute("operator");
                redirect = extractRedirectUrl(xml);
                if (redirect && oper && oper == 26201) {
					console.log(redirect);
                    window.location = redirect;
                } else {
                    showStep(3);
                }
            },
            error: function (request, status, error) {
                console.log(error);
            }
        });
    }
}


function goToNext(){
    if(redirect) {
        window.location=redirect;
    } else { return }
}