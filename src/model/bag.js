const Pool = require("./../config/db");

const insertData = (data) => {
  const { id_product, id_users, amount } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO bag(id_product,amount,id_seller) VALUES('${id_product}','${amount}','${id_users}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};
const getBag = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT bag.id,bag.id_seller,bag.id_product,bag.amount, item.name as product_name, item.price as price,
      item.photo as photo FROM bag as bag
      INNER Join products as item ON bag.id_product = item.id
      WHERE bag.id_seller = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM bag WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const deleteAllCart = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM bag WHERE id_users='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};
module.exports = {
  insertData,
  getBag,
  deleteProduct,
  deleteAllCart,
};
