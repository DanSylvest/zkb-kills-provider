echo 'Start installing zkb-kills-provider';

ROOT=$(pwd);

echo 'Install nestjs'
npm i -g @nestjs/cli

echo " _____________ DUMP ----------------"
ls -al
echo " _____________ DUMP ----------------"

cd "$ROOT" || exit;

echo '_____________ BUILDER INSTALL NPM START _____________'
npm install;
echo '_____________ BUILDER INSTALL NPM FINISH _____________'

echo '_____________ INSTALL NPM FINISH _____________'
npm run start:debug