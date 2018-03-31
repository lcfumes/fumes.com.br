#!/usr/bin/env sh
set -x

gulp build && \
mkdir dist/scripts && \
cp ./scripts/* dist/scripts/ && \
cd dist && \
tar -czf package.tgz * && \
scp package.tgz deploy@fumes.com.br:/srv/fumes.com.br && \
ssh deploy@fumes.com.br 'bash -s' < ./scripts/untar.sh && \
cd .. && \
gulp clean:dist