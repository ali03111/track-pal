import contact from 'react-native-contacts';
import API from '../Utils/helperFunc';
import {sendNumberToServerUrl, sendUpdatedAtUrl} from '../Utils/Urls';
import SQLite from 'react-native-sqlite-storage';
import {store} from '../Redux/Reducer';
import {types} from '../Redux/types';

const {Platform, PermissionsAndroid, Alert} = require('react-native');
const {
  PERMISSIONS,
  check,
  openSettings,
  request,
} = require('react-native-permissions');

export let db = SQLite.openDatabase(
  'userContact.db',
  '1.0',
  'Contact Database',
  200000,
);

const perSKU = Platform.select({
  ios: PERMISSIONS.IOS.CONTACTS,
});

const checkContactPermission = async () => {
  if (Platform.OS == 'ios') {
    const status = await check(perSKU);
    console.log('statusstatusstatusstatusstatus', status);
    if (status == 'granted') return true;
    else {
      const req = await request(perSKU);
      if (req == 'granted') return true;
      else {
        Alert.alert(
          'Warning',
          `Please allow you contact permission to create trip..`,
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Open Setting',
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('Cannot open settings'),
                );
              },
            },
          ],
          {
            userInterfaceStyle: 'light',
          },
        );
        return false;
      }
    }
  } else if (Platform.OS == 'android') {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    console.log('grantedgrantedgrantedgrantedgranted', granted);
    if (granted == PermissionsAndroid.RESULTS.GRANTED) return true;
    else {
      const req = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (req == PermissionsAndroid.RESULTS.GRANTED) return true;
      else {
        Alert.alert(
          'Warning',
          `Please allow you contact permission to create trip..`,
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Open Setting',
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('Cannot open settings'),
                );
              },
            },
          ],
          {
            userInterfaceStyle: 'light',
          },
        );
        return false;
      }
    }
  }
};

const checkPermissionHandler = async () => {
  const checkPer = await contact.checkPermission();
  console.log('checkPercheckPercheckPercheckPercheckPer', checkPer);
  if (checkPer == 'authorized') return true;
  else {
    console.log('reqPerreqPerreqPerreqPerreqPer');
    const reqPer = await contact.requestPermission();
    if (reqPer == 'authorized') return true;
    else {
      Alert.alert(
        'Warning',
        `Please allow you contact permission to create trip..`,
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Open Setting',
            onPress: () => {
              openSettings().catch(() => console.warn('Cannot open settings'));
            },
          },
        ],
        {
          userInterfaceStyle: 'light',
        },
      );
      return false;
    }
  }
};

const perAlertBox = () => {
  Alert.alert(
    'Warning',
    `Please allow you contact permission to create trip..`,
    [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Open Setting',
        onPress: () => {
          openSettings().catch(() => console.warn('Cannot open settings'));
        },
      },
    ],
    {
      userInterfaceStyle: 'light',
    },
  );
};

const removeSpaceFromNumber = num => {
  return num.map(number => number.replace(/\s/g, ''));
};

const checkContactToSql = async sqlContacts => {
  const confirmPer = await checkContactPermission();
  if (confirmPer) {
    const phoneBookContact = await contact.getAll();
    console.log(
      'confirmPerconfirmPerconfirmPerconfirmPerconfirmPerconfirsdsdmPerconfirmPerconfirmPerconfirmPerconfirmPer',
      phoneBookContact,
    );
    const filterContact = filterNumberFromArry(phoneBookContact);
    console.log(
      'sqlContactssqlContactssqlContactssqlContactssqlContactssqlContacts',
      sqlContacts,
    );
    // Extract phone numbers into an array
    const phoneNumbers = sqlContacts.map(item => item.phone);
    const removeSpace = removeSpaceFromNumber(filterContact);
    const checkNewContact = [
      ...removeSpace.filter(value => !phoneNumbers.includes(value)),
      // ...phoneNumbers.filter(value => !filterContact.includes(value)),
    ];
    console.log(
      'checkNewContactcheckNewContasdsdsctcheckNewContact',
      checkNewContact,
      ...removeSpace.filter(value => !phoneNumbers.includes(value)),
    );
    // Remove spaces from each number
    let numbersWithoutSpaces = removeSpaceFromNumber(checkNewContact);

    return numbersWithoutSpaces;
  } else if (!confirmPer && Platform.OS == 'android') {
    perAlertBox();
  }
  return null;
};

const updateDataAccourdingToId = updateData => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  db.transaction(tx => {
    const userId = userData.id;
    const phonebookData = updateData.book; // JSON data as a string
    const updatedAt = updateData.updated_at; // Current timestamp

    tx.executeSql(
      'UPDATE phonebook SET book = ?, updated_at = ? WHERE user_id = ?',
      [phonebookData, updatedAt, userId],
      (tx, results) => {
        console.log(`Rows affected: ${results.rowsAffected}`);
      },
      (tx, error) => {
        console.error(`Error updating data: ${error.message}`);
      },
    );
  });
};

const getContactFromSql = async () => {
  console.log('lskdnklnsdklfnsdklfnklsdn', db);
  const {
    Auth: {userData},
  } = store.getState('Auth');
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM phonebook WHERE user_id = ?`,
      [userData.id], // Replace 1 with the desired user_id value
      async (tx, results) => {
        const len = results.rows.length;
        console.log('klsdnklnskdfnsdkfnksdn', len);
        for (let i = 0; i < len; i++) {
          const row = results.rows.item(i);
          await store.dispatch({
            type: types.addContacts,
            payload: JSON.parse(row.book),
          });
          // contacts.book = await JSON.parse(row.book);
          // contacts = await JSON.parse(row.book);
        }
      },
      (yx, error) => {
        console.log('lksdnknsdlkfbkjsdbfjksbdjkfbsdjbfjsdbfbsdbfsd', error);
      },
    );
  });
};

const sendUpdatedAt = () => {
  const {
    Auth: {userData},
  } = store.getState('Auth');
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM phonebook WHERE user_id = ?`,
      [userData.id], // Replace 1 with the desired user_id value
      async (tx, results) => {
        const len = results.rows.length;
        for (let i = 0; i < len; i++) {
          const row = results.rows.item(i);
          console.log('rowrowrowrowrowrowrowrowrowrow', row);
          store.dispatch({
            type: types.addContacts,
            payload: JSON.parse(row.book),
          });
          const newContacts = await checkContactToSql(JSON.parse(row.book));
          const {ok, data} = await API.post(sendUpdatedAtUrl, {
            updated_at: row.updated_at,
            book: newContacts,
          });
          console.log('data.bookdata.bookdata.book', data);
          if (ok) {
            if (data?.book?.length > 0) updateDataAccourdingToId(data);
          }
          console.log(`Oget by userID   User ID: ${newContacts}`);
        }
      },
    );
  });
};

const filterNumberFromArry = phoneBook => {
  const phoneNumbersArray = phoneBook.map(
    contact => contact.phoneNumbers[0]?.number,
  );
  const filteredPhoneNumbers = phoneNumbersArray.filter(
    number => number !== undefined,
  );
  return filteredPhoneNumbers;
};

const sendPhoneBookTOServer = async () => {
  const confirmPer = await checkContactPermission();
  console.log('confirmPerconfirmPerconfirmPerconfirmPerconfirmPer', confirmPer);
  if (confirmPer) {
    const phoneBook = await contact.getAll();
    console.log(
      'phoneBookphoneBookphoneBookphoneBook',
      Platform.OS,
      phoneBook,
      filterNumberFromArry(phoneBook),
    );
    const removeSpace = removeSpaceFromNumber(filterNumberFromArry(phoneBook));
    const {ok, data} = await API.post(sendNumberToServerUrl, {
      book: removeSpace,
    });
    console.log('sjkdnkfnsdknfsdklnflksdnfknsdlfnsdlnfsdklf', data);
    if (ok) {
      store.dispatch({
        type: types.addContacts,
        payload: JSON.parse(data.book),
      });

      // Create the phonebook table
      db.transaction(tx => {
        tx.executeSql(`
    CREATE TABLE IF NOT EXISTS phonebook (
      user_id INTEGER PRIMARY KEY,
      book TEXT,
      updated_at TEXT
    )
  `);
        // Example: Insert data into the phonebook table
        const userId = data.user_id;
        const phonebookData = data.book; // JSON data as a string
        const updatedAt = data.updated_at; // Current timestamp

        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO phonebook (user_id, book, updated_at) VALUES (?, ?, ?)',
            [userId, phonebookData, updatedAt],
          );
        });

        // Example: Query data from the phonebook table
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM phonebook', [], (tx, results) => {
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              console.log(
                `On Create   User ID: ${row.user_id}, Phonebook: ${row.book}, Updated At: ${row.updated_at}`,
              );
            }
          });
        });
      });
    } else {
      console.log('khjsdbjkvdjfsvdf', data);
    }
  } else if (!confirmPer && Platform.OS == 'android') {
    perAlertBox();
  }
};

const checkSqlDataBase = () => {
  // Example: Query data from the phonebook table
  db.transaction(tx => {
    if (tx.success) {
      tx.executeSql('SELECT * FROM phonebook', [], (tx, results) => {
        const len = results.rows.length;
        console.log('kenthsugdugsudgsugdusgdugsdgs', len);
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            sendUpdatedAt();
            console.log(
              `On GET User ID: ${row.user_id}, Phonebook: ${row.book}, Updated At: ${row.updated_at}`,
            );
          }
        }
      });
    } else {
      sendPhoneBookTOServer();
    }
  });
};

export {
  // checkContactPermission,
  sendPhoneBookTOServer,
  checkSqlDataBase,
  sendUpdatedAt,
  getContactFromSql,
};
