#!/bin/bash
set -x
awslocal kinesis create-stream --stream-name ${REPLICATION_KINESIS_STREAM_NAME_WAL2JSON} --shard-count 1
awslocal firehose create-delivery-stream --cli-input-json file:///docker-entrypoint-initaws.d/firehose_kinesis_source_wal2json.json
awslocal kinesis create-stream --stream-name ${REPLICATION_KINESIS_STREAM_NAME_TESTDECODING} --shard-count 1
awslocal firehose create-delivery-stream --cli-input-json file:///docker-entrypoint-initaws.d/firehose_kinesis_source_testdecoding.json
set +x
