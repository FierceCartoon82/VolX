  /**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.webhookHandler = functions.https.onRequest(async (req, res) => {
  const data = req.body; // Data from the webhook

  try {
  // Store the data in Firestore
    const firestore = admin.firestore();
    await firestore.collection("webhookData").add(data);

    return res.status(200).send("Data stored in Firestore successfully.");
  } catch (error) {
    return res.status(500).send("Error storing data in Firestore:" + error);
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
