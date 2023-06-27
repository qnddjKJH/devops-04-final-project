const createBetParams = (userId, missionId, amount, transactionId) => {
  const betParams = {
    Entries: [
      {
        // Event envelope fields
        Source: 'mission_link',
        EventBusName: 'default',
        DetailType: 'transaction',

        // Main event body
        Detail: JSON.stringify({
          userid: userId,
          missionid: missionId,
          action: "bet",
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
  let action, missionResult;
  
  if(result === "success"){
    action = "success";
    missionResult = "mission success, mission deactivating"
  } else if(result === "fail"){
    action = "fail"
    missionResult = "mission fail, mission deactivating"
  }
  
  const resultParams = {
    Entries: [
      {
        // Event envelope fields
        Source: 'mission_link',
        EventBusName: 'default',
        DetailType: 'transaction',

        // Main event body
        Detail: JSON.stringify({
          missionid: missionId,
          action: action,
          result: missionResult,
          transactionId: transactionId,
        }),
      },
    ],
  };

  return resultParams;
};

module.exports = { createBetParams, missionresultParams };
