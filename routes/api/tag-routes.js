const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll();
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagByID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagByID) {
      res
        .status(404)
        .json({ message: "Cannot Find Tag. No Tag found with this id!" });
      return;
    }

    res.status(200).json(tagByID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateTagByID = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updateTagByID) {
      res
        .status(404)
        .json({ message: "Cannot Update Tag. No Tag found with this id!" });
      return;
    }
    res.status(200).json(updateTagByID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const destroyTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!destroyTag) {
      res
        .status(404)
        .json({ message: "Cannot Delete Tag. No Tag found with this id!" });
      return;
    }

    res.status(200).json(destroyTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
