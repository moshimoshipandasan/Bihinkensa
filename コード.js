// **************************************************
// 内容:備品検査
// 作成日:2021/06/18
// 作成者:noboru ando
// **************************************************
function onOpen() {
  SpreadsheetApp
    .getActiveSpreadsheet()
    .addMenu('備品検査', [
//      {name: '1.生徒ラベル作成', functionName: 'seitolabel'},
//      {name: '2.生徒一覧取得', functionName: 'studentdata'},
//      {name: '3.クラス一覧取得', functionName: 'classroomdata'},
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

function classroomdata(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sht = ss.getSheetByName('クラス一覧');
  var response = Classroom.Courses.list({});
  var courses = response.courses;
  var course = "";
  for (i = 0; i < courses.length; i++) {
    course = courses[i];
    sht.getRange(i+2, 1).setValue(course.name);
    sht.getRange(i+2, 2).setValue(course.id);
  }
}

function studentdata(){
  var ck = Browser.msgBox("生徒一覧を新たに作成します。データはすべて初期化されます。", "作成しますか？", Browser.Buttons.OK_CANCEL);
  if (ck == 'ok') {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sht1 = ss.getSheetByName('クラス一覧');
  var sht2 = ss.getSheetByName('生徒一覧');
  sht2.clear();
  sht2.appendRow(["No","メール", "生徒氏名", "メッセージ", "送信する場合は1を入力"]);
  courseId = String(sht1.getRange(2, 2).getValue());
  var seito = getStudentListMax(courseId);
  //  Logger.log(seito);//生徒のアドレス出力
  //　生徒一覧に書き出し
  for (i = 0; i < seito.length; i++) {
      sht2.appendRow([i+1, seito[i][0], seito[i][1], "", ""]);
  }
    }
    if (ck == 'cancel') {
      Browser.msgBox("キャンセルを押しました");
    }
}


function createAnnouncements(){
  var ck = Browser.msgBox("Okを押すと、生徒に個別メッセージを送ります。", "送りますか？", Browser.Buttons.OK_CANCEL);
  if (ck == 'ok') {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sht1 = ss.getSheetByName('クラス一覧');
  var sht2 = ss.getSheetByName('生徒一覧');
  courseId = String(sht1.getRange(2, 2).getValue());
    const lastRow = sht2.getLastRow();
    for (let i = 2; i <= lastRow; i++) {
      if (sht2.getRange(i, 5).getValue() == 1) {
        const values = sht2.getRange(i, 1, 1, 4).getValues();
        console.log(values);
        postAnounceIndividual(courseId, values[0][1], values[0][2], values[0][3]);
        sht2.getRange(i, 5).setValue('済');
      }
    }
    Browser.msgBox("ストリームに、個別メッセージを送信しました。");
    }
    if (ck == 'cancel') {
      Browser.msgBox("キャンセルを押しました");
    }
  }


// @phys-kenさん作成 https://qiita.com/phys-ken/items/269a118df0bc0c895ad4
function getStudentListMax(classId) {
  let pageToken = "";
  var cnt = 0;
  let allStudentList = [];
  do {
    let studentList = Classroom.Courses.Students.list(classId, { "pageToken": pageToken });
    for (i = 0; i < studentList['students'].length; i++) {
      let student = studentList['students'][i];
      allStudentList.push([student['profile']['emailAddress'], student['profile']['name']['fullName']]);//生徒のアドレスを配列に追加
    }
    pageToken = studentList.nextPageToken;
    cnt = cnt + 1;
  } while (pageToken);
  return allStudentList;
}

// @phys-kenさん作成 https://qiita.com/phys-ken/items/269a118df0bc0c895ad4
function postAnounceIndividual(target, mailAdressStr, nameStr, textStr) {
  studentList = [mailAdressStr];
  var data = {
    "courseId": String(target),
    "text": nameStr + "さんへ(個別メッセージ) \n \n " + textStr,
    "assigneeMode": "INDIVIDUAL_STUDENTS",
    "individualStudentsOptions": {
      "studentIds": studentList//スプレッドシートから取得した生徒のIDリストを渡す
    },
    "state": "PUBLISHED"
  };
  Classroom.Courses.Announcements.create(data, String(target));
  Logger.log(studentList + "_" + textStr + "______anounce!!");
}
