import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generateNickname(req.body.character),
    temperature: 0.7,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generateNickname(nickname) {
  const capitalizedNickname =
    nickname[0].toUpperCase() + nickname.slice(1).toLowerCase();
  return `Suggest only one name for a character with a title.

  Character: ${capitalizedNickname}
  Names:`;
}
