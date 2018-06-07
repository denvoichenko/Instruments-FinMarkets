exports.reportCode = {
buildReport: function(reportParams){
  var me = this

  var today = new Date(),
  curMonth = today.getMonth(),
  curYear = today.getFullYear();
  var mBegin = new Date(today.getFullYear(), today.getMonth(), 1) //Get first date of current month
  var mEnd = new Date(today.getFullYear(), today.getMonth()+1, 1) //Get first date of next month

  return UB.Repository('req_reqList')
    .attrs(['reqDate', 'applicantInfo', 'reqText','answer','status'])
    .where('department','equal', 331308542722153) //Set your departments ID from Departmments form!!
    .where('status', 'equal', 'CLOSED') //get closed requests
    .where('reqDate', '>=', mBegin) //get requests in current month
    .where('reqDate', '<', mEnd)
    .selectAsObject()
    .then( function (resp) {
      var data = {
        req_reqList: resp,
        curMonth: curMonth + 1,
        curYear:  curYear
      };
      reportParams = data;
      var result;
      switch (me.reportType) {
      case 'pdf':
        console.log('Create PDF');
        result = me.buildHTML(reportParams);
        result = me.transformToPdf(result);
        break
      case 'html': 
        console.log('Create HTML');
        result = me.buildHTML(reportParams);
        break
      case 'xlsx':           
        console.log('Create XLSX');
        result = me.buildXLSX(reportParams);
        break
      }      
      return result;
    })
}
};
