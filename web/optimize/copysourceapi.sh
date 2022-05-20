#!/bin/bash
export HOME_DIR=/Users/khoaphamkim/Project

export ALADIN_SOURCE=$HOME_DIR/aladin/git/aladin/aladin
export ALADIN_MOBILEWEB_SOURCE=$HOME_DIR/tradingsystemweb/git/tradingsystemweb

rm -R $ALADIN_MOBILEWEB_SOURCE/src/
cp -R $ALADIN_SOURCE/src $ALADIN_MOBILEWEB_SOURCE