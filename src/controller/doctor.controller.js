const db = require('../models')
const Doctor = db.doctors
const Op = db.Sequelize.Op

// Menambah data doctor baru
exports.create = (req, res) => {
    if(!req.body.nama) {
        res.status(400).send({
            message: "Jangan dikosongi"
        })
        return;
    }
    // Create new doctor
    const doctor = {
        // jenis, nama,kota,waktu,url
        jenis: req.body.jenis,
        nama: req.body.nama,
        kota: req.body.kota,
        waktu: req.body.waktu,
        url: req.body.url

    }
    // Save doctor in the database
    Doctor.create(doctor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Maaf ada error ketika menyimpan doctor"
            })
        })

    
};

// Mengambil data semua dokter dari database
exports.findAll = (req, res) => {
    // query
    const nama = req.body.nama
    var condition = nama? {nama: {[Op.like]: `%${nama}`}} : null;

    Doctor.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ada error ketika mengambil semua data doctor"
            })
        })
};


// Mengambil dokter berdasarkan id
exports.findOne = (req, res) => {
    const id = req.params.id

    Doctor.findByPk(id)
        .then(data => {
            if(data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Maaf tidak bisa menemukan Doctor dengan id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "ADa error ketika mengambil doctor dengan id=" + id
            })
        })
};

// Update doctor berdasarkan id
exports.update = (req, res) => {
    const id = req.params.id

    Doctor.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Doctor berhasil diupdate"
                })
            } else {
                res.send({
                    message: `Tidak bisa update doctor dengan id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error update doctor dengan id=" + id
            })
        })
};

// Menghapus doctor berdasarkan id dari database
exports.delete = (req, res) => {
    const id = req.params.id;

    Doctor.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message: "Doctor berhasil dihapus"
                })
            } else {
                res.send({
                    message: `Gagal menghapus doctor dengan id=${id} coba cek lagi id nya ya`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Tidak bisa menghapus doctor dengan id=" + id
            })
        })
        
}