const Pool = require('./../config/db')

const selectData = () => {
    return Pool.query(`SELECT * FROM transactions`);
}

const insertData = (data) => {
    const {id,email,products_id,amount,total} = data;
    return Pool.query(`INSERT INTO transactions(id,email,products_id,amount,total) VALUES(${id},'${email}',${products_id},${amount},${total})`);
}

const updateData = (id,data) => {
    const {email,products_id,amount,total} = data;
    return Pool.query(`UPDATE transactions SET email='${email}',products_id='${products_id}',amount='${amount}',total='${total}' WHERE id='${id}'`);
}
const deleteData = id => {
    return Pool.query(`DELETE FROM transactions where id='${id}'`);
}
module.exports = {selectData,insertData,deleteData,updateData}