import subprocess
import re

output = subprocess.check_output([
    "docker", "ps", "--filter", "name=target", "--format", "{{.Names}} {{.Networks}}"
])
lines = output.decode().splitlines()

host_map = {}
for line in lines:
    parts = line.split()
    name = parts[0]
    inspect = subprocess.check_output(["docker", "inspect", name])
    ip_match = re.search(r'"IPAddress": "([0-9\.]+)"', inspect.decode())
    if ip_match:
        ip = ip_match.group(1)
        host_map[name] = ip

with open("ansible/hosts", "w") as f:
    f.write("[docker-hosts]\n")
    for idx, (name, ip) in enumerate(host_map.items(), 1):
        f.write(f"target_node{idx} ansible_host={ip}\n")
    f.write("\n[docker-hosts:vars]\nansible_user=ansible\n")
