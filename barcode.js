 function doGet(e) {
    var no = e.parameter.no;
    var datetime = new Date();
    var today = Utilities.formatDate(datetime,'JST', 'yyyy/MM/dd');
    var userid = Session.getActiveUser().getEmail();
    var sht = SpreadsheetApp.getActive().getSheetByName('備品');
    var lastRow = sht.getLastRow();
    const values = sht.getRange(3, 1, lastRow - 2).getValues().flat();
    var r = values.indexOf(no) + 3;
    sht.getRange(r, 5).setValue(datetime);
    sht.getRange(r, 6).setValue(userid);
    return ContentService.createTextOutput(today + "\n" + sht.getRange(r, 2).getValue() + "\n" + userid);
  }