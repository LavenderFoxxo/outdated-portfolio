const router = require("express").Router();
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const bodyParser = require("body-parser");

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

router.post("/contact", async (req, res) => {
  try {
    const embed = new MessageBuilder()
      .setTitle("New Contact Form Submission")
      .addField("Name", req.body.name, true)
      .addField("Email", req.body.email, true)
      .addField("Message", "```" + req.body.message + "```", false)
      .setColor("#2f3136");

    const hook = new Webhook(
      "https://discord.com/api/webhooks/1058003830559748096/I0Tu-x6NvcO7r_2sRzb01VPaCHG_-D-7ZLn5temNn41BLSvYPAAdGm0qJQa0yE4V04W6"
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
