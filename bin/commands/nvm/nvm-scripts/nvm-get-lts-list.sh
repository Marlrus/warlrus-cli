#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

nvm list | sed -n '/lts/p' | sed 's/^.*v//;s/(.*//;s/)//' | awk '{print $1}'
