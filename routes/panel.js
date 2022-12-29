const router = require("express").Router();
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const bodyParser = require("body-parser");
require('dotenv').config()

router.use(bodyParser.json());

router.get("/", async (req, res) => {
  res.render("index.ejs");
});

router.get("/contact", async (req, res) => {
  res.render("contact.ejs");
});

router.get("/examples", async (req, res) => {
  res.render("examples.ejs");
});

router.get('/thanks', async (req, res) => {
    res.render('thanks.ejs')
})

router.post("/contact", async (req, res) => {
  try {
    const embed = new MessageBuilder()
      .setTitle("New Contact Form Submission")
      .addField("Name", req.body.name, true)
      .addField("Email", req.body.email, true)
      .addField("Message", "```" + req.body.message + "```", false)
      .setColor("#2f3136");

    const hook = new Webhook(
      process.env.CONTACTHOOK
    );

    hook.setUsername("New Contact Submission");
    hook.setAvatar("https://static.itsalexander.dev/personal/main.png");
    hook.send(embed);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
