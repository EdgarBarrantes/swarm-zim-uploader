# Swarm Zim/Wiki file Uploader

## How to run

You need to have [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/install/) installed.

Run `docker compose-up` to start the services.

This will start 3 services: [Bee](https://github.com/ethersphere/bee) and [bee-clef](https://github.com/ethersphere/bee-clef) instances that will interact with Swarm. And a Node API running on port 8080, that has the following endpoints:

- `upload`: recieves an url to a zim file as a parameter, processes it and uploades it to swarm. Example: `http://localhost:8080/upload?url=https://download.kiwix.org/zim/wikipedia/wikipedia_bm_all_maxi_2022-02.zim`. This will return an object with the hash and a tag to check for the upload.
- `/check-upload`: Will receive a tag id and return the status of the corresponding upload. Example: `http://localhost:8080/check-upload?tag=:1043824072`
- `/get-address-to-fund`: This is the address you need to fund with some in the Gnosis Chain with xDai and BZZ in order to get the bee node to interact.

Run (or simply visit the address): `curl http://localhost:8080/get-address-to-fund` and fund the address with the corresponding funds, this is an address in your control, see [To make backups](#to-make-backups).

This should make the Bee service work properly. To check this, run: `docker-compose logs -f bee-1`.

If you want to check the logs of the API container: `docker-compose logs -f uploader`

When that all is set, you can go a head and call `/upload` with your zim file.

### Files

- `docker-compose.yml`: Handles creating containers of swarm and clef (which might not _bee_ needed if we move to use a file as a key) and a node container that handles running:
- `src/app.ts`: express server with endpoints for interacting with Bee container.
- `scripts/prepareFiles.sh`: handles downloading zimtools, the wikipedia zim file, decompressing and compressing files, and calling:
- `indexCreator.py`: handles the creation of index and error files. The index file has links to all the wikipedia articles. It also makes them html files for webbrowsers to read and handles relative links inside those files.

## Notes

### To make backups

```bash
docker cp swarm-zim-uploader_clef-1_1:/app clef
docker cp swarm-zim-uploader_bee-1_1:/home/bee/.bee/ bee
```

### The env file here should be modified:

```
BEE_SWAP_ENDPOINT=https://gno.getblock.io/mainnet/?api_key=YOUR-API-KEY
BEE_PASSWORD=YOUR-PASSWORD
```

## Future improvement

- Reading a funded wallet.
- Endpoint to check and renew stamps.
- Creating a frontend for the application.
- Improve the html file generated (make it look nicer).

## Ideas for future work

- Create a frontend app for interacting with this.
- Create a browser extension that allows for saving a particular wiki article.

## Development notes

When developing `app-wiki` a error comes out (similar to [this](https://github.com/TypeStrong/ts-node/issues/270)). What's happening docker-compose automatically installs dependencies, which makes the docker user the owner. This can be fixed by running `npm install` on the local machine.

## Current issues and potential solutions

1. Upload of large directories tends to fail. Solutions:

   - Try using a ready made tar file with bee-js.
   - Trying changing the bee-js library for a direct call.
   - Adjusting memory settings (?)
