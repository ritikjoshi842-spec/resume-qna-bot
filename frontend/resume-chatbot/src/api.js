export async function sendChatMessage(
  message,
  resume = null,
  jobDescription = null,
  onChunk = null
) {
  const formData = new FormData();

  // User's question
  formData.append("question", message);

  // Resume, if uploaded
  if (resume) {
    if (typeof resume === "string") {
      formData.append("resume", resume);
    } else if (resume instanceof File || resume instanceof Blob) {
      formData.append("resume", resume, resume.name || "resume.pdf");
    }
  }

  // Job description, if uploaded
  if (jobDescription) {
    if (typeof jobDescription === "string") {
      formData.append("job_description", jobDescription);
    } else if (jobDescription instanceof File || jobDescription instanceof Blob) {
      formData.append("job_description", jobDescription, jobDescription.name || "job_description.pdf");
    }
  }

  const response = await fetch("http://localhost:8000/get-questions", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.status}`);
  }

  if (!response.body) {
    throw new Error("Response body is missing");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let accumulatedText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    accumulatedText += chunk;

    if (onChunk && chunk) {
      onChunk(chunk);
    }
  }

  return accumulatedText;
}