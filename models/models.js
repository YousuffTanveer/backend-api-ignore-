const db = require("../db/connection");

exports.selectCategories = () => {
  let baseQuery = `SELECT * FROM categories`;

  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};

exports.selectReviewById = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Review not found" });
      }
      return rows[0];
    });
};

exports.selectUsers = () => {
  let baseQuery = `SELECT * FROM users`;

  return db.query(baseQuery).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Review not found" });
    }
    return rows;
  });
};

exports.updateReviewById = (review_id, votes) => {
  if (isNaN(review_id)) {
    return Promise.reject({ status: 400, msg: "Not a valid id" });
  }

  return db
    .query(
      "UPDATE reviews SET votes = (votes + $1) WHERE review_id = $2 RETURNING*",
      [votes, review_id]
    )
    .then(({ rows }) => {
      //console.log("rows;", rows);
      if (rows.length == 0) {
        return Promise.reject({ status: 404, msg: "Review not found" });
      } else {
        return rows[0];
      }
    });
};
