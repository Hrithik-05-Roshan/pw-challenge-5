import { execSync } from "child_process";
import fs from "fs";

// Verify git tracked files size
try {
  const output = execSync("git ls-files", { encoding: "utf8" });
  const files = output.split("\n").map((f) => f.trim()).filter(Boolean);
  
  let totalBytes = 0;
  for (const file of files) {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      totalBytes += stats.size;
    }
  }

  const totalMB = totalBytes / (1024 * 1024);
  console.log(`[Gatherly AI Size Check] Tracked files: ${files.length}`);
  console.log(`[Gatherly AI Size Check] Total repo size: ${totalMB.toFixed(2)} MB`);

  if (totalMB > 10.0) {
    console.error(`ERROR: Repository exceeds hard limit of 10 MB (${totalMB.toFixed(2)} MB)!`);
    process.exit(1);
  } else if (totalMB > 5.0) {
    console.warn(`WARNING: Repository exceeds recommended 5 MB target (${totalMB.toFixed(2)} MB).`);
  } else {
    console.log(`SUCCESS: Repository size is well within the 5 MB target!`);
  }
} catch {
  console.log("[Gatherly AI Size Check] Git repository not yet initialized or git check bypassed.");
}
