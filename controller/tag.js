import tagModel from '../model/tags.js';
import customerModel from '../model/customer.js';

const createTag = async (req) => {
  try {
    const { tagName } = req.body;

    let findTag = await tagModel.findOne({ tagName });

    if (findTag) {
      const customerTag = await customerModel.findOne({ tagId: findTag._id });
      if (customerTag) {
        return { message: 'This tag id customer already have' };
      } else {
        return {
          message: 'This tag already create but doesnot assigned customer',
        };
      }
    }

    const newTag = await tagModel.create({ tagName });

    return {
      message: 'Tag created successfully.',
      tag: newTag,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

const getTagsList = async () => {
  try {
    const getTag = await tagModel.find();
    return {
      message: 'All tags list',
      getTag,
    };
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

export { createTag, getTagsList };
