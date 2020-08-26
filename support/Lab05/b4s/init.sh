#This script renames the generated private keys names
#node organization/students-union/utils/renamePK

#Adds identities to wallets, using certificates and private keys
#node organization/csm_org/utils/addToWalletCSM
#node organization/students-union/utils/addToWallet

#Creates auditors on behalf of students-union (by the admin)
#node organization/students-union/utils/createAuditors

#Issues three dummy logs
#node organization/students-union/utils/issue LOG1
#node organization/students-union/utils/issue LOG2
#node organization/students-union/utils/issue LOG3
set -ex
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}/organization/igfej/utils"
npm install
. initIGFEJ.sh

cd "${DIR}/organization/csm/utils"
npm install
. initCSM.sh