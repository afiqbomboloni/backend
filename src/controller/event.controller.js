const db = require("../models");
const Events = db.events;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nama_event) {
        res.status(400).send({
            message: 'Mohon Maaf Nama Event Harus Diisi'
        });
        return;
    }

    const event = {
        //nama_event, tanggal, deskripsi, pembicara, images
        nama_event: req.body.nama_event,
        tanggal: req.body.tanggal,
        deskripsi: req.body.deskripsi,
        pembicara: req.body.pembicara,
        images: req.body.images,
    };

    //Menyimpan data Events ke database OurFamy
    Events.create(event)
    .then(data => {
        res.send(data);
    }).catch(err => {
            res.status(500).send({
                message: err.message || 'Maaf Terdapat Kesalahan Dalam Menyimpan Data Event, Mohon Ulangi Kembali'
            });
        })
};

//Mengambil all data events dari database OurFamy
exports.findAll= (req, res) => {
    //query nama_event
    const namaEvent = req.body.nama_event;
    let condition = namaEvent? {nama_event: {[Op.like]: `%${namaEvent}`}} : null;

    Events.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Maaf terdapat error dalam pengambilan data events, coba lagi ya...'
            });
        })
};

//Mengambil events berdasarkan id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Events.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            }else {
                res.status(404).send({
                    message: `Maaf tidak bisa menemukan events dengan id=${id} yang anda inginkan`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Maaf terdapat kesalahan ketika mengambil event dengan id' + id + 'yang diinginkan'
            });
        })
};

//Update events berdasarkan id-nya
exports.update = (req, res) => {
    const id = req.params.id;

    Events.update(req.body, {
        where: {id: id}
    })
    .then(value => {
        if (value == 1) {
            res.send({
                message: 'Event berhasil diperbarui'
            });
        }else {
            res.send({
                message: `Mohon maaf terdapat kesalahan ketika memperbarui event dengan id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 'Mohon Maaf terjadi error memperbarui event dengan id ' + id
        });
    })
};

//Menghapus events yang diinginkan berdasarkan id dari database OurFamy
exports.delete = (req, res) => {
    const id = req.params.id;

    Events.destroy({
        where: {id: id},
    })
    .then(value => {
        if (value == 1) {
            res.send({
                message: 'Event berhasil dihapus'
            });
        } else {
            res.send({
                message: `Mohon maaf event gagal dihapus dengan id id=${id} coba ulangi dan periksa kembali`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Mohon maaf terjadi error ketika menghapus event dengan id=${id}`
        });
    })
};