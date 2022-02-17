#!/bin/bash

#
# Usage: ./deploy-on-caddy.sh <your_caddy_site_dir>
# Eg: ./deploy-on-caddy.sh ~/caddy/site/
#

PROJ_SERVER_ROOT=$1
PROD_FLAG=$2

if [ -z "$1" ]
  then
  	echo "Error: Invalid argument"
    echo "./deploy-on-caddy.sh <your_caddy_site_dir> <prod>"
    echo "Eg for staging: ./deploy-on-caddy.sh ~/caddy/site"
    echo "Eg for prod: ./deploy-on-caddy.sh ~/caddy/site prod"
    exit 0
fi

if [ "prod" == "$2" ]; then
    PROJ_WEB_ROOT=$PROJ_SERVER_ROOT/prod-lucis-landing-out
else
    PROJ_WEB_ROOT=$PROJ_SERVER_ROOT/lucis-landing-out
fi

git pull
yarn
yarn build && yarn export-static


mkdir -p $PROJ_WEB_ROOT

echo "remove ${PROJ_WEB_ROOT}_bak"
rm -rf $PROJ_WEB_ROOT"_bak"

echo "move $PROJ_WEB_ROOT ${PROJ_WEB_ROOT}_bak"
mv $PROJ_WEB_ROOT $PROJ_WEB_ROOT"_bak"

echo "copy /out to $PROJ_WEB_ROOT"
cp -r out/ $PROJ_WEB_ROOT

echo "🚀 All done !!"
