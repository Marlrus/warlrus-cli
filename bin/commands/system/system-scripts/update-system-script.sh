#!/bin/bash

function err_exit(){
  echo "Error updating script" 
  exit 1
}

sudo apt update && sudo apt -y upgrade ||
err_exit
