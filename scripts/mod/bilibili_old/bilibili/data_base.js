function open(db_name) {
  return $sqlite.open(`${db_name}.db`);
}

function close(db) {
  return $sqlite.close(db);
}

function load(db_name, table_name, key_id) {
  const db = open(`${db_name}.db`);
  db.query({
    sql: "SELECT * FROM ? where id = ?",
    args: [table_name, key_id]
  }, (rs, err) => {

  });
  close(db);
}
module.exports = {
  open
};