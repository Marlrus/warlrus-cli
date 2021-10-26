# Warlrus CLI

Personal CLI tool built on node and bash.

## Installation

- clone repository.
- run `npm link`

## Running

- run `wrt` for help output
- Alternatively, run `npx wrt` for help output

## Scripts

`wrt update-nvim`

Downloads nightly version of neo-vim (appimage) and adds execution permissions. If the github repo for nvim nighly publish has failed, it will keep the latest downloaded version of the neo-vim appimage.

Adds alias to .bashrc if not found on bash profile.

`wrt update-system`

Updates and upgrades system with apt and auto accepts installation.

`wrt nvm-manage`

Manager for NVM package.

`install`

Installs/Updates nvm package to lates version

## TODO

- NVM Related scripts

- [x] Install or update Nvm
- [ ] Run nvm lts
- [x] Change to `nvm-manage`
- [x] `nvm-manage install` Current nvm-install command
- [ ] `nvm-manage update-node` Updates current node version to latest, moves -g packages and removes old version.
- [ ] `nvm-manage share-packages` Shares -g packages on all versions of node that are installed

- LSP and NPM -g package related scripts

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
