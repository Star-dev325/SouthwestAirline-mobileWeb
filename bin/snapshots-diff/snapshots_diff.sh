#!/usr/bin/env bash

snapshotsPath="./test/e2e/snapshots"
useDocker=false

print_help_info()
{
  echo "Usage:              snapshots_diff --base <commit hash> [options]"
  echo "                    snapshots_diff --base 30dd768"
  echo "Options:"
  echo "  -f, --from        commit hash code compared with baseline, without from option it will use current brunch to compare"
  echo "                    example: snapshots_diff --base 30dd768 --from 1924a7f"
  echo "  -d, --docker [ip] run in docker"
  echo "                    example: snapshots_diff --base 30dd768 --from 1924a7f --docker 172.16.123.1"
  echo "                    or: snapshots_diff --base 30dd768 --from 1924a7f --docker (Only work on Linux)"
}

snapshoting()
{
  npm install
  npm run build
  if [ ${useDocker} = false ]
    then
      npm run test:functionals -- --snapshots
    elif [ -z $2 ]; then
      npm run test:functionals -- --docker --snapshots
    else
      npm run test:functionals -- --docker=$2 --snapshots
  fi
}

if [ $# -lt 1 ]; then
  print_help_info
  exit 0
fi

while [ $# -gt 0 ]
do
key="$1"

case $key in
    -b|--base)
    base="$2"
    shift
    ;;
    -f|--from)
    from="$2"
    shift
    ;;
    -d|--docker)
    useDocker=true
    dockerIp="$2"
    shift
    ;;
    -h|--help) # help info
    print_help_info
    exit 0
    ;;
    *) # unknown option
    print_help_info
    exit 0;
    ;;
esac
shift # past argument or value
done

if [ -z ${base} ]; then
echo "You must have base commit!!!"
exit 1
fi

baseHash=(`git rev-parse HEAD`)
git checkout ${bash}
snapshoting ${useDocker} ${dockerIp}
git checkout -

if [ ! -z ${from} ]
  then
    git checkout ${from}
    fromHash=(`git rev-parse HEAD`)
  else
    fromHash=(`git rev-parse HEAD`)
fi
snapshoting ${useDocker} ${dockerIp}

if [ ! -z ${from} ]; then
  git checkout -
fi

npm run diff -- --from ${fromHash} --to ${baseHash}
rm -rf ${snapshotsPath}
