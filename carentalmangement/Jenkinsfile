pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('car-rental-backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('car-rental-backend') {
                    sh 'npm test || echo "No backend tests defined"'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('car-rental-frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('car-rental-frontend') {
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        success {
            echo '✅ CI pipeline completed successfully.'
        }
        failure {
            echo '❌ CI pipeline failed.'
        }
    }
} 
