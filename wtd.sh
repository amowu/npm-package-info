#!/bin/sh
# Usage: ./wtd.sh express

regex="'?([a-zA-Z-]+)'?:"
for dependency in $(npm view $1 dependencies); do
  if [[ ${dependency} =~ $regex ]]; then
    echo "${BASH_REMATCH[1]} - $(npm view ${BASH_REMATCH[1]} description)"
  fi
done
