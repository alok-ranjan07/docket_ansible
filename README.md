Ansible Automation with Docker Swarm
Easily deploy, scale, and manage your Ansible environment using Docker Swarm.
Language composition:
JavaScript Python Dockerfile Ansible

All commands below can be run from your VS Code terminal on Windows, macOS, or Linux.

1. Initialize Docker Swarm & Network
Start Docker Swarm mode and set up the required overlay network:
```
docker swarm init
docker network create -d overlay ansible_net
docker pull alokranjan2000/ansible_nodes
```

2. Deploy the Ansible Stack
Launch your Ansible stack using Docker Compose:
```
docker stack deploy -c docker-compose.yml ansible_stack
```

3. Scale Target Nodes
Change the number of target nodes as needed (replace N with your desired number):
```
docker service scale ansible_stack_target=N
```

4. Update the Inventory File
After all services are running, generate or update your Ansible inventory:
```
python generate_inventory.py
```
or
```
node generate_inventory.js
```

5. Run Your Ansible Playbook
Execute your playbook on the master node:
```
docker exec -it $(docker ps -q --filter name=ansible_stack_master) ansible-playbook /etc/ansible/playbook/playbook.yml -u ansible
```

6. Check Service Status
Review the state of your target nodes and running services:
```
docker service ps ansible_stack_target
```

7. Tear Down All Services
Remove the entire Ansible stack:
```
docker stack rm ansible_stack
```

Enjoy seamless, scalable, and automated Ansible deployments with Docker Swarm!
All commands work in the VS Code terminal on Windows.

