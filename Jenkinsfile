pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
  }

  environment {
    NODE_ENV = "production"
    registry = 'eeba19/cicd-frontend'
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
        script {
          echo 'Deploying app'
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
