FROM sonarqube:7.0
ADD https://sonarsource.bintray.com/Distribution/sonar-javascript-plugin/sonar-javascript-plugin-4.1.0.6085.jar /opt/sonarqube/extensions/plugins/
ADD https://github.com/racodond/sonar-css-plugin/releases/download/4.13/sonar-css-plugin-4.13.jar /opt/sonarqube/extensions/plugins/
ADD https://sonarsource.bintray.com/Distribution/sonar-ldap-plugin/sonar-ldap-plugin-2.2.0.608.jar /opt/sonarqube/extensions/plugins/
ADD https://github.com/SonarQubeCommunity/sonar-l10n-zh/releases/download/sonar-l10n-zh-plugin-1.20/sonar-l10n-zh-plugin-1.20.jar /opt/sonarqube/extensions/plugins
ADD https://sonarsource.bintray.com/Distribution/sonar-scm-git-plugin/sonar-scm-git-plugin-1.3.0.869.jar /opt/sonarqube/extensions/plugins/
COPY sonar.properties /opt/sonarqube/conf/
COPY add-certs-to-keystore.sh /tmp/add-certs-to-keystore.sh
RUN /tmp/add-certs-to-keystore.sh
