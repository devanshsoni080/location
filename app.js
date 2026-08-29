function doGet(e) {
  return ContentService.createTextOutput("Google Sheet API is working").setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    // =====================================================
    // GOOGLE SHEET
    // =====================================================

    const spreadsheetId = "1fmzWLyXqdvbpfKhuulRrJ6c2jEdRpOaueAkwQbRAT_4";

    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];

    // =====================================================
    // GET POST DATA
    // =====================================================

    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: "POST data not received",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    // =====================================================
    // CHECK DATA
    // =====================================================

    if (!data.dateTime || !data.latitude || !data.longitude || !data.accuracy || !data.mapsURL) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: "Required data missing",
          received: data,
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // =====================================================
    // SAVE TO GOOGLE SHEET
    // =====================================================

    sheet.appendRow([data.dateTime, data.latitude, data.longitude, data.accuracy, data.mapsURL]);

    // =====================================================
    // SUCCESS
    // =====================================================

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Location data saved successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // =====================================================
    // ERROR
    // =====================================================

    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
