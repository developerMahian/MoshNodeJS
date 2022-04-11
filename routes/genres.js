const Joi = require("joi");

const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

router.get("/", (req, res) => res.send(genres));

router.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name || "didn't get the Json data...",
  };
  genres.push(genre);
  res.send(genre);
});

router.get("/:id", (req, res) => {
  const particularCourse = genres.find((c) => c.id === parseInt(req.params.id));

  if (particularCourse) return res.send(`<h1>${particularCourse.name}</h1>`);
  else return res.status(404).send("The genre is probably F*c*ed....");
});

router.put("/:id", (req, res) => {
  // lookup the genre..
  const particularCourse = genres.find((c) => c.id === parseInt(req.params.id));
  if (!particularCourse)
    return res.status(404).send("The genre is probably F*c*ed....");

  // validate with Joi..
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);

  // update genre when validation succeeds..
  particularCourse.name = req.body.name;
  res.send(particularCourse);
});

router.delete("/:id", (req, res) => {
  const particularCourse = genres.find((c) => c.id === parseInt(req.params.id));
  if (!particularCourse)
    return res.status(404).send("The genre is probably F*c*ed....");

  const index = genres.indexOf(particularCourse);

  genres.splice(index, 1);

  res.send(particularCourse);
});

module.exports = router;
