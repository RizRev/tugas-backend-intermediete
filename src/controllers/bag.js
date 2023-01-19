const ModelBag = require("./../model/bag");
const { response } = require("./../middleware/common");
const bagController = {
  insert: async (req, res, next) => {
    try {
      const id_users = req.payload.id;

      const { id_product, amount, price } = req.body;

      const data = {
        id_users,
        id_product,
        amount,
      };
      console.log(data);
      await ModelBag.insertData(data);
      response(res, 200, true, data, "ORDER SUCCED");
    } catch (error) {
      response(res, 404, false, error, "ORDER FAILED");
    }
  },
  getBag: async (req, res, next) => {
    try {
      const { id } = req.payload;

      const result = await ModelBag.getBag(id);
      response(res, 200, true, result.rows, "GET DATA SUCCESS");
    } catch (error) {
      response(res, 404, false, error, "GET DATA FAILED");
    }
  },
  delete: async (req, res) => {
    try {
      await ModelBag.deleteProduct(req.params.id);
      response(res, 200, true, null, "delete data success");
    } catch (err) {
      return response(res, 404, false, err, "delete data failed");
    }
  },
  deleteAll: async (req, res) => {
    try {
      const { id } = req.payload;
      await ModelBag.deleteAllCart(id);
      response(res, 200, true, null, "delete data success");
    } catch (err) {
      return response(res, 404, false, err, "delete data failed");
    }
  },
};

exports.bagController = bagController;
