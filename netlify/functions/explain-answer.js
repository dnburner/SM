
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { question, correctAnswer, studentAnswer } = JSON.parse(event.body);

  const prompt = `
You are a friendly 1st grade math teacher. A student answered this question incorrectly:

Question: ${question}
Student Answer: ${studentAnswer}
Correct Answer: ${correctAnswer}

Explain the correct answer in simple words a 6-7 year old can understand. Use a calm and encouraging tone.
`.trim();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content || "I'm not sure. Try again!";
    return {
      statusCode: 200,
      body: JSON.stringify({ explanation })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ explanation: "Error reaching explanation service." })
    };
  }
};
