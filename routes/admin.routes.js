const express = require("express");
const router = express.Router();
const { auth, authorize } = require("../middleware/auth.middleware");
const { getAllUsers, changeUserRole, changeUserStatus } = require("../controllers/admin.controller");

router.use(auth, authorize("admin"));

router.get("/users", getAllUsers);
router.patch("/users/:id/role", changeUserRole);
router.patch("/users/:id/status", changeUserStatus);

module.exports = router;

