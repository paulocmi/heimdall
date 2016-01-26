var jmeterBatCmd = "C:/GatewayConnectorTest/Jmeter_2.13/bin/jmeter.bat -n -t";
var jmeterTestResult = "C:/GatewayConnectorTest/Results";
var jmeterTestLog = "-l " + jmeterTestResult + "/Logs/";

var jmeterTestPath = {
    OneCardAuthorization: "C:/GatewayConnectorTest/Tests/OneCard/OneCardAuthorization.jmx",
    // TwoCards: "C:/GatewayConnectorTest/Tests/TwoCards/TwoCards.jmx",
    // CardAnfGift: "C:/GatewayConnectorTest/Tests/OneCardGift/CardAndGift.jmx",
    // BankIssued: "C:/GatewayConnectorTest/Tests/BankIssued/BankIssued.jmx",
    // BankIssuedGift: "C:/GatewayConnectorTest/Tests/BankIssuedGift/BankIssuedGift.jmx",
};


module.exports = {

    getTestCommand: function(testScenario, user,id) {
        testScenario = replaceAll(testScenario,"/","");
        return jmeterBatCmd + ' ' + jmeterTestPath[testScenario] + ' ' + "-Jpath=" + jmeterTestResult + '/' + user + '/' + id + '/';
    },
    getTestResultPath: function(){
        return jmeterTestResult;
    }
};

function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
        string = string.replace(token, newtoken);
    }
    return string;
}
