const Pool = require('./../config/db')

const selectData = () => {
    return Pool.query(`SELECT * FROM category`);
}

const insertData = (data) => {
    const {id,name} = data;
    return Pool.query(`INSERT INTO category(id,name) VALUES(${id},'${name}')`);
}

const updateData = (id,data) => {
    const {name,stock,price,category_id} = data;
    return Pool.query(`UPDATE category SET name='${name}' WHERE id='${id}'`);
}
const deleteData = (id) => {
    return Pool.query(`DELETE FROM category where id=${id}`);
}
module.exports = {selectData,insertData,deleteData,updateData}