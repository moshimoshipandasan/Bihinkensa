/**
 * @fileoverview 備品検査用 Google Apps Script
 * スプレッドシートのメニューから備品ラベル（QRコード）を生成します。
 * @version 1.1
 * @date 2024-04-03 (Last update based on recent changes)
 * @author noboru ando
 * @license MIT
 */
function onOpen() {
  SpreadsheetApp
    .getActiveSpreadsheet()
    .addMenu('備品検査', [
      {name: '備品ラベル作成', functionName: 'bihinlabel'},
    ]);
}

function bihinlabel(){
  var sht = SpreadsheetApp.getActive().getSheetByName('備品');
  var lastRow = sht.getLastRow();
  for (var i=3; i<=lastRow; i++) {
      sht.getRange(i, 3).clear();
      sht.getRange(i, 4).clear();
      var qrc1 = '=\"https://script.google.com/macros/s/\"&$B$1&\"/exec?no=\"&A' + i;
      // Use api.qrserver.com for QR code generation, ensuring data is URL encoded
      var qrc2 = '=image("https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="&ENCODEURL(C' + i + '))';
      sht.getRange(i, 3).setValue(qrc1);
      sht.getRange(i, 4).setValue(qrc2);
  }
}
