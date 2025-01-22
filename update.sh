#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname "$0")" || exit;pwd)
echo "${CURRENT}"

cd "${CURRENT}" || exit
git pull --prune
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit $result
  exit $result
fi
echo ""
pwd
pnpm install && pnpm up -r && pnpm lint-fix && pnpm build
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit $result
  exit $result
fi
git commit -am "Bumps node modules" && git push
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit $result
  exit $result
fi

cd "${CUR}" || exit $result
