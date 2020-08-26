#This script deploys an updated version of the chaincode
NEW_VERSION="$1"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export FABRIC_CFG_PATH="${DIR}/../config"
echo 'new version to deploy is' $NEW_VERSION
cd "${DIR}/../test-network/"
echo 'deleting old justicechain.tar.gz'
chmod 755 justicechain.tar.gz
rm -f justicechain.tar.gz
./network.sh deployCC -l javascript -v $NEW_VERSION
docker ps |grep 'dev'
