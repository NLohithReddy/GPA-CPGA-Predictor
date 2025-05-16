// Grade mapping function
function getGradePoint(score) {
  if (score >= 90) return 10;
  else if (score >= 80) return 9;
  else if (score >= 70) return 8;
  else if (score >= 60) return 7;
  else if (score >= 50) return 6;
  else if (score >= 40) return 5;
  else return 0;
}

// Toggle between GPA and CGPA sections
document.getElementById("gpaBtn").onclick = () => {
  document.getElementById("gpaSection").classList.remove("hidden");
  document.getElementById("cgpaSection").classList.add("hidden");
  document.getElementById("gpaBtn").classList.add("active");
  document.getElementById("cgpaBtn").classList.remove("active");
};

document.getElementById("cgpaBtn").onclick = () => {
  document.getElementById("cgpaSection").classList.remove("hidden");
  document.getElementById("gpaSection").classList.add("hidden");
  document.getElementById("cgpaBtn").classList.add("active");
  document.getElementById("gpaBtn").classList.remove("active");
};

// Generate input fields for subjects
function generateSubjectInputs() {
  const num = parseInt(document.getElementById("numSubjects").value);
  const container = document.getElementById("subjectInputs");
  container.innerHTML = "";

  for (let i = 0; i < num; i++) {
    container.innerHTML += `
      <div>
        <h4>Subject ${i + 1}</h4>
        <label>With Practical?</label>
        <select id="type${i}">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select><br/>
        <label>Sessional 1 (out of 50):</label>
        <input type="number" id="s1_${i}" />
        <label>Sessional 2 (out of 50):</label>
        <input type="number" id="s2_${i}" /><br/>
        <label>End Sem Theory (out of 100):</label>
        <input type="number" id="endTheory_${i}" /><br/>
        <div id="practicalFields${i}">
          <label>Mid-Sem Practical (out of 20):</label>
          <input type="number" id="midPrac_${i}" />
          <label>Regular Lab (out of 5):</label>
          <input type="number" id="lab_${i}" />
          <label>End Sem Practical (out of 50):</label>
          <input type="number" id="endPrac_${i}" />
        </div><br/>
      </div><hr/>
    `;
  }
}

// GPA Calculation
function calculateGPA() {
  const num = parseInt(document.getElementById("numSubjects").value);
  let totalPoints = 0;

  for (let i = 0; i < num; i++) {
    const withPractical = document.getElementById(`type${i}`).value === "yes";
    const s1 = parseFloat(document.getElementById(`s1_${i}`).value) || 0;
    const s2 = parseFloat(document.getElementById(`s2_${i}`).value) || 0;
    const endTheory = parseFloat(document.getElementById(`endTheory_${i}`).value) || 0;

    let total = ((s1 / 50) * 17.5) + ((s2 / 50) * 17.5);

    if (withPractical) {
      const midPrac = parseFloat(document.getElementById(`midPrac_${i}`).value) || 0;
      const lab = parseFloat(document.getElementById(`lab_${i}`).value) || 0;
      const endPrac = parseFloat(document.getElementById(`endPrac_${i}`).value) || 0;

      total += ((midPrac / 20) * 10) + lab + ((endPrac / 50) * 15) + ((endTheory / 100) * 35);
    } else {
      total += ((endTheory / 100) * 50) + 15; // project marks assumed full
    }

    const gradePoint = getGradePoint(total);
    totalPoints += gradePoint;
  }

  const gpa = (totalPoints / num).toFixed(2);
  document.getElementById("gpaResult").innerText = `Predicted GPA: ${gpa}`;
}

// Generate CGPA semester GPA inputs
function generateCGPAInputs() {
  const sems = parseInt(document.getElementById("totalSems").value);
  const container = document.getElementById("cgpaInputs");
  container.innerHTML = "";

  for (let i = 0; i < sems; i++) {
    container.innerHTML += `
      <label>Semester ${i + 1} GPA:</label>
      <input type="number" step="0.01" min="0" max="10" id="gpa_sem_${i}" /><br/>
    `;
  }
}

// CGPA Calculation
function calculateCGPA() {
  const sems = parseInt(document.getElementById("totalSems").value);
  let total = 0;

  for (let i = 0; i < sems; i++) {
    const gpa = parseFloat(document.getElementById(`gpa_sem_${i}`).value) || 0;
    total += gpa;
  }

  const cgpa = (total / sems).toFixed(2);
  document.getElementById("cgpaResult").innerText = `Predicted CGPA: ${cgpa}`;
}

// Export GPA to PDF
function exportGPA() {
  const element = document.getElementById("gpaResultContainer");
  html2pdf().from(element).set({ margin: 10, filename: 'GPA_Result.pdf' }).save();
}

// Export CGPA to PDF
function exportCGPA() {
  const element = document.getElementById("cgpaResultContainer");
  html2pdf().from(element).set({ margin: 10, filename: 'CGPA_Result.pdf' }).save();
}
