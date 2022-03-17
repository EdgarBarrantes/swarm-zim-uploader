## How to run

You need to have [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/install/) installed.

## Progress:

So far this repo contains:

- `uploader.sh`: handles downloading zimtools, the wikipedia zim file, decompressing and compressing files, and calling:
- `indexCreatory.py`: handles the creation of index and error files. The index file has links to all the wikipedia articles. It also makes them html files for webbrowsers to read and handles relative links inside those files.
- `docker-compose.yml`: Currently creating containers of swarm and clef (which might not bee needed) and just a template for the local Dockerfile.
- A `Dockerfile` that will handle the creation of the main image that will handle the communication with the Bee instance.

### Next steps:

- Work on the Dockerfile and make it talk to the Bee container, I'm planning on using `swarm-cli` but I might as well just use `curl`.

### Current painpoints:

- Automating the process of funding, or taking the keys from a file.

## Specification

- Input: An url to download a ZIM file.
- Output: A swarm hash of the uploaded files.

## Notes:

To make the backups, in case of need, run:

```bash
docker cp swarm-zim-uploader_clef-1_1:/app clef
docker cp swarm-zim-uploader_bee-1_1:/home/bee/.bee/ bee
```

The env file here should be modified to have:

```
BEE_SWAP_ENDPOINT=
BEE_PASSWORD=
```

### Future improvement:

- Reading a funded wallet.
- Passing wiki as a variable.
- Creating a frontend for the application.
