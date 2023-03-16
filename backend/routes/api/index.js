const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

// stuff after testing phase 3?
// const router = require('express').Router();

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

// const { restoreUser } = require('../../utils/auth.js');
// router.use(restoreUser);

// const { requireAuth } = require('../../utils/auth.js');


// GET /api/restore-user
//Make sure to keep the restoreUser middleware connected before any other middleware or route handlers are connected to the router.
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// Once you are satisfied with the test results, you can remove all code for testing the user auth middleware routes.
// GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });


// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });




module.exports = router;
