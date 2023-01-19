const ModelCategory = require('./../model/category')
const { response } = require("../middleware/common");


const CategoryController = {
    update: (req,res,next)=>{
        ModelCategory.updateData(req.params.id,req.body)
        .then(result=> res.send({status:200,message: `berhasil mengubah data`}))
        .catch(err=> res.send({message:'error',err}))
    },
    delete: (req,res,next)=>{
        ModelCategory.deleteData(req.params.id)
        .then(result=> res.send({status:200,message: `berhasil menghapus data`}))
        .catch(err=> res.send({message:'error',err}))
    },
    getProduct: (req,res,next)=>{ 
        ModelCategory.selectData()
        .then(result=> res.send({result : result.rows}))
        .catch(err=> res.send({message:'error',err}))
    },
    insert: (req,res,next)=>{
        try {
            const users_id = req.payload.id;
            const name = req.body.name
            const data = {users_id,name};
            result = ModelCategory.insertData(data);
            response(
                res,
                200,
                true,
                result,
                "Insert category success"
              );
        } catch (err) {
            console.log(err);
      response(res, 404, false, err, "insert category failed");
        }
    }
}

exports.CategoryController = CategoryController