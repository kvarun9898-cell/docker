
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

        stage('Build Backend') {
            steps {
                sh 'docker build -t backend:prod ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t frontend:prod ./frontend'
            }
        }

        stage('Pull MySQL Image') {
            steps {
                sh 'docker pull mysql:8.0'
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login --username AWS --password-stdin ${ECR_REGISTRY}
                '''
            }
        }

        stage('Tag Images') {
            steps {
                sh '''
                    docker tag backend:prod ${ECR_BACKEND}
                    docker tag frontend:prod ${ECR_FRONTEND}
                    docker tag mysql:8.0 ${ECR_MYSQL}
                '''
            }
        }

        stage('Push Images to ECR') {
            steps {
                sh '''
                    docker push ${ECR_BACKEND}
                    docker push ${ECR_FRONTEND}
                    docker push ${ECR_MYSQL}
                '''
            }
        }
    }

    post {
        success {
            echo 'Docker images pushed to Amazon ECR successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the console output.'
        }
    }
}


