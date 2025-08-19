let pyodide = null;

async function initPyodide() {
  pyodide = await loadPyodide();
  await pyodide.loadPackage([
    "numpy",
    "pandas",
    "matplotlib",
  ]);
  document.getElementById("output").textContent =
    "Pyodide is ready. You can run Python code now.";
}

// Example input:
// print("Hello World")
// 8+8
// Example output:
// Hello World
// Result: 16

async function runCode() {
  if (!pyodide) {
    document.getElementById("output").textContent = "Pyodide is still loading...";
    return;
  }

  const code = document.getElementById("code").value;

  try {

    let output = "";
    // Print statements and Errors writes to stdout/stderr - send it to output
    pyodide.setStdout({
      batched: (s) => { output += s; }
    });
    pyodide.setStderr({
      batched: (s) => { output += s; }
    });
  
    const result = await pyodide.runPythonAsync(code);
    // append the print statement as well as the output of the code (return statement)
    let finalOutput = "";
    if (output.trim()) {
      finalOutput += output.trim() + "\n";
    }
    if (result !== undefined && result !== null) {
      finalOutput += "Result: " + result;
    }
    if (!finalOutput.trim()) {
      finalOutput = "Code ran with no output.";
    }

    document.getElementById("output").textContent = finalOutput;
  } catch (err) {
    document.getElementById("output").textContent = "Error:\n" + err;
  }
}


initPyodide();
