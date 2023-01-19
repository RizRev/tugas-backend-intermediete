const Pool = require("./../config/db");

const insertData = (data) => {
  const { id_product, id_users, total, amount, id_toko } = data;
  console.log(data);
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO transactions(id_product,total,customer_id,amount,status,seller_id) VALUES('${id_product}','${total}','${id_users}','${amount}','0','${id_toko}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
          console.log(err);
        }
      }
    );
  });
};

const updateStatusPayment = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE transactions SET status='1' where id='${id}'`,
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

const updateStatusTerima = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE transactions SET status='2' where id='${id}'`,
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

const updateStatusShipping = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE transactions SET status='3' where id='${id}'`,
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

const updateStatusDone = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE transactions SET status='4' where id='${id}'`,
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

const findStatus = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM transactions where id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findToko = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM products where id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getDetailOrder = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT orders.id,orders.status,orders.total ,orders.amount,product.name as product_name,product.price as price, 
      product.category_id as category,product.photo as photo,users.alamat as alamat,users.fullname as username from transactions as orders 
      INNER JOIN products as product ON orders.id_product = product.id
      INNER JOIN users as users ON orders.seller_id = users.id 
      WHERE orders.id = '${id}'`,
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

const getDataOrder = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT orders.id,orders.status,orders.total ,orders.amount,product.name as product_name,product.price as price, 
      product.category_id as category,product.photo as photo,users.alamat as alamat,users.fullname as username from transactions as orders 
      INNER JOIN products as product ON orders.id_product = product.id
      INNER JOIN users as users ON orders.seller_id = users.id 
      WHERE orders.seller_id = '${id}'`,
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

const getDataOrderToko = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT orders.id,orders.status,orders.total ,orders.amount,product.name as product_name,product.price as price, 
      product.category as category,product.photo as photo,users.alamat as alamat,users.fullname as username from transactions as orders 
      INNER JOIN products as product ON orders.id_product = product.id
      INNER JOIN users as users ON orders.id_users = users.id 
      WHERE orders.id_toko = '${id}'`,
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

module.exports = {
  insertData,
  updateStatusDone,
  updateStatusShipping,
  updateStatusTerima,
  findStatus,
  getDetailOrder,
  getDataOrder,
  findStatus,
  findToko,
  updateStatusPayment,
  getDataOrderToko,
};
