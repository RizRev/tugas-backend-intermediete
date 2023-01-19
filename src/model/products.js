const Pool = require('./../config/db')

const selectData = (sortby,sort,page,limit,search) => {
    return Pool.query(`SELECT products.id,products.name,products.stock,products.price,products.photo,category.name as category FROM products INNER JOIN category ON products.category_id = category.id WHERE products.name ILIKE '%${search}%' ORDER BY ${sortby} ${sort} limit ${limit} offset ${(page-1)*limit}`);
}

const selectDataSeller = (users_id) => {
    const {sortby,sort,page,limit,search} = data
    return Pool.query(`SELECT * FROM products WHERE users_id='${users_id}'`);
}

const selectDatabyId = (id) => {
    return Pool.query(`SELECT products.id,products.name,products.stock,products.price,products.photo,category.name as category FROM products INNER JOIN category ON products.category_id = category.id WHERE products.id=${id}`);
}

const productSearch = (search) => {
    return Pool.query(`SELECT * FROM products WHERE name ILIKE '%${search}%'`);
}

// const selectData = () => {
//     return Pool.query('SELECT products.name,products.stock,products.price,category.name as category FROM products INNER JOIN category ON products.category_id = category.id;');
// }

const insertData = (data) => {
    const {name,stock,price,category_id,photo,users_id} = data;
    return Pool.query(`INSERT INTO products(name,stock,price,category_id,photo,users_id) VALUES('${name}',${stock},${price},${category_id},'${photo}','${users_id}')`);
}

const updateData = (id,data) => {
    const {name,stock,price,category_id,photo} = data;
    return Pool.query(`UPDATE products SET name='${name}',stock='${stock}',price='${price}',category_id='${category_id}',photo='${photo}' WHERE id='${id}'`);
}
const deleteData = id => {
    return Pool.query(`DELETE FROM products where id='${id}'`);
}
module.exports = {selectData,insertData,deleteData,updateData,selectDatabyId,productSearch,selectDataSeller};