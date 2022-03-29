const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const allCats = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(allCats);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const catID = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(catID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCat = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateCat = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    res.status(200).json(updateCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const destroybyID = await Category.destroy({
      where: { id: req.params.id },
    });
    if (!destroybyID) {
      res.status(404).json({ message: "No category with this Id" });
      return;
    }
    res.status(200).json(destroybyID);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
