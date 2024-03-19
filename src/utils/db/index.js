import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("sessions.db");

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessionUser (localId TEXT NOT NULL, email TEXT NOT NULL, tokenId TEXT NOT NULL, updateAt INTEGER)",
        [],
        (_, result) => res(result),
        (_, result) => rej(result)
      );
    });
  });
  return promise;
};

export const insertSession = ({ localId, email, idToken }) => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sessionUser (localId, email, tokenId, updateAt) VALUES (?,?,?,strftime('%s', 'now'))",
        [localId, email, idToken],
        (_, result) => res(result),
        (_, result) => rej(result)
      );
    });
  });
  return promise;
};

export const fetchSession = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM sessionuser"),
        [],
        (_, result) => res(result),
        (_, result) => rej(result);
    });
  });
  return promise;
};

export const deleteSession = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM sessionuser"),
        [],
        (_, result) => res(result),
        (_, result) => rej(result);
    });
  });
  return promise;
};
