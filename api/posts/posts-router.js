// implement your posts router here

const Posts = require("./posts-model");
const router = require("express").Router();

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post("/", (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      if (!req.body.contents || !req.body.title) {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post" });
      } else {
        res.status(201).json(post);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes).then((posts) => {
    if (!req.body.contents || !req.body.title) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post" });
    } else if (!posts) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.status(201).json(posts);
    }
  });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    });
});


module.exports = router;
