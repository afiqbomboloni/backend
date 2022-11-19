const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // Ini routing untuk semua akses
  app.get("/api/test/all", controller.allAccess);

  // Ini routing khusus untuk user yang sudah login
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

// Ini routing untuk agar bisa diakses hanya admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
