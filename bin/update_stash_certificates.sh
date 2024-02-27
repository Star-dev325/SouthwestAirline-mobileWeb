#!/bin/sh

ROOTUID="0"
OS_LINUX="Linux"

if [ `uname` != "$OS_LINUX"  ] ; then
    echo "This script only works for Linux Operaion System"
    exit 1
fi

if [ `id -u` -ne "$ROOTUID" ] ; then
    echo "This script must be executed with root privileges."
    exit 1
fi

keytool -printcert -rfc -sslServer stash1-tools.swacorp.com > /usr/local/share/ca-certificates/stash.crt
cat /usr/local/share/ca-certificates/stash.crt
echo "create stash1-tools.swacorp.com certificates success"
update-ca-certificates
