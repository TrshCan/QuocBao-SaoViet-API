#!/bin/sh
set -e
yarn db:deploy
exec yarn start:prod
