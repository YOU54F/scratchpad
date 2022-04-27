#!/bin/bash
set -x
awslocal s3 mb s3://${REPLICATION_S3_BUCKET_WAL2JSON}
awslocal s3 mb s3://${REPLICATION_S3_BUCKET_TESTDECODING}
set +x
