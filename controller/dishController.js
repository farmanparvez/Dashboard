const Dish = require("../model/DistModal");

exports.createDish = async (req, res) => {
  try {

    const { dishName } = req.body;
    if (!dishName)
      return res.status(400).json({
        status: "failed",
        message: "Dish name is required",
      });
    const dish = await Dish.findOne({ dishName });
    if (dish)
      return res.status(400).json({
        status: "failed",
        message: "Dish already exits",
      });
    await Dish.create({ dishName });

    res
      .status(200)
      .json({ status: "success", message: "Dish is create successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getDish = async (req, res) => {
  try {
    // console.log(req.query)
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 6

    const skip = (page - 1) * limit

    const dishes = await Dish.find();
    const dish = await Dish.find().skip(skip).limit(limit);
    res.status(200).json({
      status: "success",
      message: "Data fetch successfully",
      data: dish,
      count: dishes?.length
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};


exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Data fetch successfully",
      data: dish,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};
