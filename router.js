import express from 'express';

import user from './router/user.js';
import customer from './router/customer.js';
import technician from './router/technician.js';
import tag from './router/tag.js';
import fetch from './router/fetch.js';

const router = express.Router();

router.use('/user', user);
router.use('/customer', customer);
router.use('/technician', technician);
router.use('/tag', tag);
router.use('/fetch',fetch)

export default router