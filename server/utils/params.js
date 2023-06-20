const createBetParams = (missionId, amount, transactionId) => {
  const betParams = {
    Entries: [
      {
        // Event envelope fields
        Source: 'custom.myATMapp',
        EventBusName: 'default',
        DetailType: 'transaction',

        // Main event body
        Detail: JSON.stringify({
          missionid: missionId,
          body: "bat",
          amount: amount,
          result: "betting success",
          transactionId: transactionId,
        }),
      },
    ],
  };

  return betParams;
};

const missionresultParams = (missionId, transactionId, result) => {
  let body, missionResult;
  
  if(result === "success"){
    body = "success";
    missionResult = "mission success, mission deactivating"
  } else if(result === "fail"){
    body = "fail"
    missionResult = "mission fail, mission deactivating"
  }
  
  const resultParams = {
    Entries: [
      {
        // Event envelope fields
        Source: 'custom.myATMapp',
        EventBusName: 'default',
        DetailType: 'transaction',

        // Main event body
        Detail: JSON.stringify({
          missionid: missionId,
          body: body,
          result: missionResult,
          transactionId: transactionId,
        }),
      },
    ],
  };

  return resultParams;
};

module.exports = { createBetParams, missionresultParams };