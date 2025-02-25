// Require:
var postmark = require("postmark");

async function contactFormSubmissionEmailHandler(req, res) {
  const data = await req.body;

  // Send an email:
  var client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

  try {
    client.sendEmail({
      From: "admin@uketa.online",
      To: "rhea@believerance.com",
      Subject: `Uketa Contact Form Submission - ${data.name}`,
      HtmlBody: `<p>There was a submission on the Uketa App contact form with the following Information.</p><br/><strong>Fullname:</strong> ${data.name}<br/><strong>Email:</strong> ${data.email}<br/><strong>Subject:</strong> ${data.subject}<br/><strong>Message:</strong> ${data.message}<br/>`,
      TextBody: `Fullname: ${data.name}, Email: ${data.email}, Subject: ${data.subject}, Message: ${data.message}`,
      MessageStream: "outbound",
    });

    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: "Email sent successfully.",
      })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        status: 500,
        error: "In update user " + e,
        response: null,
      })
    );
  }
}

export default contactFormSubmissionEmailHandler;
