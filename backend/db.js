var warnings;

function getWarnings(){
    if(!warnings){
        warnings = []
    }

    return warnings;
}

function newWarning(){
    warnings[warnings.length] = [
        {
            lat: 53.55,
            long: -113.47,
            type: "CPR"
        },
        {
            lat: 53.55,
            long: -113.47,
            type: "NALOXONE"
        }
    ]
}

module.exports = {
    getWarnings,
    newWarning
}