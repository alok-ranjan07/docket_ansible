const { execSync } = require("child_process");
const fs = require("fs");

// Get container names and networks for containers matching "target"
const psOutput = execSync(
  `docker ps --filter name=target --format "{{.Names}}"`
)
  .toString()
  .trim();

if (!psOutput) {
  console.log("No target containers found.");
  process.exit(0);
}

const containerNames = psOutput.split("\n");

const hostMap = {};

containerNames.forEach((name) => {
  const inspectOutput = execSync(`docker inspect ${name}`).toString();
  const ipMatch = inspectOutput.match(/"IPAddress":\s*"([0-9.]+)"/);
  if (ipMatch) {
    hostMap[name] = ipMatch[1];
  }
});

// Generate hosts file content
let content = "[docker-hosts]\n";
let idx = 1;
for (const [name, ip] of Object.entries(hostMap)) {
  content += `${name} ansible_host=${ip}\n`;
  idx++;
}

content += "\n[docker-hosts:vars]\n";
content += "ansible_user=ansible\n";

// Write to ansible/hosts
fs.writeFileSync("ansible/hosts", content);
