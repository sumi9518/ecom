const Category = require('../models/category');
const Sub = require('../models/sub');
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (err) {
        cosole.log("Category Create error -->", err)
        res.status(400).send("create category failed");
    }
};

exports.list = async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

};

exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
};

//update takes 2 arguments first to find and second to update. new true is used to get updated one in res json
exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true });
        res.json(updated);
    } catch (err) {
        cosole.log("Category Update error -->", err)
        res.status(400).send("Category Update Failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);

    } catch (err) {
        cosole.log("Category Remove error -->", err)
        res.status(400).send("Category Delete Failed");
    }
};
exports.getSubs = (req, res) => {
    Sub.find({ parent: req.params._id }).exec((err, subs) => {
        if (err) console.log(err);
        res.json(subs);
    });
};