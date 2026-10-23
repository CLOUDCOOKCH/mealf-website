# Installation

Save the complete configuration below as `compose.yml` in a folder on your Docker server.
Replace `https://mealf.example.com` in `BASE_URL` with your public HTTPS address.

The `:preview` image tag tracks the latest published development preview.
`pull_policy: always` checks for the newest image whenever you run `docker compose up -d`.
[Get the latest image and tags](https://github.com/CLOUDCOOKCH/aircooker-server/pkgs/container/mealf-server)
or [read the latest release notes](https://github.com/CLOUDCOOKCH/aircooker-server/releases).

## Full compose.yml

{{MEALF_COMPOSE}}

[Download compose.yml](../downloads/compose.yml)

## Start Mealf

Run these commands in the folder containing `compose.yml`:

```sh
docker compose up -d
docker compose logs --tail=100 mealf
```

This configuration runs Mealf on port **5152** and stores your data in the
`mealf-data` volume. Keep that volume when updating.

Point your [Cloudflare Tunnel](Cloudflare-Tunnel) at `http://127.0.0.1:5152`
if its connector runs on the Docker host. If the connector runs elsewhere, use
`http://YOUR_SERVER_LAN_IP:5152` with your Docker server’s reachable LAN address.
Publish `mealf.example.com` (or your own hostname) without a path, matching `BASE_URL`.

Open `https://mealf.example.com`, enter the one-time `setup_token` from the private
logs, and complete [First-run setup](First-Run-Setup). The app is at `/app/`.

## Update to the latest preview

Back up your data, then run `docker compose up -d` again in the same folder.
Compose pulls the latest preview and recreates the container when its image changes.
Keep your existing project name, volume, port, command and healthcheck settings.
