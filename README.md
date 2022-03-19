# Swarm Zim/Wiki file Uploader

## How to run

You need to have [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/install/) installed.

Run `docker compose-up -d` to start the services.

Run (or simply visit the address): `curl http://localhost:8080/get-address-to-fund` and fund the address with the corresponding funds, this is an address in your control, see [To make backups](#to-make-backups).

This should make the Bee service work properly. To check this, run: `docker-compose logs -f bee-1`.

If you want to check the logs of the API container: `docker-compose logs -f uploader`

Create a request to `get-batch-id` and save its return value.

When that all is set, you can go ahead and call `/upload` with your zim file and the batch id.

### Technical description

Docker Compose will start 3 services: [Bee](https://github.com/ethersphere/bee) and [bee-clef](https://github.com/ethersphere/bee-clef) instances that will interact with Swarm. And a Node API running on port 8080, that has the following:

- `/upload`: recieves an url to a zim file as a parameter, and an id parameter (this is a stamp batch id) that you can get from `/get-batch-id`, it then processes it and uploades it to Swarm. Example: `http://localhost:8080/upload?url=https://download.kiwix.org/zim/wikipedia/wikipedia_bm_all_maxi_2022-02.zim&bid=01077a80d594c2d694efae01f93f3294aeabaf7d48bfcfd7f5f319b46726223e`. This will return an object with the hash and a tag to check for the upload.
- `/get-batch-id`: Generates a batch of stamps and returns the id.
- `/check-upload`: Will receive a tag id and return the status of the corresponding upload. Example: `http://localhost:8080/check-upload?tag=:1043824072`
- `/get-address-to-fund`: This is the address you need to fund with xDai and BZZ in the Gnosis Chain in order to get the bee node to interact with the network.

The main files to take note of are:

- `docker-compose.yml`: Handles creating containers of swarm and clef (which might not _bee_ needed if we move to use a file as a key) and a node container that handles running:
- `src/app.ts`: express server with endpoints for interacting with the Bee container.
- `scripts/prepareFiles.sh`: handles decompressing files with zimtools, and calling.
- `src/utils.ts`: handles upload of files with [mantaray-js](https://github.com/ethersphere/mantaray-js). For more information on this see the [credits](#credits).
- `hashes/` the hashes folder will store the hashes created as a backup.

There are some ideas that were implemented and that I still have on this repo like:

- A Next.js application that solves the redirection issues (`/bzz/HASH`) and acts as a single page application with the content of the zim file. This could be expanded upon if there are specific needs in the future, for example generating extra pages on top of the wiki files as links to other versions of the pages in Swarm.

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

- Reading a funded wallet from a file instead of generating one and storing it in a volume.
- Code improvements: modularity.
- Endpoint to check and renew stamps.
- Creating a frontend for the application.
- Improve the index html file generated.

## Ideas for future work

- Create a frontend app for interacting with this, it would basically serve as an intermediary between a person that wants to provide technical resources and a person who'd like to see a particular set of websites backed up in Swarm.
- Create a browser extension that allows for saving a particular wiki article.

## Development notes

When developing `app-wiki` an error comes out (similar to [this](https://github.com/TypeStrong/ts-node/issues/270)). What's happening docker-compose automatically installs dependencies, which makes the docker user the owner. This can be fixed by running `npm install` on the local machine.

## Current issues and potential solutions

1. Waiting for the stamp to propagate. Solutions:
   - For this I decided to go with an extra endpoint to create the stamp, but I see the potential for something akin to a frontend for this API that could handle notifying the user when the stamps are ready to be used.

## Credits

This would not have worked out well without the help of [ldeffenb](https://github.com/ldeffenb). The upload functionality in chunks was grabbed from his repository. We talked on discord regarding mixing this solution with [his](https://github.com/ldeffenb/Swarming-Wikipedia/blob/main/src/index.ts) and he was kind enough to agree in mixing them to get this work out there. See his [special considerations](https://github.com/ldeffenb/Swarming-Wikipedia#special-considerations) for more.
