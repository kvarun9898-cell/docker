pipeline {

    agent any

    environment {
        AWS_REGION = 'ap-south-2'
        ACCOUNT_ID = '577267183852'

        ECR_REGISTRY = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

        ECR_BACKEND = "${ECR_REGISTRY}/backend:prod"
        ECR_FRONTEND = "${ECR_REGISTRY}/frontend:prod"
        ECR_MYSQL = "${ECR_REGISTRY}/mysql:8.0"
    }

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/kvarun9898-cell/docker.git'
            }
        }

        stage('Build Back
