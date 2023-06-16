pipeline {
    agent any
    
    environment {
        REGION = 'ap-northeast-2'
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
                    sh "docker build -t ${ECR_IMAGE} ."
                }
            }
        }
        
        stage('upload aws ECR') {
            steps {
                script{
                    withAWS(region:'ap-northeast-2', credentials:'wngud9646') {
                        def login = ecrLogin()
                        echo "${login}"
                        // 실제 로그인
                        sh "${login}"
                        sh "docker push ${ECR_IMAGE}"
                        sh "docker rmi ${ECR_IMAGE}"
                    }

                }
            }
    }
  }
}
