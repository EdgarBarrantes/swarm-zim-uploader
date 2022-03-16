# Input

An url to download a ZIM file.

# Output

A swarm hash of the uploaded files. The `swarm-index-document` is an index.html with relative links to all uploaded pages.

# Future improvements

Instead of a docker file we could have a docker compose that could use both the ZIM, Bee and Bee Clef.

# Key backups:

```bash
docker cp  swarp-zim-uploader_clef-1_1:/app clef
docker cp swarp-zim-uploader_bee-1_1:/home/bee/.bee/ bee
```
