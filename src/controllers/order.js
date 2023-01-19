const ModelOrder = require("./../model/order");
const { response } = require("./../middleware/common");
const orderController = {
  insert: async (req, res, next) => {
    try {
      const id_users = req.payload.id;

      const { id_product, total, amount } = req.body;
      const {
        rows: [toko],
      } = await ModelOrder.findToko(id_product);

      const id_toko = toko.users_id;
      const data = {
        id_users,
        total,
        id_product,
        amount,
        id_toko,
      };
      console.log(data);
      await ModelOrder.insertData(data);
      response(res, 200, true, data, "ORDER SUCCED");
    } catch (error) {
      response(res, 404, false, error, "ORDER FAILED");
    }
  },
  getDetailOrder: async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await ModelOrder.getDetailOrder(id);
      response(res, 200, true, result.rows, "ORDER SUCCED");
    } catch (error) {
      response(res, 404, false, error, "ORDER FAILED");
    }
  },
  getAllOrder: async (req, res, next) => {
    try {
      const { id } = req.payload;
      console.log(id)
      const result = await ModelOrder.getDataOrder(id);
      response(res, 200, true, result.rows, "ORDER SUCCED");
    } catch (error) {
      response(res, 404, false, error, "ORDER FAILED");
    }
  },
  getOrderSeller: async (req, res, next) => {
    try {
      const { id } = req.payload;
      const result = await ModelOrder.getDataOrderToko(id);
      response(res, 200, true, result.rows, "ORDER SUCCED");
    } catch (error) {
      response(res, 404, false, error, "ORDER FAILED");
    }
  },
  updateStatusOrder: async (req, res, next) => {
    try {
      const id = req.params.id;
      const {
        rows: [order],
      } = await ModelOrder.findStatus(id);
      const status = order.status;
      if (status === 0) {
        await ModelOrder.updateStatusPayment(id);
        response(res, 200, true, [], "PAYMENT DITERIMA");
      } else if (status === 1) {
        await ModelOrder.updateStatusTerima(id);
        response(res, 200, true, [], "ORDER DITERIMA");
      } else if (status === 2) {
        await ModelOrder.updateStatusShipping(id);
        response(res, 200, true, [], "ORDER DIKIRIM");
      } else {
        await ModelOrder.updateStatusDone(id);
        response(res, 200, true, [], "ORDER TERKIRIM");
      }
    } catch (error) {
      response(res, 404, false, error, "ORDER FAILED");
    }
  },
};

exports.orderController = orderController;
