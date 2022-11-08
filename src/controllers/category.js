const ModelCategory = require('./../model/category')

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
        ModelCategory.insertData(req.body)
        .then(result=> res.send({status:200,message: `berhasil memasukan data`}))
        .catch(err=> res.send({message:'error',err}))
    }
}

exports.CategoryController = CategoryController