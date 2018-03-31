#!/usr/bin/env sh
set -x

tar -czf package.tgz build && \
	scp package.tgz deploy@$fumes.com.br:/srv/fumes.travis.com.br && \
	ssh deploy@fumes.com.br 'bash -s' < ./scripts/untar.sh
