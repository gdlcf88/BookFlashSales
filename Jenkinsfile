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
    stage ('install podman') {
            steps {
                container ('base') {
                    
                    sh 'cd /usr'
                    sh 'ls'
                    
                }
            }
        }
    stage('build & push') {
      agent none
      steps {
        container('base') {
          sh 'git clone https://github.com/hueifeng/BookFlashSales'
          sh 'ls'
          sh 'cd BookFlashSales && podman build -f src/BookFlashSales.Web/Dockerfile .'
        //  sh 'docker push  $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:devops-test'
        }

      }
    }

  }
   environment {
        REGISTRY = 'easy'
        DOCKERHUB_USERNAME = 'ks-devops-harbor'
        HARBOR_NAMESPACE = 'ks-devops-harbor'
        APP_NAME = 'easy-java'
      }
}
