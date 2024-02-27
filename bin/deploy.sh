#!/bin/bash

# Usage:
#   VERSION=15.1.0-SNAPSHOT ENV=itest2 HOST=xldngw03 ./tools/deploy.sh

# Environment Hosts:
#   Dev2: xldngw03


set -ex

rm -f /tmp/$JOB_NAME/deploy.sha
mkdir -p /tmp/$JOB_NAME

cat << EOF |
#!/bin/bash
group=swfwadm
if [ \$(id -gn) != \$group ]; then
  echo "switching to  \$group"
  exec sg \$group "\$0 \$*"
fi
rm -rf /tmp/staging/$JOB_NAME
mkdir -p /tmp/staging/$JOB_NAME
wget -O /tmp/staging/$JOB_NAME/phoenix-web-${VERSION}.tar.gz 'https://nexus-tools.swacorp.com/ECOM/service/local/artifact/maven/redirect?r=snapshots&g=com.swacorp.dotcom.mobile&a=southwest-web&v=${VERSION}&c=${ENV}&p=tar.gz'
cd /opt/webdocs/mobile/web/
rm -rf css/ fonts/ images/ js/ index.html favicon.ico
tar zxvf /tmp/staging/$JOB_NAME/phoenix-web-${VERSION}.tar.gz --no-overwrite-dir
EOF
cat >/tmp/$JOB_NAME/deploy.sh

chmod u+x /tmp/$JOB_NAME/deploy.sh 

ssh swfwadm@${HOST} "mkdir -p /tmp/$JOB_NAME"
scp /tmp/$JOB_NAME/deploy.sh swfwadm@${HOST}:/tmp/$JOB_NAME
ssh swfwadm@${HOST} "sh -C /tmp/$JOB_NAME/deploy.sh"