import * as functions from "firebase-functions";
import fetch from "node-fetch";
import { auth } from "../../config/firebase";

export const sendEmail = async () => {
  functions.https.onRequest(async (req, res) => {
    const { to, subject, text } = req.body;

    const apiKey = "02cf4e3728db3a1dae58df75900b4dcb-2175ccc2-5d67c684";
    const domain = "675fa15dc44331b5a95d77d92bd05c2b-2175ccc2-de6aff71";

    const mailgunUrl = `https://api.mailgun.net/v3/${domain}/messages`;

    const formData = new URLSearchParams();

    formData.append("from", "isaacbowyer@googlemail.com");
    formData.append("to", auth.currentUser.email);
    formData.append("subject", "Successfully deleted your Open-OH account");
    formData.append("text", "Your Open-OH account was deleted");

    try {
      const response = await fetch(mailgunUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString(
            "base64"
          )}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error.message);
      res.status(500).send("Error sending email");
    }
  });
};
