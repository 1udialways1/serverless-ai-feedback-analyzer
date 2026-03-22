const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  try {
    const { feedback } = JSON.parse(event.body);

    const fetch = (...args) =>
      import("node-fetch").then(({ default: fetch }) => fetch(...args));

    const aiRes = await fetch(
      "https://kyqi5xmyg1.execute-api.ap-south-1.amazonaws.com/feedback",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      }
    );

    const data = await aiRes.json();

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db("myapp");

    await db.collection("feedbacks").insertOne({
      message: feedback,
      sentiment: data.sentiment,
      reply: data.reply,
      createdAt: new Date(),
    });

    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("🔥 ERROR:", err); // IMPORTANT
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};