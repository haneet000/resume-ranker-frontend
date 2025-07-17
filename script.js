document.getElementById("resumeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = document.getElementById("resumeForm");
  const formData = new FormData(form);

  const loadingBox = document.getElementById("loading");
  const resultBox = document.getElementById("result");

  loadingBox.classList.remove("hidden"); 
  resultBox.classList.add("hidden");    

  try {
    const response = await fetch("https://resume-ranker-i32q.onrender.com/match-resume/", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "Unknown error");
    }

    const data = await response.json();

    document.getElementById("score").textContent = data.match_score;
    document.getElementById("fit").textContent = data.match_result;
    document.getElementById("excerpt").textContent = data.resume_excerpt;

    resultBox.classList.remove("hidden");

  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    loadingBox.classList.add("hidden"); 
  }
});
