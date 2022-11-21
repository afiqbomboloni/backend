const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("tbl_articles", {
        // kategori, penulis, judul, url
        kategori: {
            type: Sequelize.STRING
          },
        penulis: {
            type: Sequelize.STRING
          },
        judul: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
});

    return Article
}