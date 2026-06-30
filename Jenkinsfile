pipeline {

    agent any

    environment {
        AWS_REGION='ap-south-2'
        ACCOUNT_ID='577267183852'
        ECR_BACKEND="577267183852.dkr.ecr.ap-south-2.amazonaws.com/backend:prod"
        ECR_FRONTEND="577267183852.dkr.ecr.ap-south-2.amazonaws.com/frontend:prod"
        MYSQL_REPO = 'mysql'
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
                sh 'docker build -t backend:prod ./docker/backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t frontend:prod ./docker/frontend'
            }
        }
 stage('Pull MySQL Image') {
            steps {
                sh 'docker pull mysql:8.0'
            }
        }
        
        stage('ECR Login') {
            steps {
                sh '''
                aws ecr get-login-password \
                --region ap-south-2 \
                | docker login \
                --username AWS \
                --password-stdin \
                577267183852.dkr.ecr.ap-south-2.amazonaws.com
                '''
            }
        }

 stage('Push Images') {
    steps {
        sh '''
        docker tag backend:prod 577267183852.dkr.ecr.ap-south-2.amazonaws.com/backend:prod
        docker push 577267183852.dkr.ecr.ap-south-2.amazonaws.com/backend:prod

        docker tag frontend:prod 577267183852.dkr.ecr.ap-south-2.amazonaws.com/frontend:prod
        docker push 577267183852.dkr.ecr.ap-south-2.amazonaws.com/frontend:prod
        
        docker tag mysql:8.0 577267183852.dkr.ecr.ap-south-2.amazonaws.com/$MYSQL_REPO:8.0
        docker push 577267183852.dkr.ecr.ap-south-2.amazonaws.com/$MYSQL_REPO:8.0
        '''
    }
}
 
        stage('Deploy') {
            steps {
                sh '''
				
				        # Login to ECR
				 aws ecr get-login-password --region ap-south-2  | \
                docker login --username AWS --password-stdin \
                577267183852.dkr.ecr.ap-south-2.amazonaws.com
				
                 # Create network 
                docker network create app-network || true
                
                docker rm -f frontend || true
                docker rm -f backend || true
                 docker rm -f mysql || true
				 
		docker pull 577267183852.dkr.ecr.ap-south-2.amazonaws.com/mysql:8.0
        docker pull 577267183852.dkr.ecr.ap-south-2.amazonaws.com/backend:prod
        docker pull 577267183852.dkr.ecr.ap-south-2.amazonaws.com/frontend:prod
		
		 # Create persistent volume
        docker volume create mysql-data || true

        # Run MySQL first
        docker run -d \
          --name mysql \
          --network app-network \
          -e MYSQL_ROOT_PASSWORD=root123 \
          -e MYSQL_DATABASE=mydb \
          -e MYSQL_USER=admin \
          -e MYSQL_PASSWORD=admin123 \
          -p 3306:3306 \
          577267183852.dkr.ecr.ap-south-2.amazonaws.com/mysql:8.0

        # Wait for MySQL to start
        sleep 20

        # Run Backend
        docker run -d \
          --name backend \
          --network app-network \
          -p 5000:5000 \
          -e DB_HOST=mysql \
          -e DB_USER=admin \
          -e DB_PASSWORD=admin123 \
          -e DB_NAME=mydb \
          577267183852.dkr.ecr.ap-south-2.amazonaws.com/backend:prod
               # Run Frontend
        docker run -d \
          --name frontend \
          --network app-network \
          -p 80:80 \
          577267183852.dkr.ecr.ap-south-2.amazonaws.com/frontend:prod
          '''
            }
        }
       

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}
