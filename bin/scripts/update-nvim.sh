#!/bin/bash

function err_exit(){
  echo $1
  echo "Restoring previous NVIM version"
  cp ~/nvim.appimage-prev ~/nvim.appimage
  chmod +x ~/nvim.appimage
  exit 1
}

# Create backup
if test -f ~/nvim.appimage; then
  if test -f ~/nvim.appimage-prev; then
    mv ~/nvim.appimage ~/nvim.appimage-prev
  fi
  rm ~/nvim.appimage
fi

wget https://github.com/neovim/neovim/releases/download/nightly/nvim.appimage -P ~/ &&
echo "Nvim latest dowloaded to home directory." ||
err_exit "Error dowloading NVIM"

if test -f ~/nvim.appimage; then
  echo "Verifying checksum"
  # In case checksum changes
  CHECKSUM=$(curl https://github.com/neovim/neovim/releases/tag/nightly | rg SHA256 -A 3| rg ".*nvim.appimage$" | awk '{print $1}')
  if [[ $(sha256sum ~/nvim.appimage | awk '{print $1}') != $CHECKSUM ]]; then
    err_exit "Checksum not matching"
  else
    echo "Checksum matches."
  fi
  chmod +x ~/nvim.appimage
  echo "Execution permissions added to nvim"
else
  err_exit "NVIM app image not found" 
fi
