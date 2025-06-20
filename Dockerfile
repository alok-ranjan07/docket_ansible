FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    sudo openssh-client openssh-server iproute2 ansible bash python3 \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -ms /bin/bash ansible && \
    mkdir -p /home/ansible/.ssh && \
    chmod 700 /home/ansible/.ssh && \
    chown ansible:ansible /home/ansible/.ssh && \
    echo "ansible ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    mkdir /var/run/sshd && \
    sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]