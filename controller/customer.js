import customerModel from '../model/customer.js';
import tagModel from '../model/tags.js';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import process from 'process';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const { ObjectId } = mongoose.Types;

const createCustomer = async (req) => {
  try {
    const { firstName, lastName, mobile, email, password, address } = req.body;
    const existingEmail = await customerModel.findOne({ email });
    if (existingEmail) {
      return {
        status: 'DUPLICATE',
        message: 'This email is already here',
      };
    }
    const hashKey = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hashKey);
    const createrId = req.authBody.userId;
    const newCustomer = await customerModel.create({
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
      address,
      createrId: createrId,
    });
    let token = jwt.sign(
      {
        customerId: createCustomer._id,
      },
      process.env.JWT_SECRET_KEY
    );
    return {
      message: 'create a customer successfully',
      createCustomer: {
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        email: newCustomer.email,
        mobile: newCustomer.mobile,
        address: newCustomer.address,
      },
      token: token,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const loginCustomer = async (req) => {
  try {
    const { email, password } = req.body;
    const findCustomer = await customerModel.findOne({ email });
    if (!findCustomer) {
      return {
        status: 'NOTFOUND',
        message: "Doesn't found customer",
      };
    }
    const checkPassword = await bcrypt.compare(password, findCustomer.password);
    if (!checkPassword) {
      return {
        status: 'INVALID',
        message: 'invalid Password',
      };
    }
    let token = jwt.sign(
      { customerId: findCustomer._id },
      process.env.JWT_SECRET_KEY
    );
    return {
      message: 'Login successfully',
      customerData: {
        firstName: findCustomer.firstName,
        lastName: findCustomer.lastName,
        email: findCustomer.email,
        address: findCustomer.address,
      },
      token: token,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const getSingleCustomer = async (req) => {
  try {
    const userId = req.params.userId;
    const findCustomer = await customerModel.findOne({
      _id: new ObjectId(userId),
    });
    if (!findCustomer) {
      return {
        status: 'NOTFOUND',
        message: "Customer doesn't found",
      };
    }
    return {
      Customer: {
        firstName: findCustomer.firstName,
        lastName: findCustomer.lastName,
        mobile: findCustomer.mobile,
        email: findCustomer.email,
        address: findCustomer.address,
      },
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const getCustomers = async (req) => {
  try {
    const data = req.query;
    const sortField = data.sortField;
    const sort = data.sort ? parseInt(data.sort) : 1;
    const limit = data.limit ? parseInt(data.limit) : 10;
    const skip = data.skip ? parseInt(data.skip) : 0;

    const customerList = await customerModel.aggregate([
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
          ],
          count: [
            {
              $count: 'totalCount',
            },
          ],
        },
      },
    ]);
    return {
      customerList,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const updateCustomer = async (req) => {
  try {
    const { customerId, firstName, lastName, mobile, email, address } =
      req.body;
    const existingCustomer = await customerModel.findOne({
      _id: new ObjectId(customerId),
    });
    if (!existingCustomer) {
      return {
        status: 'NOTFOUND',
        message: 'Customer Not Found',
      };
    }
    const updatedCustomer = await customerModel.findByIdAndUpdate(
      { _id: new ObjectId(customerId) },
      {
        $set: {
          firstName,
          lastName,
          mobile,
          email,
          address,
        },
      }
    );
    return {
      message: 'update customer data',
      updatedCustomer,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const deleteCustomer = async (req) => {
  try {
    const customerId = req.params.customerId;
    const findcustomer = await customerModel.findById({
      _id: new ObjectId(customerId),
    });
    if (!findcustomer) {
      return {
        status: 'NOTFOUND',
        message: 'No customer found',
      };
    }
    await customerModel.findByIdAndDelete({ _id: new ObjectId(customerId) });
    return {
      message: `${
        findcustomer.firstName + ' ' + findcustomer.lastName
      } this customer successfully removed`,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const addTagInCustomer = async (req) => {
  try {
    const { customerId, tagName } = req.body;
    const findTag = await tagModel.findOne({ tagName });
    if (findTag) {
      const customerTag = await customerModel.findOne({ tagId: findTag._id });
      if (customerTag == null) {
        await customerModel.updateOne(
          { _id: customerId },
          { $set: { tagId: new ObjectId(findTag._id) } }
        );
        return { message: 'Update tagName in customer' };
      } else {
        return { message: 'customer have tagId' };
      }
    } else {
      const newTag = await tagModel.create({ tagName });
      const customerTag = await customerModel.findOne({ tagId: newTag._id });
      if (customerTag == null) {
        await customerModel.updateOne(
          { _id: customerId },
          { $set: { tagId: new ObjectId(newTag._id) } }
        );
        return {
          message: 'Create tagName and update that tagId in customerModel',
        };
      } else {
        return {
          message: 'this customer already have tagId',
        };
      }
    }
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

export {
  createCustomer,
  loginCustomer,
  getSingleCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  addTagInCustomer,
};
