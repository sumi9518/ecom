const Product = require('../models/product');
const slugify = require('slugify');
const User = require('../models/user');

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);    //creating slug from title to match schema requirement
        const newProduct = await new Product(req.body).save()
        res.json(newProduct);
    } catch (err) {
        console.log(err);
        // res.status(400).send("Create product failed");
        res.status(400).json({
            err: err.message
        });
    }
};

//can populate only if ref is added in models, populate give entire details of given field

exports.listAll = async (req, res) => {
    try {
        let products = await Product.find({})
            .limit(parseInt(req.params.count))
            .populate("category")
            .populate("subs")
            .sort([["createdAt", "desc"]])
            .exec();
        res.json(products);
    }
    catch (err) {
        console.log(err);
        // res.status(400).send("Create product failed");
        res.status(400).json({
            err: err.message
        });
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({
            slug: req.params.slug,
        }).exec();
        res.json(deleted);

    } catch (err) {
        console.log(err);
        return res.status(400).send('Delete Product Failed');
    }
}

exports.read = async (req, res) => {
    let product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subs")
        .exec();
    res.json(product);
};

//Optional to update slug bcz previous link get changed
//new true is use to send data in response of new product after update, 
//else old data b4 update will be set in response
exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findOneAndUpdate({ slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();

        res.json(updated);
    } catch (err) {
        console.log("Product Update Error", err);
        return res.status(400).json({
            err: err.message,
        });
    }
}

//Without pagination

// exports.list = async (req, res) => {
//     try {
//         //createdAt or updatedAt, desc or asc, 3
//         const { sort, order, limit } = req.body
//         const products = await Product.find({})
//             .populate('category')
//             .populate('subs')
//             .sort([[sort, order]])              //2 braces are used based on 2 arguments passed
//             .limit(limit)
//             .exec();
//         res.json(products);

//     } catch (err) {
//         console.log(err);
//     }
// }

//With Pagination

exports.list = async (req, res) => {
    // console.table(req.body);
    try {
        //createdAt or updatedAt, desc or asc, 3
        const { sort, order, page } = req.body

        const currentPage = page || 1
        const perPage = 3

        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate('category')
            .populate('subs')
            .sort([[sort, order]])              //2 braces are used based on 2 arguments passed
            .limit(perPage)
            .exec();
        res.json(products);

    } catch (err) {
        console.log(err);
    }
}

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
}


//Star Rating

exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    //check who is updating ?
    //check if the user is added rating for its new rating ?

    let existingRatingObject = product.ratings.find(

        (element) => element.postedBy.toString() === user._id.toString()

    ); //for === use .tostring for postedBy and user._id

    console.log("user id", user._id)
    console.log("existing", existingRatingObject.postedBy)
    //if no rating found
    if (existingRatingObject === undefined) {
        let rating = await Product.findByIdAndUpdate(product._id, {             //takes parameter to find and parameter to update
            $push: { ratings: { star, postedBy: user._id } },
        }, { new: true }
        ).exec();
        console.log("Ratings Added", rating);
        res.json(rating);
    }


    //if rating found
    else {
        const ratingUpdated = await Product.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject },
            },
            { $set: { "ratings.$.star": star } },
            { new: true }
        ).exec();
        console.log("ratingUpdated", ratingUpdated);
        res.json(ratingUpdated);
    }

}