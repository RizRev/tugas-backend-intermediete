const Pool = require('./../config/db')

const selectData = () => {
    return Pool.query(`SELECT * FROM category`);
}

const insertData = (data) => {
    const {name,users_id} = data;
    return Pool.query(`INSERT INTO category(name,users_id) VALUES('${name}','${users_id}')`);
}

const updateData = (id,data) => {
    const {name,stock,price,category_id} = data;
    return Pool.query(`UPDATE category SET name='${name}' WHERE id='${id}'`);
}
const deleteData = (id) => {
    return Pool.query(`DELETE FROM category where id=${id}`);
}
module.exports = {selectData,insertData,deleteData,updateData}