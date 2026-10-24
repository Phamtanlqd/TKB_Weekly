/** Smart Timetable V2.3 - Google Apps Script backend
 * 1) Tạo Google Sheet mới; 2) Extensions > Apps Script; 3) dán mã này;
 * 4) Deploy > New deployment > Web app, Execute as Me, access Anyone.
 * 5) Dán URL /exec vào js/cloud-config.js. Dữ liệu được lưu theo tuần.
 */
const SHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';
const DATA_SHEET = 'TimetableData';
const META_SHEET = 'TimetableMeta';
const ADMIN_TOKEN = 'CHANGE_ME_ADMIN_TOKEN'; // đổi cả ở frontend cloud-config.js
function doGet(e) {
  try {
    const week = Math.max(1, Math.min(52, Number(e.parameter.week || 7)));
    const payload = readWeek_(week);
    return json_( { ok:true, week:week, records:payload.records, meta:payload.meta } );
  } catch (err) { return json_({ok:false,error:String(err)}); }
}
function doPost(e) {
  try {
    const body = JSON.parse((e.postData && e.postData.contents) || '{}');
    if (body.token !== ADMIN_TOKEN || ADMIN_TOKEN === 'CHANGE_ME_ADMIN_TOKEN') throw new Error('Mã quản trị chưa đúng hoặc chưa được cấu hình.');
    const week = Number(body.week);
    if (!Number.isInteger(week) || week < 1 || week > 52) throw new Error('Tuần học không hợp lệ.');
    if (!Array.isArray(body.records)) throw new Error('Thiếu danh sách bản ghi.');
    const records = body.records.map(r => ({session:String(r.session||'morning'),recordType:String(r.recordType||(r.teacher?'teacher':'class')),teacher:String(r.teacher||''),subject:String(r.subject||''),class:String(r.class||'').toUpperCase(),room:String(r.room||''),day:Number(r.day),period:Number(r.period),source:String(r.source||'cloud'),teacherInferred:Boolean(r.teacherInferred),originalCell:String(r.originalCell||'')})).filter(r=>r.class && r.subject && r.day>=2 && r.day<=7 && r.period>=1 && r.period<=10);
    const ss = SpreadsheetApp.openById(SHEET_ID); const sh = ensureSheet_(ss, DATA_SHEET, ['week','session','recordType','teacher','subject','class','room','day','period','source','teacherInferred','originalCell']);
    const values = sh.getDataRange().getValues();
    // Xóa dữ liệu của đúng tuần, giữ nguyên các tuần khác.
    for (let i=values.length-1;i>=1;i--) if (Number(values[i][0])===week) sh.deleteRow(i+1);
    if (records.length) sh.getRange(sh.getLastRow()+1,1,records.length,12).setValues(records.map(r=>[week,r.session,r.recordType,r.teacher,r.subject,r.class,r.room,r.day,r.period,r.source,r.teacherInferred,r.originalCell]));
    const meta = {sourceFile:String(body.sourceFile||'Cập nhật trực tuyến'),updatedAt:new Date().toISOString(),updatedBy:String(body.updatedBy||'Quản trị'),count:records.length};
    const mh=ensureSheet_(ss,META_SHEET,['week','metaJson']); const mv=mh.getDataRange().getValues();
    for(let i=mv.length-1;i>=1;i--) if(Number(mv[i][0])===week) mh.deleteRow(i+1);
    mh.appendRow([week,JSON.stringify(meta)]);
    return json_({ok:true,week:week,count:records.length,meta:meta});
  } catch(err) { return json_({ok:false,error:String(err)}); }
}
function readWeek_(week) {
  const ss=SpreadsheetApp.openById(SHEET_ID); const sh=ensureSheet_(ss,DATA_SHEET,['week','session','recordType','teacher','subject','class','room','day','period','source','teacherInferred','originalCell']);
  const values=sh.getDataRange().getValues(); const records=[];
  for(let i=1;i<values.length;i++){const r=values[i];if(Number(r[0])===week)records.push({session:String(r[1]||'morning'),recordType:String(r[2]||'class'),teacher:String(r[3]||''),subject:String(r[4]||''),class:String(r[5]||''),room:String(r[6]||''),day:Number(r[7]),period:Number(r[8]),source:String(r[9]||'cloud'),teacherInferred:r[10]===true,originalCell:String(r[11]||'')});}
  const mh=ensureSheet_(ss,META_SHEET,['week','metaJson']); const mv=mh.getDataRange().getValues(); let meta={sourceFile:'Google Sheets',updatedAt:null,count:records.length};
  for(let i=1;i<mv.length;i++) if(Number(mv[i][0])===week){try{meta=JSON.parse(mv[i][1]);}catch(e){} }
  return {records:records,meta:meta};
}
function ensureSheet_(ss,name,headers){let sh=ss.getSheetByName(name);if(!sh)sh=ss.insertSheet(name);if(sh.getLastRow()===0)sh.appendRow(headers);return sh;}
function json_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
