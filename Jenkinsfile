pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
  }

  environment {
    NODE_ENV = "production"
    registry = 'eeba19/cicd-frontend'
    blueContainerName = 'frontend-blue'
    greenContainerName = 'frontend-green'
    ec2InstanceId = 'i-0d201d57392da5b64'
  }

  stages {
    stage('SCM') {
      steps {
        checkout scm
      }
      post {
        failure {
          script {
            sendFailureEmail('SCM')
          }
        }
      }
    }
    stage('Linting') {
      steps {
        script {
          def scannerHome = tool 'Sonarqube';
          withSonarQubeEnv() {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Linting')
          }
        }
      }
    }
    stage('Testing') {
      steps {
        script {
          echo 'Running tests...'
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Testing')
          }
        }
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${registry}:${env.BUILD_NUMBER}")
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Build Docker Image')
          }
        }
      }
    }
    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'docker_hub') {
            dockerImage.push()
            dockerImage.push("latest")
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Push Docker Image')
          }
        }
      }
    }
    stage('Deploy App') {
      steps {
        withCredentials([
          sshUserPrivateKey(credentialsId: 'your-ssh-credentials-id', keyFileVariable: 'SSH_KEY')
        ]) {
          script {
            sh """
              ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ec2-user@${ec2InstanceId} '
                docker stop vuejs-frontend || true &&
                docker rm vuejs-frontend || true &&
                docker pull ${registry}:latest &&
                docker run -d --name vuejs-frontend -p 80:80 ${registry}:latest
              '
            """
          }
        }
      }
      post {
        failure {
          script {
            sendFailureEmail('Deploy App')
          }
        }
      }
    }
  }

  post {
    failure {
      script {
        sendFailureEmail('Pipeline')
      }
    }
  }
}

def sendFailureEmail(String stageName) {
  emailext body: "The '${stageName}' stage in the Jenkins pipeline has failed. Please check the details.",
          recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
          subject: "Pipeline Failure: ${stageName} Stage"
}
