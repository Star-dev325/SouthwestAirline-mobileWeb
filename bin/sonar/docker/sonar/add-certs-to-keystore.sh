#!/bin/bash

mkdir /tmp/certs-to-add
cd /tmp/certs-to-add
cat /dev/null | openssl s_client -showcerts -connect vplbldap02a.swacorp.com:636 | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' | csplit --suffix-format='%02d.pem' --prefix='ldap-cert-chain' - '/END CERTIFICATE/+1'
for certFile in *.pem; do
    echo "yes" | $JAVA_HOME/bin/keytool -import --trustcacerts -file $certFile -alias $certFile -keystore $JAVA_HOME/jre/lib/security/cacerts -storepass changeit
done
rm -rf /tmp/certs-to-add

