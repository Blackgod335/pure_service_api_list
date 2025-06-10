import technicianModel from "../model/technician.js";

const fetchData = async (req) => {
  try {
    
    const data = req.query;
    const skip = data.skip ? parseInt(data.skip) : 0;
    const limit = data.limit ? parseInt(data.limit) : 10;
    const sortField = data.sortField ? data.sortField : "firstName";
    const sort = data.sort ? parseInt(data.sort) : 1 ;

    const fetchData = await technicianModel.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "createrId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      { $unwind: "$address" },
      { $unwind: "$customer.address" },
      {
        $lookup: {
          from: "users",
          localField: "customer.createrId",
          foreignField: "_id",
          as: "users",
        },
      },
      { $unwind: "$users" },
      { $unwind: "$users.address" },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          email: 1,
          createrId: 1,
          customer: {
            _id: "$customer._id",
            firstName: "$customer.firstName",
            lastName: "$customer.lastName",
            mobile: "$customer.mobile",
            email: "$customer.email",
            createrId: "$customer.createrId",
            address: "$customer.address",
            user: {
              _id: "$users._id",
              firstName: "$users.firstName",
              lastName: "$users.lastName",
              email: "$users.email",
              address: "$users.address",
            },
          },
        },
      },{
        $facet:{
            data : [
                {$skip : skip },
                {$limit : limit},
                {$sort : {[sortField] : sort}},
            ],
            count : [
                {$count : "Total count"},
            ]
        }
      }
    ]);
    return {
      message: "Fetch data successfully",
      fetchData,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

export { fetchData };
