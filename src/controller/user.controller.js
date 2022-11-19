// Ini controller untuk bisa diakses semua role (admin dan public) bisa diedit edit (tapi tetep harus login dulu)
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
// Ini controller untuk bisa diakses hanya user saja bisa diedit edit
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
// Ini controller yang bisa akses cuma admin saja
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  