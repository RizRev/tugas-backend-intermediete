const ModelOrder = require('./../model/order')

const OrderController = {
    update: (req,res,next)=>{
        ModelOrder.updateData(req.params.id,req.body)
        .then(result=> res.send({status:200,message: `berhasil mengubah data`}))
        .catch(err=> res.send({message:'error',err}))
    },
    delete: (req,res,next)=>{
        ModelOrder.deleteData(req.params.id)
        .then(result=> res.send({status:200,message: `berhasil menghapus data`}))
        .catch(err=> res.send({message:'error',err}))
    },
    getProduct: (req,res,next)=>{ 
        ModelOrder.selectData()
        .then(result=> res.send({result : result.rows}))
        .catch(err=> res.send({message:'error',err}))
    },
    insert: (req,res,next)=>{
        ModelOrder.insertData(req.body)
        .then(result=> res.send({status:200,message: `berhasil memasukan data`}))
        .catch(err=> res.send({message:'error',err}))
    }
}
exports.OrderController = OrderController