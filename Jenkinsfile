pipeline {
    agent any
    
    environment {
        AWS_REGION = 'ap-northeast-2'
        ECR_REPO = '257840391579.dkr.ecr.ap-northeast-2.amazonaws.com/final'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        ECR_IMAGE = "${ECR_REPO}:${IMAGE_TAG}"
    }

    tools {
        nodejs 'node'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Image') {
            steps {
                dir('./server') {
                    sh 'node --version'
                    sh 'docker build -t my-app .'
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                withCredentials([awsEcr(credentialsId: 'wngud9646', region: 'ap-northeast-2')]) {
                    sh "docker tag my-app ${ECR_REPO}:latest"
                    sh "docker tag my-app ${ECR_IMAGE}"
                    sh "docker push ${ECR_REPO}:latest"
                    sh "docker push ${ECR_IMAGE}"
                }
            }
        }
    }
}
