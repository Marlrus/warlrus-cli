#!/bin/bash

if test -f ~/nvim.appimage; then
  rm ~/nvim.appimage
fi
wget https://github.com/neovim/neovim/releases/download/nightly/nvim.appimage -P ~/ &&
echo "Nvim latest dowloaded to home directory." ||
echo "Error downloading nvim" 

if test -f ~/nvim.appimage; then
  chmod +x ~/nvim.appimage
  echo "Execution permissions added to nvim"
else
  echo "Nvim app image not found" 
fi
