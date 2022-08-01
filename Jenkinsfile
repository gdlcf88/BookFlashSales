pipeline {
 agent {
    node {
      label 'base'
    }
  }

  stages {
 stage('Clone repository') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: 'main']], 
                    extensions: [[$class: 'CloneOption', depth: 1, shallow: true]], userRemoteConfigs: [[url: 'https://github.com/hueifeng/BookFlashSales']]
                ])
      }
    }
    stage('build & push') {
      agent none
      steps {
        container('base') {
          sh 'git clone https://github.com/hueifeng/BookFlashSales'
          sh 'ls'
          sh 'cd BookFlashSales && podman build -f src/BookFlashSales.Web/Dockerfile . --tag bookflashsales' 
          sh 'podman tag bookflashsales docker.io/hueifeng/bookflashsales-api'
          sh 'podman images'
          sh 'echo $DOCKERHUB_CREDENTIAL_PSW | podman login -u $DOCKERHUB_CREDENTIAL_USR --password-stdin'
          sh 'podman push docker.io/hueifeng/bookflashsales-api'
        }

      }
    }

  }
   environment {
        REGISTRY = 'easy'
        DOCKERHUB_USERNAME = 'ks-devops-harbor'
        HARBOR_NAMESPACE = 'ks-devops-harbor'
        APP_NAME = 'easy-java'
        DOCKERHUB_CREDENTIAL = credentials('docker')
      }
}
