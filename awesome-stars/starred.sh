#!/bin/bash

USER=${1:-YOU54F}

STARS=$(curl -sI https://api.github.com/users/$USER/starred?per_page=1|egrep '^Link'|egrep -o 'page=[0-9]+'|tail -1|cut -c6-)
PAGES=$((658/100+1))

for PAGE in `seq $PAGES`; do
    curl -sH "Accept: application/vnd.github.v3.star+json" "https://api.github.com/users/$USER/starred?per_page=100&page=$PAGE"|jq -r '.[]|[.starred_at,.repo.full_name]|@tsv'
done

echo