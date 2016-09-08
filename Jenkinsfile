node {
stage 'Checkout'
   git credentialsId: '73534043-e92f-42d2-b0a3-c954b09ebd49', url: 'https://github.com/markoniemi/electronic-life.git'

stage 'Install'
   def nodeJS = tool 'NodeJS'
   sh "${nodeJS}/bin/npm set progress=false"
   sh "${nodeJS}/bin/npm install"
   sh "${nodeJS}/bin/npm install phantomjs-prebuilt sinon karma-sinon"
stage 'Build'
   sh "${nodeJS}/bin/npm test"
   step([$class: 'JUnitResultArchiver', testResults: 'reports/test/TESTS.xml'])
stage 'Analyse'
   def sonarqubeScanner = tool name: 'SonarQube Runner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
   sh "${sonarqubeScanner}/bin/sonar-scanner -e -Dsonar.host.url=${env.SONAR_URL}"
}
