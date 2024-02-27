#!/usr/bin/env bash

OS_LINUX="Linux"
OS_DARWIN="Darwin"

if [ `uname` = "$OS_DARWIN"  ]
  then yesterday=`date -v -1d`
elif [ `uname` = "$OS_LINUX" ]
  then yesterday=`date -d yesterday`
else
  echo "Can't recognize OS type"
  exit 1
fi

echo `git log -n 1 --before="${yesterday}" --pretty=format:'%h'`
