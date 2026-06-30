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


