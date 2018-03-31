#!/usr/bin/env sh
set -x

export NODE_ENV=production
export NVM_BIN=$HOME/.nvm/versions/node/v6.9.0/bin

cd /srv/fumes.com.br && \
tar zxvf package.tgz -C . && \
rm package.tgz && \
rm -rf scripts