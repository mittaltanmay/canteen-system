const { exec } = require("child_process");

console.log("🔥 Auto MapReduce Trigger Started...");

let isRunning = false;

function runMapReduceJob() {
    if (isRunning) return console.log("⏳ Previous job running...");
    isRunning = true;

    console.log("⏳ Checking for new data in /salesraw ...");

    // Generate unique output folder name
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outputDir = `/salesprocessed/run-${timestamp}`;
    console.log("📁 Output folder:", outputDir);

    // Run MapReduce for all new data
    const cmd = `hadoop jar C:\\Users\\dell\\OneDrive\\Desktop\\smart-canteen-system\\canteen-system\\hadoop-jobs\\sales-clean\\sales-clean.jar SalesCleanDriver /salesraw ${outputDir}`;

    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.error("❌ MapReduce Failed:", err.message);
        } else {
            console.log(`✔ MapReduce Completed → Output stored in ${outputDir}`);
        }
        isRunning = false;
    });
}

setInterval(runMapReduceJob, 60000); // run every 1 min
