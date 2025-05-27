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

async function runCode() {
  if (!pyodide) {
    document.getElementById("output").textContent = "Pyodide is still loading...";
    return;
  }

  const code = document.getElementById("code").value;
  try {
    const result = await pyodide.runPythonAsync(code);
    document.getElementById("output").textContent = result ?? "Code ran with no output.";
  } catch (err) {
    document.getElementById("output").textContent = "Error:\n" + err;
  }
}

initPyodide();
