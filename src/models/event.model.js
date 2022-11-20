const {sequelize, Sequelize} = require(".");

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("tbl_events", {
        //nama event, tanggal,deskripsi, pembicara, image
        nama_event: {
            type: Sequelize.STRING
        },
        tanggal: {
            type: Sequelize.STRING
        },
        deskripsi: {
            type: Sequelize.STRING
        },
        pembicara: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.STRING
        },
    });
    return Event;
};