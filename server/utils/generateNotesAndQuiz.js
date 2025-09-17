import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
export async function generateNotesAndQuiz(videoUrl) {
      const videoId = videoUrl.split("v=")[1] || videoUrl.split("youtu.be/")[1];
  if(!videoId) {
    console.error("Invalid YouTube URL");
    return ;
  }
  try {
   const response1 = await fetch("https://www.youtube-transcript.io/api/transcripts", {
  method: "POST",
  headers: {
    "Authorization": "Basic 68ca0ec8c278200a1a6d85b4",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    ids: [videoId],
  })
})
const data1 = await response1.json();
const string = `title :${data1[0].title}

transcript :${data1[0].tracks[0].transcript.map((item)=>item.text ).join(' ')}

`
    const response2 = await client.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: `You are a helpful assistant that summarizes transcripts.If the transcripts is not in english convert it to english . Don't give a words like likes,share,subscribe and comment. Format the summary as bullet points,Respond only in plain text. Do not use Markdown, headings, tables, or formatting..Example:
          Return output strictly as valid JSON.
Format:
{
  "notes": "Section 1. Introduction
• Presenter explains the urgent problem of air pollution in Delhi/NCR.
• Air Quality Index (AQI) is often 300–400+, a “serious” category.
• Exposure to such air can cause a variety of health issues (respiratory, cardiovascular, etc.).
Section 2. What Causes Air Pollution?
Two broad categories:
• Natural causes (volcanoes, dust storms, wildfires, pollen, etc.)
• Man-made (anthropogenic) causes (industrial emissions, vehicles, burning biomass, etc.)
• Natural events are unavoidable; mitigation focus is on man-made sources.",
  "quiz": [
    {
      "question": "Which of the following is NOT a natural source of air pollution?",
      "options": ["Volcanic eruptions", "Dust storms", "Factory emissions", "Wildfires"],
      "answer": "C"
    },{
      "question": "Which indoor activity can increase indoor air pollution?",
      "options": ["Using a high-efficiency AC", "Burning incense or candles", "Ventilating windows every morning", "Installing a HEPA filter"],
      "answer": "B"
    }
  ]
}
` },
        { role: "user", content: `I have a transcript of youTube videos about environmental education. Extract or summarize their transcripts and create structured notes in a clear, teaching-friendly format.At last also create quiz of maximum 5 mcq :\n\n${string}` }
      ],
    });
    const notesAndQuiz = JSON.parse(response2.choices[0].message.content);
    return notesAndQuiz;
} catch (err) {
    console.error( err);
    return null;
  }
}
