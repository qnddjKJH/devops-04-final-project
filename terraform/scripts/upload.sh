#!/bin/bash

public_ip=$(aws ec2 --profile=admin describe-instances --instance-id ${1} --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

ssh -i ./keypair/mission_link.pem ubuntu@$public_ip "mkdir -p /home/ubuntu/.ssh/mlink"

scp -i ./keypair/mission_link.pem ./keypair/mlink_worker_node.pem ubuntu@$public_ip:/home/ubuntu/.ssh/mlink/

ssh -i ./keypair/mission_link.pem ubuntu@$public_ip "chmod 400 /home/ubuntu/.ssh/mlink/mlink_worker_node.pem"