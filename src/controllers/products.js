const ModelProduct = require("../model/products");
const { response } = require("../middleware/common");
require("dotenv").config();
// const client = require("../config/redis")
//     update: (req,res,next)=>{
// const ProductController = {
//         ModelProduct.updateData(req.params.id,req.body)
//         .then((result) =>
//         response(res, 200, true, result, "update data success"))
//         .catch((err) => response(res, 404, false, err, "update data fail"))
//     },
//     delete: (req,res,next)=>{
//         ModelProduct.deleteData(req.params.id)
//         .then((result) =>
//         response(res, 200, true, result, "delete data success"))
//         .catch((err) => response(res, 404, false, err, "get data fail"))
//     },
    // getProduct: (req,res,next)=>{ 
    //     const sortby = req.query.sortby || 'id'
    //     const sort = req.query.sort || 'asc'
    //     const page = req.query.page || 1
    //     const limit = req.query.limit || 5
    //     ModelProduct.selectData(sortby,sort,page,limit)
        // .then((result) => response(res, true, 200, result.rows,"get data success"))
        // .catch((err) => response(res, false, 404, err,"get data fail"));
    // },
//     insert: (req,res,next)=>{
//         ModelProduct.insertData(req.body)
//         .then((result) =>
//         response(res, 200, true, result, "input data success"))
//         .catch((err) =>response(res, 404, false, err, "input data fail"))
//     },
//     // getProductDetail: (req,res,next)=>{ 
//     //     ModelProduct.selectDatabyId(req.params.id)
//     //     .then(result=> res.send({result : result.rows}))
//     //     .catch(err=> res.send({message:'error',err}))
//     // },
//     searchProductname: (req,res,next)=>{ 
//         const search = req.query.search
//         ModelProduct.productSearch(search)
//         .then(result=> res.send({result : result.rows}))
//         .catch(err=> res.send({message:'error',err}))
//     },
//     getProductDetail: (req, res, next) => {
//         ModelProduct.selectDatabyId(req.params.id)
//         .then((result) => {
//           // client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
//           response(res, 200, true, result.rows, "get data success")
//         })
//         .catch((err) =>response(res, 404, false, err, "get data fail"));
//       }
//     // getTransactions: (req,res,next)=>{ 
//     //     ModelProduct.selectDataOrder(req.params.Order)
//     //     .then(result=> res.send({result : result.rows}))
//     //     .catch(err=> res.send({message:'error',err}))
//     // }
// };

// exports.ProductController = ProductController;

const ProductController = {
    update: (req,res,next)=>{
        const id = req.params.id;
        const {
            photo: [photo],
          } = req.files;
          req.body.photo = photo;
          const {name,category_id,stock,price,} = req.body
          data = {
            //   id,
              photo: photo.path,
              name,
              category_id,
              stock,
              price
          }
        ModelProduct.updateData(id,data)
        .then((result) => response(res, 200, true, result.rows,"delete data success"))
        .catch(err=> res.send({message:'error',err}))
    },
    delete: (req,res,next)=>{
        ModelProduct.deleteData(req.params.id)
        .then((result) => response(res, 200, true, result.rows,"delete data success"))
        .catch((err) => response(res, 404, false, err.routine,"delete data fail"));
    },
    // getProduct: (req,res,next)=>{ 
    //     const sortby = req.query.sortby || 'id'
    //     const sort = req.query.sort || 'asc'
    //     const page = req.query.page || 1
    //     const limit = req.query.limit || 5
    //     ModelProduct.selectData(sortby,sort,page,limit)
    //     .then((result) => response(res, true, 200, result.rows,"get data success"))
    //     .catch((err) => response(res, false, 404, err,"get data fail"));
    // },
    getProduct: (req,res,next)=>{ 
        const users_id = req.payload.id
        const sortby = req.query.sortby || 'id'
        const sort = req.query.sort || 'asc'
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const search = req.query.search || ''
        console.log(req.query)
        ModelProduct.selectData(sortby,sort,page,limit,search
            // ,users_id
            )
        .then((result) => response(res, 200, true, result.rows,"get data success"))
        .catch((err) => response(res, 404, false, err.routine,"get data fail"));
    },
    insert: (req,res,next)=>{
        const users_id = req.payload.id
        const {
            photo: [photo],
          } = req.files;
          req.body.photo = photo.path;
        const {name,category_id,stock,price,} = req.body
        data = {
            users_id,
            photo: photo.path,
            name,
            category_id,
            stock,
            price
        }
        ModelProduct.insertData(data)
        .then((result) => response(res, 200, true, data,"insert data success"))
        .catch((err) => response(res, 404, false, err,"insert data fail"));
    },
    getProductDetail: (req,res,next)=>{ 
        ModelProduct.selectDatabyId(req.params.id)
        .then((result) => {
        // client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
        response(res, 200, true, result.rows,"get data detail success")})
        .catch((err) => response(res, 404, false, err.routine,"get data detail fail"));
    },getProductSeller: (req,res,next)=>{ 
        const users_id = req.payload.id
        const sortby = req.query.sortby || 'id'
        const sort = req.query.sort || 'asc'
        const page = req.query.page || 1
        const limit = req.query.limit || 5
        const search = req.query.search || ''
        console.log(req.query)
        const data = {sortby,sort,page,limit,search}
        console.log(id)
        ModelProduct.selectDataSeller(users_id)
        .then((result) => response(res, 200, true, result.rows,"get data success"))
        .catch((err) => response(res, 404, false, err,"get data fail"));
    }
}

    exports.ProductController = ProductController


    // const ModelProduct = require("../models/products");
    // const { response } = require("../middlewares/common");
    // // const client = require("../config/redis")
    // const ProductController = {
    //   update: (req, res, next) => {
    //     ModelProduct.updateData(req.params.id, req.body)
    //       .then((result) =>
    //       response(res, 200, true, result, "update data success"))
    //       .catch((err) => response(res, 404, false, err, "get data fail"));
    //   },
    //   delete: (req, res, next) => {
    //     ModelProduct.deleteData(req.params.id)
    //       .then((result) =>
    //         response(res, 200, true, result, "delete data success")
    //       )
    //       .catch((err) => response(res, 404, false, err, "get data fail"));
    //   },
    //   getProduct: (req, res, next) => {
    //     ModelProduct.selectData()
    //       .then((result) =>
    //         response(res, 200, true, result.rows, "get data success")
    //         )
    //         .catch((err) => response(res, 404, false, err, "get data fail"));
    //       },
    //       getProductDetail: (req, res, next) => {
    //         ModelProduct.selectDatabyId(req.params.id)
    //         .then((result) => {
    //           // client.setEx(`product/${req.params.id}`,60*60,JSON.stringify(result.rows))
    //           response(res, 200, true, result.rows, "get data success")
    //         })
    //         .catch((err) =>response(res, 404, false, err, "get data fail"));
    //       },
    //       insert: (req, res, next) => {
            // const Port = process.env.PORT
            // const Host = process.env.HOST
            // const photo = req.file.filename
            // const uri = `http://${Host}:${Port}/img/${photo}`
            // req.body.photo = uri
    //         req.body.stock = parseInt(req.body.stock)
    //         req.body.price = parseInt(req.body.price)
    //         ModelProduct.insertData(req.body)
    //         .then((result) =>
    //         response(res, 200, true, result, "input data success"))
    //       .catch((err) =>response(res, 404, false, err, "input data fail"));
    //   },
    // };
    
    // exports.ProductController = ProductController;
    