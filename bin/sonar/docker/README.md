# Docker files for Sonar

## Running

### Docker Daemon configuration

1. Make sure your local Docker daemon has the same configuration entries as `daemon.json`. By default, this configuration is at `/etc/docker/daemon.json`. Restart the daemon if you have to make any changes.
1. Run `./docker-compose.sh`. This is a wrapper around `docker-compose` that specifies our project name. For creating the environment from scratch, `./docker-compose.sh build && ./docker-compose up -d` should work (the first time you might not need to run `build`, as `up` will do this automatically).

## Upgrading

Except where otherwise noted, perform all of the following tasks on the Docker host machine.

### Making a database backup

1. Run `./docker-compose.sh exec -u postgres postgres pg_dump sonar > backup.psql`
1. Move `backup.psql` to a secure location.

### Change the container version(s)

1. Modify `bin/sonar/docker/sonar/Dockerfile` and/or `bin/sonar/docker/postgres/Dockerfile` to use the new version.

### Update the services

1. Run `./docker-compose.sh up -d --no-deps --build <SERVICE_NAME>`, replacing `<SERVICE_NAME>` with the service(s) you upgraded.
1. Verify in the Sonar web UI that Sonar has been upgraded.
   - You may need to visit the `/setup` endpoint on first start to migrate the database.

### On success

1. Delete the backup.psql file.
1. Commit your updates to the version number(s) in the Dockerfile(s).

### On failure

1. Revert the changes to the container version.
1. Move backup.psql to `bin/sonar/docker/postgres`
1. Kill all running Sonar containers (`./docker-compose.sh down`).
   - You might also have to remove cached docker images with `docker rmi`
1. Run `./docker-compose.sh up -d`
