pipeline {
    agent any
    
    environment {
        AWS_REGION = 'ap-northeast-2'
        ECR_REPO = '257840391579.dkr.ecr.ap-northeast-2.amazonaws.com/final'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        ECR_IMAGE = "${ECR_REPO}:${IMAGE_TAG}"
        
        AWS_CREDENTIAL_NAME = 'wngud9646'
    }

    tools {
        nodejs "nodejs"
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
        
        stage('upload aws ECR') {
            steps {
                script{
                    // cleanup current user docker credentials
                    sh 'rm -f ~/.dockercfg ~/.docker/config.json || true'
                    
                   
                    docker.withRegistry("https://${ECR_PATH}", "ecr:${REGION}:${AWS_CREDENTIAL_NAME}") {
                      docker.image("${ECR_IMAGE}").push()
                      docker.image("${ECR_REPO}:latest").push()
                    }

                }
            }
    }
  }
}
