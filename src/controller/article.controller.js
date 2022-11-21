const db = require('../models')
const Article = db.articles
const Op = db.Sequelize.Op

// Menambah data article baru
exports.create = (req, res) => {
    if(!req.body.judul) {
        res.status(400).send({
            message: "Judul harus terisi"
        })
        return;
    }
    // Create new Article
    const article = {
        // kategori, penulis, judul, url
        kategori: req.body.kategori,
        penulis: req.body.penulis,
        judul: req.body.judul,
        url: req.body.url

    }
    // Save article in the database
    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Maaf ada error ketika menyimpan article"
            })
        })

    
};

// Mengambil data semua article dari database
exports.findAll = (req, res) => {
    // query
    const judul = req.body.judul
    var condition = judul? {judul: {[Op.like]: `%${judul}`}} : null;

    Article.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ada error ketika mengambil semua data article"
            })
        })
};


// Mengambil article berdasarkan id
exports.findOne = (req, res) => {
    const id = req.params.id

    Article.findByPk(id)
        .then(data => {
            if(data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Maaf tidak bisa menemukan Artikel dengan id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "ADa error ketika mengambil article dengan id=" + id
            })
        })
};

// Update article berdasarkan id
exports.update = (req, res) => {
    const id = req.params.id

    Article.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Article berhasil diupdate"
                })
            } else {
                res.send({
                    message: `Tidak bisa update article dengan id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error update article dengan id=" + id
            })
        })
};

// Menghapus article berdasarkan id dari database
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message: "Article berhasil dihapus"
                })
            } else {
                res.send({
                    message: `Gagal menghapus article dengan id=${id} coba cek lagi id nya ya`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Tidak bisa menghapus article dengan id=" + id
            })
        })
        
}