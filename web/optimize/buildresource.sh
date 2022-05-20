#!/bin/bash
export SHOWCASE_DIR=/Volumes/home/Project/showcase/showcase/web/showcase
export WEB_DIR=../$1
echo "build resource $1"
# ./compress.sh
# ./compress.sh
export MODE
MODE="production"
if [[ $1 == "--dev" ]]
then
  MODE="develop"
fi

echo "build resource in $MODE mode"

BEGIN_TIME=$(date +%s)

# not commit
./compress.sh

END_TIME=$(date +%s)

secs=$(($END_TIME - $BEGIN_TIME))

echo "build resource done in $secs seconds"