const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("tbl_doctors", {
        // jenis, nama,kota,waktu,url
        jenis: {
            type: Sequelize.STRING
          },
        nama: {
            type: Sequelize.STRING
          },
        kota: {
            type: Sequelize.STRING
        },
        waktu: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
});

    return Doctor
}