const Ingredent = require("../model/Ingredent");

exports.createIngredent = async (req, res) => {
  try {
    const { ingredent } = req.body;
    if (!ingredent)
      return res.status(400).json({
        status: "failed",
        message: "Dish name is required",
      });
    const ingred = await Ingredent.findOne({ ingredent });
    if (ingred)
      return res.status(400).json({
        status: "failed",
        message: "Dish already exits",
      });
    await Ingredent.create({ ingredent });

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

exports.getIngredent = async (req, res) => {
  try {
    const ingredent = await Ingredent.find();
    res.status(200).json({
      status: "success",
      message: "Data fetch successfully",
      data: ingredent,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};
