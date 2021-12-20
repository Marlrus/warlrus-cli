# Warlrus CLI

Personal CLI tool built on node and bash.

## Installation

- clone repository.
- run `npm link`

## Running

- run `wrt` for help output
- Alternatively, run `npx wrt` for help output

## TODO

### System Commands

- [x] Change to `system`

### NVM Commands

- [x] Install or update Nvm
- [x] Change to `nvm-manage`
- [x] `nvm-manage install` Current nvm-install command
- [ ] `nvm-manage update` can't install wrt without node, change to update as it is more accurate
- [x] Run nvm lts
  - [x] nvm is not an executable, find how to run and get output
- [ ] `nvm-manage update-node` Updates current node version to latest, moves -g packages and removes old version.
  - [x] Get list of current lts versions
  - [x] Check if version is up to date
  - [x] Output selection list with up to date versions disabled
  - [x] Install selected version
  - [ ] Pass packages to new version
  - [ ] Handle multiple x. versions
- [x] Check if you can run a function from the script to hold all functions in the same bash script
- [ ] `nvm-manage share-packages` Shares -g packages on all versions of node that are installed

### NVIM LSP and NPM -g package related Commands

- [x] Do checksum with download instead of scrapping
- [x] Only progess output from wget
- [x] Change update-nvim to same structure with nvim as base and update secondary
- [ ] html
- [ ] yarn
- [ ] pnpm
- [ ] jsonls
- [ ] typescript
- [ ] prettier
- [ ] tsserver
- [ ] cssls
- [ ] graphql
- [ ] graphql cli
- [ ] graphql@15.5.0
- [ ] yamlls
- [ ] bashls
- [ ] vimls
- [ ] efm
- [ ] eslint_d

### Electrum

- [] Download Electrum and verify 3 keys
  - [] Download public keys from github
