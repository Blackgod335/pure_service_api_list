import technicianModel from "../model/technician.js";

import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const createTechnician = async (req) => {
  try {
    const { firstName, lastName, mobile, email, address, role } = req.body;
    const existingEmail = await technicianModel.findOne({ email });
    if (existingEmail) {
      return {
        status: "DUPLICATE",
        message: "This email is already here",
      };
    }
    const customerId = req.authBody.customerId;
    const createTec = await technicianModel.create({
      firstName,
      lastName,
      mobile,
      email,
      address,
      role,
      createrId: customerId,
    });
    return {
      message: "Technician created successfully",
      createTec,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const getTechni = async (req) => {
  try {
    const data = req.query;
    const sortField = data.sortField;
    const sort = data.sort ? parseInt(data.sort) : 1
    const limit = data.limit ? parseInt(data.limit) : 10;
    const skip = data.skip ? parseInt(data.skip) : 0;

    const totalCount = await technicianModel.countDocuments()
    const getTechnician = await technicianModel.aggregate([
          {
            $facet: {
              data: [
                {
                  $sort: {
                    [sortField]: sort,
                  },
                },
                {
                  $skip: skip,
                },
                {
                  $limit: limit,
                },
                {
                    $unwind : "$address"
                }
              ],
              count: [
                {
                  $count: 'total count',
                },
              ],
            },
          },
        ]);
    return {
      message: " Technician Lists",
      totalDocuments : totalCount,
      getTechnician
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const getSingleTechnician = async (req) => {
  try {
    const userId = req.params.userId;
    const findtech = await technicianModel.findOne({
      _id: new ObjectId(userId),
    });
    if (!findtech) {
      return {
        status: "NOTFOUND",
        message: "Customer doesn't found",
      };
    }
    return {
      message: "Technician Data",
      findtech,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const updateTechnician = async (req) => {
  try {
    const { technicianId, firstName, lastName, mobile, email, address, role } =
      req.body;
    const existingTechnician = await technicianModel.findById({
      _id: new ObjectId(technicianId),
    });
    if (!existingTechnician) {
      return {
        status: "NOTFOUND",
        message: "Technician Not found",
      };
    }
    await technicianModel.findByIdAndUpdate(
      { _id: new ObjectId(technicianId) },
      {
        $set: {
          firstName,
          lastName,
          mobile,
          email,
          address,
          role,
        },
      }
    );
    const Technician = await technicianModel.findById({
      _id: new ObjectId(technicianId),
    });
    return {
      message: "Technician details updated successfully",
      Technician,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const deleteTechnician = async (req) => {
  try {
    const technicianId = req.params.technicianId;
    const findtechnician = await technicianModel.findById({
      _id: new ObjectId(technicianId),
    });
    if (!findtechnician) {
      return {
        status: "NOTFOUND",
        message: "No technician found",
      };
    }
    await technicianModel.findByIdAndDelete({
      _id: new ObjectId(technicianId),
    });

    return {
      message: "technician deleted successfuly",
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

export {
  createTechnician,
  getTechni,
  getSingleTechnician,
  updateTechnician,
  deleteTechnician,
};
