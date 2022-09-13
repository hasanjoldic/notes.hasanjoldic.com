---
title: "Nginx From Beginner to Pro"
date: "2022-08-27"
urls:
  - static.enki.ba/servers/Nginx From Beginner to Pro.pdf
---

# Introduction to Nginx Web Server

In simple words, a web server is a server that hosts an application that listens to the HTTP requests. It is the web server’s responsibility to hear (i.e., to understand HTTP) what the browser is saying, and respond appropriately. Sometimes, it could be as simple as fetching a file from the file system and delivering it to the web browser. At other times, it delegates the request to a handler that performs complicated logic and returns the processed response to the web server, which in turn transfers it back to the client! Typically, the server that hosts web server software is termed a web server or a **web front-end** server.

A **reverse proxy** is a type of proxy server that retrieves resources from the servers on behalf of a client.

**“Directive”** is defined as an instruction or to direct. Directives define how Nginx runs on your server.

Directives are of two types:

- Simple directive - can be as straightforward as a set of names and parameters separated by spaces, and ending with a semicolon. For example, the directive for worker processes looks like this:

```nginx
worker_processes 1;
```

- Block directive - looks like a block of text enclosed by curly braces `{}` and contains a set of simple directives.

There are quite a few different contexts available in Nginx: for example, `main`, `events`, `HTTP`, `server`, `location`, `upstream`, `if`, `stream`, `mail`, etc. Out of these, `HTTP`, `events`, `server`, and `location` are most commonly used. The contexts could be nested as well. This is what the basic overall structure of the configuration looks like:

```nginx
# main block is not explicitly called as main, it is implied
main {
  simple_directives parameters;
  ...
  events {
    event_directives parameters;
    ...
  }
  http {
    http_directives parameters;
    ...
    server {
      server_directives parameters;
      ...
    location {
      location_directives parameters;
      ...
    }
  }
}
```

The default configuration of Nginx looks similar to the following:

```nginx
user nginx;
worker_processes 1;

error_log /var/log/nginx/error.log warn;

pid /var/run/nginx.pid;

events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  log_format    main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
  access_log /var/log/nginx/access.log main;

  sendfile on;
  #tcp_nopush on;
  keepalive_timeout 65;
  #gzip on;

  include /etc/nginx/conf.d/*.conf;
}
```

- `user` directive has a default value of nobody. You can add user directive to define the account under which Nginx worker process will be executed on the server. The syntax for user directive is like user `<user_name> <group_name>`. The user should exist on the server before Nginx starts or else there will be an error while starting Nginx services.

- `worker_process` directive has a default value of `1` and it implies the number of worker processes that will be spawned by Nginx. Setting the value to `auto` is also permitted and in that case Nginx tries to autodetect the number of cores.

- `error_log` directive can be applied in multiple contexts like `main`, `http`, `mail`, `stream`, `server`, and `location`. Here, you see it applied in the `main` context. The first parameter `/var/log/nginx/error.log` tells you the the name of the file where the log file will be created, whereas the second parameter warn informs you that anything above the warning level will be logged.

The logging levels are defined in increasing order as you can see from the list below and it is important to note that if you set the level to error, then the logs of type warning, notice, and info will be ignored. Keeping it to info is not recommended in production since the logs may become massive if your website is hit very frequently. The logs should be periodically analyzed to verify if it contains anything alarming.

- `info` - Information
- `notice` - Notice
- `warn` - Warnings
- `error` - Error
- `crit` - Critical
- `alert` - High Alert
- `emerg` - Emergency

- `pid` directive has a parameter that defines the file name that stores the process ID of the master process `/var/run/nginx.pid`. You may be thinking why does nginx log the PID to a file? Glad you asked! Imagine a scenario where you are supposed to check the uptime of a process. Running a command like `ps -ax | grep nginx` will help you get the current status and process id (PID), but you cannot really tell how long the process has been alive.

```terminal
# ps -p `cat /var/run/nginx.pid` -o etime=
15:40 <<< Process uptime
```

### Events context

The events context can be declared only in the main context and there can be only a single events context defined within the Nginx configuration. There are just six different event directives.

- `worker_connections` directive allows a maximum of 1024 concurrent worker connections. The defaults in Nginx usually suffice. The number of concurrent connections you may get on a web server can be calculated roughly using the following (N = average number of connections per request):

`(worker_processes x worker_connections x N) / Average Request Time`

- `multi_accept` is set to off by default. It means that a worker process will accept
  only one new connection at a time by default. It is a generally a good idea
  to enable `multi_accept` so that Nginx can accept as many connections
  as possible.

### HTTP Context

The HTTP context (or block) can be considered the heart of the configuration system for an Nginx web
server. In the default configuration you will notice the following directives:

- include `/etc/nginx/mine.types` - The include directive keeps the core configuration file clean. You can use this directive to keep related configurations in a separate file. Nginx will ensure that the file is loaded in-place when loading the configuration. At the same time, it will keep the main configuration readable and manageable.

> MIME types describe the media type of content and guides the browser so that it renders the content appropriately in the browser instead of downloading the file. Assume you want to serve a file called `myfile`. data. If you simply create a file called `myfile.data` in your root folder (`/etc/nginx/html`), you might think that the browser will be able to render it when you type `http://localhost/myfile.data`. However, you will notice that the browser simply downloads the file since it doesn't know what kind of data it contains!

- `default_type` directive has a value of `application/octet-stream`. It specifies the default MIME type if Nginx fails to find a specific one in the `/etc/nginx/mine.types`. It is this MIME type that guides the browser that it has to download the file directly.

- `log_format` directive configures the `ngx_http_log_module`. It writes the log in a specified format. The first parameter is the name of the format, in this case main. The second parameter is a series of variables that will contain a different value for every request. Once you have named a `log_format` , you will need to use it.

```nginx
log_format  main    '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
```

- `access_log` directive requires a path (`/var/log/nginx/access.log`) and name of a format (`main`). Every request you make from the server can be logged to a file so that you can analyze it later. A good web administrator takes very good care of these logs, and analyzes it periodically to find out issues that sometimes go unnoticed. These logs also prove to be helpful during troubleshooting scenarios.

- The default value for `sendfile` directive is `off` if the directive is not present. Nginx default configuration hence, turns it on. It is generally a good idea to enable it, since it ensures that the function is called with `SF_NODISKIO`. In simple words, it means that the call will not block on disk I/O. The data is loaded in chunks and sent appropriately to the client. As you can guess, it has a huge advantage and enables Nginx to scale very well, especially while serving large files.

- `tcp_nopush` directive is commented by default and the default value is `off`. This comes into effect only when you are using `sendfile` and basically directs the Nginx server to send the packets in full. Typically, you can leave it disabled.

- `keepalive_timeout` directive has a value of `65`. Normally, when a connection is made to the server, you need not disconnect the connection straightaway. That is because a web page normally comprises of a lot of assets. It will not be very effective to create a new connection for every asset that is sent to the client. Hence, the first few connections are made to the server and then, they are kept alive. The idea is to deliver the rest of the assets on the same set of connections one after the other. Now, let's say there were 125 assets (css, js, html, images, etc.) in a page. When the client accesses the URL, it might create 2 connections or more (modern browsers open a lot more connections!). Assuming 5 connections were made, those assets will be delivered one by one to the client in parallel over 5 different connections! What do you think will happen to the open connections if the page is delivered in just 3 seconds? Well, they will continue to live and, as you can guess, will waste resources on the server. This is the reason why this directive exists. It allows the server to close the connection in 65 seconds automatically if the client doesn't return and the connection is idle. On a busy server, you may choose to reduce this timeout.

- `gzip` directive compresses the output so that lesser bandwidth is consumed per request. By default it is turned off, and it is recommended to turn it on.

- The last line in the configuration is yet another `include` and it is an interesting one! You can see that it accepts wild cards (`include /etc/nginx/conf.d/*.conf;`) and it implies that it will load all the configuration file sat once from the folder `/etc/nginx/conf.d`.

### The `conf.d` Folder

The `/etc/nginx/conf.d` folder contains two files, `default.conf` and `example_ssl.conf`. The `example_ssl.conf` file is fully commented out and not used until you have a requirement to host SSL.

The default configuration file looks like the following:

```nginx
server {
  listen 80;
  server_name localhost;

  #charset koi8-r;
  #access_log /var/log/nginx/log/host.access.log main;

  location / {
    root /etc/nginx/html;
    index index.html index.htm;
  }

  #error_page 404 /404.html;
  # redirect server error pages to the static page /50x.html
  #
  error_page 500 502 503 504 /50x.html;
  location = /50x.html {
    root /usr/share/nginx/html;
  }

  # proxy the PHP scripts to Apache listening on 127.0.0.1:80
  #
  #location ~ \.php$ {
  # proxy_pass http://127.0.0.1;
  #}

  # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
  #
  #location ~ \.php$ {
  # root html;
  # fastcgi_pass 127.0.0.1:9000;
  # fastcgi_index index.php;
  # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
  # include fastcgi_params;
  #}

  # deny access to .htaccess files, if Apache's document root
  # concurs with nginx's one
  #
  #location ~ /\.ht {
  # deny all;
  #}
}
```

### Server Context

The server block can be set in multiple contexts to configure various modules.

| Module Name                | Context  | Details                                                                                                  |
| -------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| ngx_http_core_module       | http     | Sets the configuration for a virtual server using server_name directives.                                |
| ngx_http_upstream_module   | upstream | Sets the address and other parameters of a server. Useful in reverse proxy and load balancing scenarios. |
| ngx_mail_core_module       | mail     | Sets the configuration for a mail server.                                                                |
| ngx_stream_core_module     | stream   | Sets the configuration for a streaming server.                                                           |
| ngx_stream_upstream_module | upstream | Similar to ngx_http_upstream_module.                                                                     |

### Exercise: HOW TO SET UP A BASIC SERVER TO SERVE STATIC CONTENT

```nginx
server {
  listen 80;
  server_name app1.com www.app1.com;

  location / {
    root /etc/nginx/html/app1;
  }
}

server {
  listen 80 default_server;
  server_name app2.com www.app2.com;

  location / {
    root /etc/nginx/html/app2;
  }
}

server {
  listen 80;
  server_name "" localhost 127.0.0.1;
  return 444;
}
```

### Wildcards Names

Wildcards are allowed in Nginx configuration with few rules. An asterisk is allowed only on the name's start and end and has to be suffixed or prefixed by a dot respectively. Hence `*.app.com` and `www.app.*` are valid. On the contrary, `www.*.app.com` and `www.app.*.org` are not valid. For more complicated strings, you can use valid (Perl) regular expressions, if required.

### Location Context

You have already seen the usage of `root` directive inside a `location` block. The `root` directive tells Nginx to return `/image/myimage.jpg` instead of fully qualified path `/etc/nginx/html/app1/image/myimage.jpg`.
Another important directive in `location` block is `index`, which specifies the name of default files that is sent to the client if the file name is not specified. For example, if you add `index index.html index.htm default.htm;` inside `location` directive, you are telling Nginx to return the `index.html` or `index.htm` or `default.htm` if the URI is simply `http://www.app.com`. In other words, if `index.html` is not found, it will search for `index.htm`, and so on.

`Location` directive points to the actual content on the web server. You can point to different locations using different `location` directives and include regular expressions as well. When a request is received, the text in the URI is decoded and the adjacents slashes (if any) are replaced with a single slash. To find the appropriate `location`, Nginx then goes through its locations defined in the configuration.

Based on the requested URI, it selects and remembers the longest matching prefix. Then it proceeds to match regular expressions (if any). If one regular expression doesn't match, it proceeds with the next one. It stops processing the next regular expressions at the first match!

The location directive has four different modifiers: =, ~, ~\*, and ^~.

| Modifier | Meaning                                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `~*`     | Case insensitive search. Ideal for most cases.                                                                           |
| `~`      | Case sensitive search.                                                                                                   |
| `^~`     | Do not check any regular expressions if the matching prefix location has `^~`                                            |
| `=`      | Directs Nginx to do an exact match of URI and location. It is a good idea to provide exact matches for every URL that is | frequently used so that Nginx doesn't need to do a search. |

### Location Context Special Cases

#### `try_files`

This directive checks if the file exists in a specified order. If it finds a file among a predefined list, it is processed and the files next in the list are ignored. **If you would like to check a directory, you need to suffix a slash (/) at the end of the name.**
If none of the files are found, an internal redirect happens as per the last parameter in the list. `try_files` directive allows you to get rid of `if` directive since you no longer have to check if the file exists or not. `if` directive is extremely inefficient since it is evaluated every time for every request. A good rule of thumb is to avoid if directive completely.

```nginx
server {
  listen 80;
  server_name 127.0.0.1 localhost;

  location ~* \.(png)$ {
    root /etc/nginx/html/common;
    try_files $uri $uri/ /nginx.png;
  }
}
```

The `try_files` directive is set such that it will look for the file (`$uri`), and if it doesn't find the file, it looks for the folder called (`$uri/`). If it doesn't find the folder either, it returns `/nginx.png` from the root that is defined in this location context (`/etc/nginx/html/common`).

If you replace:

```nginx
try_files $uri $uri/ /nginx.png;
```

with:

```nginx
try_files $uri $uri/ /nginx.png =404;
```

it will mean that if the fallback file (`/nginx.png`) doesn't exist, Nginx will return a 404 code.

#### `rewrite`

Takes regex as an input and redirects (or terminates if needed) the requests. It supports four flag parameters:

- `last` - Stops the current processing and starts a search for a new location matching the changed URI.
- `break` - Stops processing using break directive.
- `redirect` - A temporary redirection using status code 302.
- `permanent` - A permanent redirection using status code 301.

```nginx
location /common/ {
  rewrite ^(/common/)(.*) /vendor_assets/$2 last;
}
```

#### `error_page`

Return a specific error page using internal redirect. You can customize your error pages to your liking and make it more meaningful for the end users. It can be used inside `http`, `server`, `location`, and `if` blocks.

```nginx
error_page 404 /404_not_found.html;                 #Applies to status code 404.
error_page 500 502 503 504 /50x_server_error.html;  #Applies to status code 500, 502, 503 & 504.
error_page 404 =200 /funnypic.png;                  #Instead of sending 404, it will send a png with status code 200.
```

```nginx
error_page 500 502 503 504 /50x.html;
location = /50x.html {
  root /usr/share/nginx/html;
}
```

### Verify the Correctness of Configuration

A success looks like this:

```terminal
$ nginx -t -c /etc/nginx/nginx.conf
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

In case of failure, it points you to the precise line where there is an issue:

```terminal
$ nginx -t -c /etc/nginx/nginx.conf
nginx: [emerg] unknown directive "xx_junk_directive" in /etc/nginx/conf.d/virtual_server.conf:8
nginx: configuration file /etc/nginx/nginx.conf
```

### Allow Directory Listing

Athough it is not considered a good idea to allow listing of a directory, at times it is required to enable directory listing of specific areas of your website. Nginx has directory listing disabled by default, and to enable it you will need to use autoindex directive.

```nginx
server {
  listen 80;
  server_name 127.0.0.1 localhost;
  root /etc/nginx/html;

  location /common/ {
    root /etc/nginx/html;
    index NON_EXISTENT_FILE;
    autoindex on;
  }
}
```

### Deny Access to Any Specific Location

```nginx
server {
  listen 80;
  server_name 127.0.0.1 localhost;

  root /etc/nginx/html;

  location /vendor_assets/ {
    deny all;
  }
}
```

If you try to accees `http://localhost/vendor_assets/` now, you will get a `403` forbidden message from Nginx.

### Proxy the Requests to Apache

```nginx
# proxy the PHP scripts to Apache listening on 127.0.0.1:80
#
location ~ \.php$ {
  proxy_pass http://127.0.0.1;
}
```

### Proxy the Requests to FastCGI

```nginx
# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#
location ~ \.php$ {
  root html;
  fastcgi_pass 127.0.0.1:9000;
  fastcgi_index index.php;
  fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
  include fastcgi_params;
}
```

### Nginx Variables

Even though they look very convenient, it should be used sparingly. The reason is that they get evaluated at runtime. In other words, every request where you encounter a variable will be evaluated at runtime taking extra CPU cycles!

## Nginx Modules

Modules are those little pieces of code that give a specific feature or functionality in Nginx. It is because of these modules that you can identify if Nginx is behaving as a **web server**, **reverse proxy server**, or a **load balancing server**.

After installing Nginx you can verify which modules are installed on your server using the `Nginx -V` command.

#### On Ubuntu Server

Ubuntu Server includes few third-party modules in the default installation of Nginx:

```terminal
$ nginx -V
nginx version: nginx/1.23.1
built by gcc 10.2.1 20210110 (Debian 10.2.1-6)
built with OpenSSL 1.1.1k  25 Mar 2021 (running with OpenSSL 1.1.1n  15 Mar 2022)
TLS SNI support enabled
configure arguments:
--prefix=/etc/nginx
--sbin-path=/usr/sbin/nginx
--modules-path=/usr/lib/nginx/modules
--conf-path=/etc/nginx/nginx.conf
--error-log-path=/var/log/nginx/error.log
--http-log-path=/var/log/nginx/access.log
--pid-path=/var/run/nginx.pid
--lock-path=/var/run/nginx.lock
--http-client-body-temp-path=/var/cache/nginx/client_temp
--http-proxy-temp-path=/var/cache/nginx/proxy_temp
--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp
--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp
--http-scgi-temp-path=/var/cache/nginx/scgi_temp
--user=nginx
--group=nginx
--with-compat
--with-file-aio
--with-threads
--with-http_addition_module
--with-http_auth_request_module
--with-http_dav_module
--with-http_flv_module
--with-http_gunzip_module
--with-http_gzip_static_module
--with-http_mp4_module
--with-http_random_index_module
--with-http_realip_module
--with-http_secure_link_module
--with-http_slice_module
--with-http_ssl_module
--with-http_stub_status_module
--with-http_sub_module
--with-http_v2_module
--with-mail
--with-mail_ssl_module
--with-stream
--with-stream_realip_module
--with-stream_ssl_module
--with-stream_ssl_preread_module
--with-cc-opt='-g -O2 -ffile-prefix-map=/data/builder/debuild/nginx-1.23.1/debian/debuild-base/nginx-1.23.1=. -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -fPIC'
--with-ld-opt='-Wl,-z,relro -Wl,-z,now -Wl,
--as-needed -pie'
```

Nginx modules can be split into five different catagories based on their functionality. When you build Nginx binary, the **Core** and **Event** modules are included by default. The **HTTP**, **Mail**, and **Stream** modules enable **Web Server**, **Mail Proxy**, and **Reverse Proxy or Load Balancer** functionality repectively into Nginx.

The **core** modules cannot be disabled; they are the required components of Nginx.

There are some OOB modules that have dependencies on third-party components like PCRE, OpenSSL that can be included during compile time.

### Core module

(user)[https://nginx.org/en/docs/ngx_core_module.html#user]

(worker_processes)[https://nginx.org/en/docs/ngx_core_module.html#worker_processes]

(error_log)[https://nginx.org/en/docs/ngx_core_module.html#error_log]

(pid)[https://nginx.org/en/docs/ngx_core_module.html#pid]

(worker_rlimit_nofile)[https://nginx.org/en/docs/ngx_core_module.html#worker_rlimit_nofile]

### Events Module

(worker_connections)[https://nginx.org/en/docs/ngx_core_module.html#worker_connections]

(debug_connections)[https://nginx.org/en/docs/ngx_core_module.html#debug_connections]

### HTTP module

(include)[https://nginx.org/en/docs/ngx_core_module.html#include]

(default_type)[https://nginx.org/en/docs/ngx_core_module.html#default_type]

(log_format)[https://nginx.org/en/docs/http/ngx_http_core_module.html#log_format]

(access_log)[https://nginx.org/en/docs/http/ngx_http_core_module.html#access_log]

(sendfile)[https://nginx.org/en/docs/http/ngx_http_core_module.html#sendfile]

(tcp_nopush)[https://nginx.org/en/docs/http/ngx_http_core_module.html#tcp_nopush]

(tcp_nodelay)[https://nginx.org/en/docs/http/ngx_http_core_module.html#tcp_nodelay]

(keepalive_timeout)[https://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout]

(listen)[https://nginx.org/en/docs/http/ngx_http_core_module.html#listen]

(value)[https://nginx.org/en/docs/http/ngx_http_core_module.html#value]

(root)[https://nginx.org/en/docs/http/ngx_http_core_module.html#root]

(error_page)[https://nginx.org/en/docs/http/ngx_http_core_module.html#error_page]

(try_files)[https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files]

### Gzip Module

### FastCGI Module

### Basic Authentication

## Nginx Core Architecture

// TODO

## Hosting Web Sites on Nginx

Every website is different, not only from the content perspective, but also from the technology perspective. Primarily, you can categorize the applications as **static** or **dynamic**. It actually makes a lot of sense to host multiple websites on the same server if the server can handle it.

The static sites contain a lot of resources like images, stylesheets, JavaScript files, html, text, PDF, and so on. The basic nature of the content is that it is made once and served multiple times to the visitors. If you have to change the content, you will need to edit the file appropriately and update the server so that new content gets served to the audience.

The dynamic sites, on the other hand, have scripts and programming languages working at the back end emitting pages that your browser can understand and render directly. The key difference is that the page you view is never really saved on the server’s disk.

Server blocks in Nginx help you to map the website content and ensure that each domain points to the appropriate content only. You can host multiple websites on the same server and differentiate them using server blocks.

### Internal redirects

Redirect if server is accessed through `http://www.example.com`

```nginx
server {
  listen 80;
  server_name www.examplecom;
  return 301 http://examplecom$request_uri;
}

server {
  listen 80;
  server_name examplecom;

  root "/usr/share/nginx/html/site1/Shield Theme";

  location / {
    index index.html index.htm;
  }

  error_page 500 502 503 504 /50x.html;

  location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```

### Sites Using Different Ports

You can have different parts of your application exposed on different ports. In that case, you can configure server blocks in a way that multiple server blocks with the same name exist, but are listening on different ports.

```nginx
server {
  listen 80;
  server_name example.com, www.example.com;

  ...
}

server {
  listen 3000;
  server_name example.com, www.example.com;

  ...
}
```

### Wildcard Mapping

```nginx
server {
  listen 80;
  server_name *.example.com;

  ...
}
```

### Blocking Access

```nginx
server {
  listen 80;
  server_name 127.0.0.1;
  return 444;
}

server {
  listen 80;
  server_name example.com;

  ...
}
```

**Return code `444` is a special part of Nginx’s nonstandard code that closes the connection.**

### Mixed Name-Based and IP-Based Servers

```nginx
server {
  listen 10.0.2.6:80;
  server_name example.net www.example.net;
  ...
}

server {
  listen 10.0.2.6:80 default_server;
  server_name example.org www.example.org;
  ...
}

server {
  listen 10.0.3.6:80 default_server;
  server_name example.com www.example.com;
  ...
}

server {
  listen 10.0.3.6:80;
  server_name example.biz www.example.biz;
  ...
}
```

### Common Configuration Mistakes

#### 777 mode

When a configuration doesn’t work as it is expected to, some administrators take a shortcut (i.e., `chmod 777`). NO, just don’t do that ever!

#### Root Inside Location Block

#### Monolithic Configuration Files

#### Listening on Hostname

You should never listen on hostname. It can cause binding issues during the restarts of the server. Use IP instead of hostnames.

```nginx
server {
  # Bad: listen site1.com:80;
  # Good: listen 127.0.0.1:80;
}
```

## Nginx and Dynamic Content

**Hosting dynamic content directly with Nginx is not possible.** This is to say that Nginx worker processes will not load the processing modules in its own memory address space to serve the pages. The idea is to proxy the content to the components that do the actual processing of your requests.
As limiting as it sounds, it has its own good side effects. The primary benefit is that the slowness caused by dynamic sites cannot directly affect Nginx. It has powerful routing and proxy capabilities that will tremendously benefit you as a web administrator.

```nginx
upstream nodeapp {
  server 127.0.0.1:3000;
}
server {
listen 80;
server_name localhost;

root /usr/share/nginx/html;

  location / {
    proxy_pass http://nodeapp;
  }
}
```

## Load Balancing with Nginx

### Defining High Availability

A system can be considered highly available if it is continuously operational as long as desired. That is easier said than done. There are basically three main aspects that you need to consider while designing a highly available system:

1. Eliminate a single point of failure. In simple words, it means that you should design your system such that failure at a specific point doesn't bring down the entire system. In a web server context, it means that having just one server, serving your requests for www.yoursite.com is not recommended.
   Even though you can have multiple worker processes for Nginx, it doesn't take care of scenarios where a server has to be patched for security and rebooted. Also, it doesn't take care of hardware or network failures. Having a single server serving your web pages, hence, can become a single point of failure and should be avoided.
2. Reliable failover. In simplistic terms, a failover implies that if one of the servers goes down, another one takes its place without the end user noticing the disruption in service. Consider a car. If one of the tires gets punctured, even though you have an extra tire , it takes a while to manually change it. You can say that the failover is reliable, but it isn't quick. In today's world, for a busy e-commerce website, slow failover means revenue loss that could run in millions.
   It is to be noted that the revenue loss here is not only from the lost business, but also due to the lack of trust that ensues following a major failure.
3. Failure detection at run time. No system is 100 percent perfect. Although, if monitored well, it can appear to be 100 percent reliable. High-availability design suggests that you create the system in such a way that failure could be detected and fixed with time in hand. However, it is easier said than done.

// TODO rest of chapter

## SSL, Security, and Authentication

If your public website is completely static, your exposure is less. But the moment you step in the world of dynamic web applications, complexities arise.

- How would you authenticate your clients?
- How would you authorize them?
- How will your customers know that the website they are viewing is actually coming off your web servers and there is nobody between you and your client playing the spoilsport?
- How will you ensure that nobody sees the password while the packets are en route?

### Using Secure HTTP - SSL Encryption

SSL stands for **Secure Socket Layer** and helps in establishing an encrypted connection between the client browser (or any other client application) and the server. This secure connection ensures that the conversation remains private and integral. Please note that HTTPS simply adds an additional layer to the commonly understood HTTP protocol.
It has two primary purposes:

- Verify and ensure that you are talking to the server that you think you are talking to.
- Ensure that only the server can read what you send and only you can read what the server has sent back. Behind the scenes, very clever public key algorithm ensures that the two purposes are met and the shared information is never leaked. If somebody tries to capture network traces for SSL traffic, he will be disappointed since it won't capture anymore cleartext traffic.

### Optimizing HTTPS Servers

Encrypting and decrypting traffic is a CPU-consuming operation and hence adds overhead to the processing, especially from a CPU perspective. You must enable keepalive connections to send several requests over one connection since SSL handshake is among the most intensive operation. If you turn off the keepalive option, every request will require an addition SSL handshake, which would be counterproductive.
Similarly, the SSL sessions are stored in a cache that is shared between workers. It is a good idea to use ssl_session_directive and increase the default value of 5 minutes. 1MB of the cache contains about 4000 sessions, so you can increase the allocated value as well. The following directives can be used in the http block of the config file. As can be seen, the memory is increased to 10MB and timeout is increased to 15 minutes.

```nginx
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 15m;
```

[https://ssl-config.mozilla.org/](https://ssl-config.mozilla.org/)

```nginx
# generated 2022-08-30, Mozilla Guideline v5.6, nginx 1.17.7, OpenSSL 1.1.1k, intermediate configuration
# https://ssl-config.mozilla.org/#server=nginx&version=1.17.7&config=intermediate&openssl=1.1.1k&guideline=5.6
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    ssl_certificate /path/to/signed_cert_plus_intermediates;
    ssl_certificate_key /path/to/private_key;
    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:10m;  # about 40000 sessions
    ssl_session_tickets off;

    # curl https://ssl-config.mozilla.org/ffdhe2048.txt > /path/to/dhparam
    ssl_dhparam /path/to/dhparam;

    # intermediate configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS (ngx_http_headers_module is required) (63072000 seconds)
    add_header Strict-Transport-Security "max-age=63072000" always;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /path/to/root_CA_cert_plus_intermediates;

    # replace with the IP address of your resolver
    resolver 127.0.0.1;
}
```
