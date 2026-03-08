const { Router } = require('express');
const { createAccount, getMyAccounts, getMyAccount } = require('./account.controller');
const { validateJWT } = require('../../middlewares/validate-jwt');

const router = Router();

router.post('/', validateJWT, createAccount);
router.get('/', validateJWT, getMyAccounts);
router.get('/me', validateJWT, getMyAccount);

module.exports = router;