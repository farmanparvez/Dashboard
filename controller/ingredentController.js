const Ingredent = require("../model/Ingredent");

exports.createIngredent = async (req, res) => {
  try {
    const { ingredent, dishId } = req.body;
    if (!ingredent)
      return res.status(400).json({
        status: "failed",
        message: "Ingredent name is required",
      });
    const ingred = await Ingredent.findOne({ ingredent });
    if (ingred)
      return res.status(400).json({
        status: "failed",
        message: "Ingredent already exits",
      });
    await Ingredent.create({ ingredent, dishId });

    res
      .status(200)
      .json({ status: "success", message: "Ingredent is create successfully" });
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
    const ingredent = await Ingredent.find({ dishId: req.params.id});
    res.status(200).json({
      status: "success",
      message: "Data fetch successfully",
      data: ingredent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};
