var warnings;

function getWarnings(){
    if(!warnings){
        warnings = []
    }
    return warnings;
}

function newWarning(lat, long, type, sent, sentBy){
    getWarnings()
    warnings[warnings.length] = 
        {
            // lat: 53.525870,
            // long: -113.518612,
            // type: "CPR",
            // sent: new Date(),
            // sentBy: sentBy
            lat,
            long,
            type,
            sent,
            sentBy
        };
}

module.exports = {
    getWarnings,
    newWarning
}