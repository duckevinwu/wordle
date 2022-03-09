const sqlite3 = require('sqlite3').verbose();

const dbPath = '../../../db/wordle.db';

const checkConnection = () => {
  const db = new sqlite3.Database(dbPath, (err) => {
    console.log('establishing database connection');
    if (err) return console.error(err.message);
  });

  db.close((err) => {
    console.log('closing database connection');
    if (err) return console.error(err.message);
  });
}

const testInsert = () => {
  const db = new sqlite3.Database(dbPath);
  const query = `
    INSERT INTO Challenge (ChallengeID, Word)
    VALUES ("A", "hello")
  `;
  db.run(query, [], (err) => {
    if (err) return console.log(err.message);
    console.log('insert successful')
  })
  db.close();
}

const testSelect = () => {
  const db = new sqlite3.Database(dbPath);
  const query = `
    SELECT *
    FROM Challenge
  `;
  db.all(query, [], (err, rows) => {
    if (err) return console.log(err.message);
    console.log(rows);
  });
  db.close();
}

const clearTables = () => {
  const db = new sqlite3.Database(dbPath);
  const query = `
    DELETE FROM Challenge;
    DELETE FROM Solution;
  `;
  db.run(query, [], (err) => {
    if (err) return console.log(err.message);
    console.log('delete successful');
  });
}

testSelect();
