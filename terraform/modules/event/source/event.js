module.exports.params = {
  Entries: [ 
    {
      // Event envelope fields
      Source: 'custom.myATMapp',
      DetailType: 'transaction',
      Time: new Date(),

  // Main event body
    Detail: JSON.stringify({
      action: 'withdrawal',
      body: 'success',
      amount: 300,
      result: 'approved',
      transactionId: '123456',
      cardPresent: true,
      partnerBank: 'Example Bank',
      remainingFunds: 722.34
    })
  }
] 
}