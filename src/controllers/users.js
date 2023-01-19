const { response } = require("../middleware/common");
const {create, findEmail, verification, editUsers,getDataUsers} = require("../model/users");
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const {generateToken} = require('../helpers/auth')


const UsersController = {
    insert: async (req,res,next) => {
        let {rows:[users]} = await findEmail(req.body.email)
        console.log('role',req.params.role)
        let role = req.params.role
        if(users){
            return response(res, 404, false,"email already use","register fail")
        }
        let digits = "0123456789";
        let otp = "";
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            email : req.body.email,
            password, 
            fullname : req.body.fullname,
            role,
            store_name : req.body.store_name,
            otp
        }
        try{
            const result = await create (data)
            if(result){
                console.log(result)
                response(res, 200, true, true,"register success")
            }
        }catch(err){
            console.log(err)
            response(res, 404, false, err, "register fail")
        }
    },
    login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation1 = bcrypt.compareSync(password,users.password)
        if(!validation1){
            return response(res, 404, false, null,"wrong password")
        }
        console.log(users.validation)
        if (users.validation == 0) {
            return response(res, 404, false, null, "account not verified");
          }
        delete users.password
        let payload = {
            id: users.id,
            fullname: users.fullname,
            email: users.email,
            role: users.role
        }
        users.token = generateToken(payload)
        response(res, 200, false, users,"login success")
        // console.log('password hasg=h',users.password)
        // console.log("validation",validation)
        // console.log(users)
        // res.send(users)
    },
    otp: async (req, res, next) => {
        console.log("email", req.body.email);
        console.log("otp", req.body.otp);
        let {
          rows: [users],
        } = await findEmail(req.body.email);
        if (!users) {
          return response(res, 404, false, null, " email not found");
        }
        if (users.otp == req.body.otp) {
          const result = await verification(req.body.email);
          return response(
            res,
            200,
            true,
            result.command,
            " verification email success"
          );
        }
        return response(
          res,
          404,
          false,
          null,
          " wrong otp please check your email"
        );
      },
      EditProfile: async(req,res,next) => {
        try {
            const id = req.payload.id;
        const {
            email,phonenumber,store_description,store_name
        } = req.body;
        const data = {
            id,
            email,
            phonenumber,
            store_description,
            store_name
        }
        editUsers(data);
            response(res, 200, true, data, "update data success");
        } catch (error){
            console.log(error);
            response(res, 404, false, "update data failed");
        }
        
      },getProfile: async(req,res,next) => {
        try {
            const id = req.payload.id;
        const result = await getDataUsers(id);
            response(res, 200, true, result.rows, "get data success");
        } catch (error){
            console.log(error);
            response(res, 404, false, "get data failed");
        }
        
      }
}

exports.UsersController = UsersController;
// const {create, findEmail} = require("../models/users");
// const bcrypt = require('bcryptjs');
// const {generateToken} = require('../helpers/auth')

// const UsersController = {
//     insert: async  (req, res, next) => {
//         let {rows:[users]} = await findEmail(req.body.email)
//         console.log('role',req.params.role)
//         let role = req.params.role

//         if(users){
//             return response(res, 404, false, "email already use"," register fail") 
//         }

//         let salt = bcrypt.genSaltSync(10);
//         let password = bcrypt.hashSync(req.body.password);
//         let data = {
//             id : uuidv4(),
//             email : req.body.email,
//             password ,
//             fullname : req.body.fullname,
//             role
//         }
//         try{
//             const result = await create(data)
//             if(result){
//                 console.log(result)
//                 response(res, 200, true, true, "register success")
//             }
//         } catch(err){
//             console.log(err)
//             response(res, 404, false, err," register fail")
//         }
//     },
    
// }

// exports.UsersController = UsersController;

// login: async (req,res,next)=>{
//     console.log('email',req.body.email)
//     console.log('password',req.body.password)
//     let {rows:[users]} = await findEmail(req.body.email)
//     if(!users){
//         return response(res, 404, false, null," email not found")
//     }
//     const password = req.body.password
//     const validation = bcrypt.compareSync(password,users.password)
//     if(!validation){
//         return response(res, 404, false, null,"wrong password")
//     }
//     delete users.password
//     let payload = {
//         email: users.email,
//         role: users.role
//     }
//     users.token = generateToken(payload)
//     response(res, 200, false, users,"login success")
// }