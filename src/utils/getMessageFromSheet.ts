import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { MESSAGE_SHEET_ID, MESSAGE_SHEET_TITLE } from '../constants';


type MessagesRowData = {
  name: string;
  message: string;
  color?: string;
  keepTop?: boolean;
};

export default async function getMessageListFromSheet() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(MESSAGE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  const targetSheet = doc.sheetsByTitle[MESSAGE_SHEET_TITLE];
  if (!targetSheet) {
    throw new Error(`Sheet with title "${MESSAGE_SHEET_TITLE}" not found.`);
  }

  const messages = []
  const rows = await targetSheet.getRows<MessagesRowData>();

  for (let i = 0; i < rows.length; i++) {
    messages.push({
      name: rows[i].get('name'),
      message: rows[i].get('message'),
      color: rows[i].get('color'),
      keepTop: rows[i].get('keepTop')
    })
  }
  return messages
}