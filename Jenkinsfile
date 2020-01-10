#!/usr/bin/env groovy

node {
    stage('checkout') {
        checkout scm
    }

    docker.image('jhipster/jhipster:v6.6.0').inside('-u jhipster -e MAVEN_OPTS="-Duser.home=./"') {
        stage('check java') {
            sh "java -version"
        }

        stage('clean') {
            sh "chmod +x mvnw"
            sh "./mvnw -ntp clean"
        }
        stage('nohttp') {
            sh "./mvnw -ntp checkstyle:check"
        }

        stage('install tools') {
            sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm -DnodeVersion=v12.13.1 -DnpmVersion=6.13.4"
        }

        stage('npm install') {
            sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm"
        }

        stage('backend tests') {
            try {
                sh "./mvnw -ntp verify"
            } catch (err) {
                throw err
            } finally {
                junit '**/target/test-results/**/TEST-*.xml'
            }
        }

        stage('frontend tests') {
            try {
                sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm -Dfrontend.npm.arguments='run test'"
            } catch (err) {
                throw err
            } finally {
                junit '**/target/test-results/**/TEST-*.xml'
            }
        }

        stage('packaging') {
            sh "./mvnw -ntp verify -Pprod -DskipTests"
            archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
        }
    }

    def dockerImage
    def BUILD_DATE = sh(script: "echo `date +%s`", returnStdout: true).trim()
    stage('publish docker') {
        withCredentials([usernamePassword(credentialsId: 'dockerregistry-login', passwordVariable: 'DOCKER_REGISTRY_PWD', usernameVariable: 'DOCKER_REGISTRY_USER')]) {
            sh "printenv"
            sh "echo \"docker registry user = ${env.DOCKER_REGISTRY_USER}\""
            sh "ping -c 3 https://dockerregistry.eigenbaumarkt.com"
            sh "./mvnw -X -ntp jib:build"        }
    }
}
