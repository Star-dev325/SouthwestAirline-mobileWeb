#!/bin/sh

dir=`dirname $0`
userid=$1

if [ -z $userid ]; then
        echo -n "Enter your user id: "
        read userid
fi

matches=`grep -c $userid $dir/users`
if [ "0" -eq $matches ]; then
        echo "Invalid user id  Make sure your user id exists in the $dir/users file" >&2
        exit 1
fi
if [ "1" -ne $matches ]; then
        echo "The user id you entered exists multiple times in the $dir/users file" >&2
        exit 2
fi

name=`grep $userid $dir/users | awk -F'|' '{print $2}'`
email=`grep $userid $dir/users | awk -F'|' '{print $3}'`

echo "You will be committing as $name <$email>..."
git config user.name "$name"
git config user.email "$email"

