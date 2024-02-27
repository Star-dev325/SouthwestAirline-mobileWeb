## In Flight Server

This is a very simple http-server that mock the in-flight wifi server.

### How to use:

1. You should modify hosts file in order to redirect `getconnected.southwestwifi.com` to `localhost`

   by adding these lines in hosts file. on Linux its path is `/etc/hosts`, on Mac OS its path is `/private/etc/hosts`

   > ```
   > 127.0.0.1  getconnected.southwestwifi.com
   > ```

   on Mac OS, after you save the change, you need to make your changes take effect by flushing the DNS cache with the following command:

   > ```
   > dscacheutil -flushcache
   > ```

2. Run `npm install` in path `bin/in-flight-server` to install dependency.
3. Run script `./startInFlightServer.sh` to start mock In-Flight server.
