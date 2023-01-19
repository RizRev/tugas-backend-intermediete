const Pool = require("./../config/db");

const create = (data) => {
    const {id,email,password,fullname,role,store_name,otp} = data
    return new Promise ((resolve,reject)=>
        Pool.query(`INSERT INTO users(id,email,password,fullname,role,store_name,validation,otp) VALUES('${id}','${email}','${password}','${fullname}','${role}','${store_name}','0',${otp})`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    })
    )
}
const findEmail = (email) => {
    return new Promise ((resolve,reject)=>
        Pool.query(`SELECT * FROM users where email='${email}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    }))
}

const verification = (email) => {
    return new Promise((resolve, reject) =>
      Pool.query(
        `UPDATE users SET validation='1' WHERE "email"='${email}'`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      )
    );
  };

  const editUsers = (data,id) => {
    const {email,phonenumber,store_description,store_name} = data
    return new Promise ((resolve,reject)=>
        Pool.query(`UPDATE users SET store_name='${store_name}',email='${email}',phonenumber='${phonenumber}',store_description='${store_description}' WHERE "id"='${id}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    })
    )
}
 
const getDataUsers = (id) => {
  return new Promise ((resolve,reject)=>
      Pool.query(`SELECT * FROM users where id='${id}'`,(err,result)=>{
          if(!err){
              resolve(result)
          } else {
              reject(err)
          }
  }))
}

// module.exports = {create}


module.exports = {create,findEmail,verification,editUsers,getDataUsers}
