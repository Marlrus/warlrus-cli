#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

list-installed(){
  nvm list | sed -n '/default/q;s/^.*v//p'
}

list-lts(){
  nvm list | sed -n '/lts/p' | sed 's/^.*v//;s/(.*//;s/)//' | awk '{print $1}'
}

install-version(){
  nvm install $1
}

move-npm-packages(){
  echo $1
  echo $2
  nvm use $1
  nvm reinstall-packages $2
}

delete-version(){
  nvm uninstall $1
}

$1 $2 $3

echo $1
echo $2
echo $3
