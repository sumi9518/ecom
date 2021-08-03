const Sub = require('../models/Sub');
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
        res.json(sub);
    } catch (err) {
        console.log("Sub Create error -->", err);
        res.status(400).send("create Sub failed");
    }
};


exports.list = async (req, res) => {
    res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());

};

exports.read = async (req, res) => {
    let sub = await Sub.findOne({ slug: req.params.slug }).exec();
    res.json(sub);
};

//update takes 2 arguments first to find and second to update. new true is used to get updated one in res json
exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug },
            { name, parent, slug: slugify(name) },
            { new: true });
        res.json(updated);
    } catch (err) {
        console.log("Sub Update error -->", err);
        res.status(400).send("Sub Update Failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);

    } catch (err) {
        console.log("Sub delete error -->", err);
        res.status(400).send("Sub Delete Failed");
    }
};