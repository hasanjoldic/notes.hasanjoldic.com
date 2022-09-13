---
title: "Docker in Practice - 2nd Edition"
date: "2022-08-27"
urls:
  - https://enki.fra1.digitaloceanspaces.com/Docker%20in%20Practice%20-%202nd%20Edition.pdf
---

# Docker in Practice - 2nd Edition

## 1 - Discovering Docker

#### Key docker commands

| Command       | Purpose                               |
| ------------- | ------------------------------------- |
| docker build  | Build a Docker image                  |
| docker run    | Run a Docker image as a container     |
| docker commit | Commit a Docker container as an image |
| docker tag    | Tag a Docker image                    |

**One way to look at images and containers is to see them as analogous to programs and processes. In the same way a process can be seen as an “application being executed,” a Docker container can be viewed as a Docker image in execution.**

### Dockerfile

```dockerfile
FROM node
LABEL maintainer hasan.joldic@enki.ba
RUN git clone -q https://github.com/docker-in-practice/todo.git
WORKDIR todo
RUN npm install > /dev/null
EXPOSE 8000
CMD ["npm","start"]
```

Build image from Dockerfile

```bash
docker build .
```

Tag a docker image

```bash
docker tag 66c76cea05bb my-app
```

## 2 - Understanding Docker: Inside the engine room

Docker on your host machine is split into two parts:

- **daeemon** with a RESTful API
- **client** that talks to the daemon.

- What happens to the service if it fails?
- What happens to the service when it terminates?
- What happens if the service keeps failing over and over?

```bash
docker run --restart
```

| Policy                 | Description                                      |
| ---------------------- | ------------------------------------------------ |
| no (default)           | Don’t restart when the container exits           |
| always                 | Always restart when the container exits          |
| unless-stopped         | Always restart, but remember explicitly stopping |
| on-failure[:max-retry] | Restart only on failure                          |

**It’s important to note that Docker reuses the container ID. It doesn’t change on restart, and there will only ever be one entry in the `ps` table for this Docker invocation.**

### Problem: You want to allow communication between containers for internal purposes.

### Solution:

```terminal
$ docker network create my_network
0c3386c9db5bb1d457c8af79a62808f78b42b3a8178e75cc8a252fac6fdc09e4

$ docker network connect my_network blog1
$ docker run -it --network my_network ubuntu:16.04  bash
[...]
root@06d6282d32a5:/# curl -sSL blog1 | head -n5
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US"> <head>
        <meta name="viewport" content="width=device-width" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
root@06d6282d32a5:/# curl -sSL blog2
curl: (6) Could not resolve host: blog2
```

## 3 - Using Docker as a lightweight virtual machine

**Docker isn’t a VM technology. It doesn’t simulate a machine’s hardware and it doesn’t include an operating system.**

> The ADD Dockerfile command (unlike its sibling command COPY) unpacks TAR files (as well as gzipped files and other similar file types) when they’re placed in an image.

> The `scratch` image is a zero-byte pseudo-image you can build on top of. Typically it’s used in cases where you want to copy (or add) a complete filesystem using a Dockerfile.

Differences between VMs and Docker containers

- Docker is application-oriented, whereas VMs are operating-system oriented.
- Docker containers share an operating system with other Docker containers. In contrast, VMs each have their own operating system managed by a hypervisor.
- Docker containers are designed to run one principal process, not manage multiple sets of processes.

### Problem: You want to manage multiple processes within a container.

### Solution:

FROM ubuntu:14.04

```Dockerfile
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y python-pip apache2 tomcat7
RUN pip install supervisor
RUN mkdir -p /var/lock/apache2
RUN mkdir -p /var/run/apache2
RUN mkdir -p /var/log/tomcat
RUN echo_supervisord_conf > /etc/supervisord.conf
ADD ./supervisord_add.conf /tmp/supervisord_add.conf
RUN cat /tmp/supervisord_add.conf >> /etc/supervisord.conf
RUN rm /tmp/supervisord_add.conf
CMD ["supervisord","-c","/etc/supervisord.conf"]
```

```.conf
[supervisord]
  nodaemon=true

# apache
[program:apache2]
  command=/bin/bash -c "source /etc/apache2/envvars && exec /usr/sbin apache2 -DFOREGROUND"

# tomcat
[program:tomcat]
  command=service start tomcat
  redirect_stderr=true
  stdout_logfile=/var/log/tomcat/supervisor.log
  stderr_logfile=/var/log/tomcat/supervisor.error_log
```

```terminal
docker build -t supervised .

docker run -p 9000:80 --name supervised supervised
  2015-02-06 10:42:20,336 CRIT Supervisor running as root (no user in config file)
  2015-02-06 10:42:20,344 INFO RPC interface 'supervisor' initialized
  2015-02-06 10:42:20,344 CRIT Server 'unix_http_server' running without any HTTP authentication checking
  2015-02-06 10:42:20,344 INFO supervisord started with pid 1
  2015-02-06 10:42:21,346 INFO spawned: 'tomcat' with pid 12
  2015-02-06 10:42:21,348 INFO spawned: 'apache2' with pid 13
  2015-02-06 10:42:21,368 INFO reaped unknown pid 29
  Starts up the managed processes
  2015-02-06 10:42:21,403 INFO reaped unknown pid 30
  2015-02-06 10:42:22,404 INFO success: tomcat entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
  2015-02-06 10:42:22,404 INFO success: apache2 entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)
```

We distinguish between the action “to tag” (verb) and the “tag” (noun) you can give to the image name. This tag (noun) allows you to name a specific version of the image. You might add a tag to manage references to different versions of the same image. For example, you could tag an image with a version name or the date of commit.
A good example of a repository with multiple tags is the Ubuntu image. If you pull the Ubuntu image and then run docker images, you’ll get output similar to the following listing.

```terminal
$ docker images
REPOSITORY    TAG       IMAGE ID        CREATED       VIRTUAL SIZE
ubuntu        trusty    8eaa4ff06b53    4 weeks ago   192.7 MB
ubuntu        14.04     8eaa4ff06b53    4 weeks ago   192.7 MB
ubuntu        14.04.1   8eaa4ff06b53    4 weeks ago   192.7 MB
ubuntu        latest    8eaa4ff06b53    4 weeks ago   192.7 MB
```

**It’s possible to tag an image as many times as you like.**

## 4 - Building images

Although it’s possible to add files within a Dockerfile using the `RUN` command and basic shell primitives, this can quickly become unmanageable. The `ADD` command was added to the list of Dockerfile commands to address the need to put large numbers of files into an image without fuss.

```Dockerfile
FROM debian
RUN mkdir -p /opt/libeatmydata
ADD my.tar.gz /opt/libeatmydata/
RUN ls -lRt /opt/libeatmydata
```

**It’s worth observing that although you can download tarballs from URLs, they’ll only be unpacked automatically if they’re stored in the local filesystem. This can lead to confusion.**

`COPY` command looks exactly like the `ADD` command but doesn’t unpack any files and won’t download over the internet.

**Building with Dockerfiles takes advantage of a useful caching feature: steps that have already been built are only rebuilt if the commands have changed.**

As useful and time-saving as this is, it’s not always the behavior you want.
Imagine you’d changed your source code and pushed it to the Git repository. The new code wouldn’t be checked out, because the `git clone` command hasn’t changed. As far as the Docker build is concerned, it’s the same, so the cached image can be reused.
In these cases, you’ll want to rebuild your image without using the cache.

```Dockerfile
docker build --no-cache .
```

**Removing caching can be a useful sanity check once you’ve got your final Dockerfile, to make sure it works from top to bottom.**

This situation doesn’t occur if you’re using `ADD`, because Docker will download the file every time to check if it has changed.

### Problem: You want to bust the cache on demand when performing a build, without editing the Dockerfile.

### Solution: Use the `ARG` directive in your Dockerfile to enable surgical cache-busting.

**By default Docker will only break the cache if the command in the Dockerfile changes.**

```Dockerfile
WORKDIR todo
ARG CACHEBUST=no
  RUN npm install
```

If this `ARG` variable is set to a value never used before on your host, the cache will be busted from that point.

```terminal
docker build --build-arg CACHEBUST=${RANDOM} .
```

### Problem: You want to bust the cache when a remote resource has changed

### Solution: Use the Dockerfile ADD directive to only bust the cache when the response from a URL changes.

```Dockerfile
FROM ubuntu:16.04
ADD https://api.github.com/repos/nodejs/node/commits ➥ /dev/null
RUN git clone https://github.com/nodejs/node
```

The result of the preceding listing is that the cache is busted only when a commit has been made to the repo since the last build. No human intervention is required, and no manual checking.

### Problem: You want to set the time zone correctly for your containers.

### Solution: Replace the container’s localtime file with a link to the time zone you want.

```Dockerfile
FROM centos:7
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/GMT /etc/localtime
CMD date +%Z
```

### PROBLEM: You’re seeing encoding errors in your application builds or deployments.

A locale defines which language and country settings your programs should use. Typically a locale will be set in the environment through the `LANG`, `LANGUAGE`, and `locale-gen` variables, and through variables beginning with `LC_`, such as `LC_TIME`, whose setting determines how the time is displayed to the user.

```Terminal

MyFileDialog:66: error: unmappable character for encoding ASCII
UnicodeEncodeError: 'ascii' codec can't encode character u'\xa0'
  in position 20: ordinal not in range(128)
```

**A non-exhaustive list of key words to look out for in the error are “encoding,” “ascii,” “unicode,” “UTF-8,” “character,” and “codec.” If you see these words, chances are you’re dealing with an encoding issue.**

### Problem: You want to easily refer to each step of your build.

### Solution: Use the docker-in-practice/image-stepper image to order the tags for your image.

```bash
# ./image-stepper
#!/bin/bash
IMAGE_NAME=$1
IMAGE_TAG=$2
if [[ $IMAGE_NAME = '' ]]
then
  echo "Usage: $0 IMAGE_NAME [ TAG ]"
  exit 1 fi
if [[ $IMAGE_TAG = '' ]]
then
  IMAGE_TAG=latest
fi
x=1
for id in $(docker history -q "${IMAGE_NAME}:${IMAGE_TAG}" | ➥ grep -vw missing | tac)
do
  docker tag "${id}" "${IMAGE_NAME}:${IMAGE_TAG}_step_$x"
  ((x++))
done
```

```Dockerfile
FROM ubuntu:16.04
RUN apt-get update -y && apt-get install -y docker.io
ADD image_stepper /usr/local/bin/image_stepper
ENTRYPOINT ["/usr/local/bin/image_stepper"]
```

### Problem: You want to reduce the steps in building an image required for an application.

### Solution: Use the ONBUILD command to automate and encapsulate the building of an image.

```Dockerfile
FROM golang:1.7

RUN mkdir -p /go/src/app
WORKDIR /go/src/app

CMD ["go-wrapper", "run"]

ONBUILD COPY . /go/src/app
ONBUILD RUN go-wrapper download
ONBUILD RUN go-wrapper install
```

```Dockerfile
FROM golang:onbuild

EXPOSE 8080
```

The result of this technique is that you have an easy way to build an image that only contains the code required to run it, and no more.
Leaving the build tools lying around in the image not only makes it larger than it needs to be, but also increases the security attack surface of the running container.

## 5 - Running containers

### Problem: You want to run GUIs in a container as though they were normal desktop apps.

// TODO

### Problem: You want to find out a container’s IP address.

### Solution: Use the `docker inspect` command.

The docker inspect command gives you access to Docker’s internal metadata in JSON format, including the IP address. This command produces a lot of output.

### Problem: You want to cleanly terminate a container.

### Solution: Use `docker stop` rather than `docker kill` to cleanly terminate the container.

The crucial point to understand is that `docker kill` doesn’t behave in the same way as the standard command-line `kill` program.
The `kill` program works by sending a `TERM` (a.k.a. signal value 15) signal to the process specified, unless directed otherwise. This signal indicates to the program that it should terminate, but it doesn’t force the program. Most programs will perform some kind of cleanup when this signal is handled, but the program can do what it likes—including ignoring the signal.
A `KILL` signal (a.k.a. signal value 9), by contrast, forces the specified program to terminate.
Confusingly, `docker kill` uses a `KILL` signal on the running process, giving the processes within it no chance to handle the termination. This means that stray files, such as files containing running process IDs, may be left in the filesystem. Depending on the application’s ability to manage state, this may or may not cause problems for you if you start up the container again.
Even more confusingly, the `docker stop` command acts like the standard `kill` command, sending a `TERM` signal (see table 5.1), except it will wait for 10 seconds and then send the `KILL` signal if the container hasn’t stopped.

### Problem: You want to spin up containers on a separate Docker host from your machine.

### Solution: Docker Machine is the official solution for managing Docker installs on remote machines.

| Subcommand | Action                                                       |
| ---------- | ------------------------------------------------------------ |
| create     | Creates a new machine                                        |
| ls         | Lists the Docker host machines                               |
| stop       | Stops the machine                                            |
| start      | Starts a machine                                             |
| restart    | Stops and starts a machine                                   |
| rm         | Destroys a machine                                           |
| kill       | Kills a machine off                                          |
| inspect    | Returns a JSON representation of the machine’s metadata      |
| config     | Returns the configuration required to connect to the machine |
| ip         | Returns the IP address of the machine                        |
| url        | Returns a URL for the Docker daemon on the machine           |
| upgrade    | Upgrades the Docker version on the host to the latest        |

### Volumes

Use Docker’s `volume` flag to access host files from within the container.

```terminal
$ docker run -v /var/db/tables:/var/data1 -it debian bash
```

**Both the external and container directories will be created if they don’t exist.**

**Beware of mapping over existing directories. The container’s directory will be mapped even if it already exists in the image. This means that the directory you’re mapping to within the container will effectively disappear.**

**<u>Volumes are assumed not to persist in Dockerfiles.</u> If you add a volume and then make changes to that folder within a Dockerfile, the changes won’t be persisted to the resulting image.**

### Problem: You want to share your container’s bash history with your host’s history.

### Solution: Use the `-e` flag, Docker mounts, and a bash alias to automatically share your container’s bash history with the host’s.

```terminal
$ docker run -e HIST_FILE=/root/.bash_history \
  -v=$HOME/.bash_history:/root/.bash_history \
  -ti ubuntu /bin/bash
```

### Problem: You want to use an external volume within a container, but you only want Docker to access the files.

### Solution: Start up a data container and use the `--volumes-from` flag when running other containers.

**People are commonly confused about whether the data-only container needs to run. It doesn’t! It merely needs to exist, to have been run on the host, and not been deleted.**

```terminal
$ docker run -v /shared-data --name dc busybox \
  touch /shared-data/somefile
```

The `-v` argument doesn’t map the volume to a host directory, so it creates the directory within the scope of this container’s responsibility.

```terminal
docker run -t -i --volumes-from dc busybox /bin/sh
```

### Problem: You want to access your development environment on others’ machines.

### Solution: Create a Docker image with your setup on it, and place it on a registry.

## 6 - Day-to-day Docker

`dockernuke` deletes all containers

```terminal
alias dockernuke='docker ps -a -q | xargs --no-run-if-empty docker rm -f'
```

### Problem: You’re using too much disk space because orphaned Docker mounts exist in your host.

### Solution: Use the `-v` flag when calling `docker rm`, or use the docker volume subcommands to destroy them if you forget.

**By default, volumes remain on your Docker daemon’s host disk until they’re removed manually.** If these volumes are full of data, your disk can fill up, so it’s useful to be aware of ways to manage these orphaned volumes.

### ProbelmČ You want to detach from a container interaction without stopping it.

When working with Docker, you’ll often find yourself in a position where you have an interactive shell, but exiting from the shell would terminate the container, as it’s the container’s principal process. Fortunately there’s a way to detach from a container (and, if you want, you can use docker attach to connect to the container again).

Press `Ctrl-P` and then `Ctrl-Q`. Note that it’s not all three keys pressed at once.

### Problem: Your code needs to know whether you’re operating from within a Docker container.

When creating containers, it’s common to put logic inside shell scripts rather than trying to directly write the script in a Dockerfile. Or you may have assorted scripts for use while the container is running. Either way, the tasks these perform are often carefully customized for use inside a container and can be damaging to run on a “normal” machine. In situations like this, it’s useful to have some safety rails to prevent accidental execution outside a container.

### Solution: Check for the existence of the `/.dockerenv` file. If it exists, you’re likely in a Docker container.

```bash
#!/bin/bash
if ! [ -f /.dockerenv ]
then
    echo 'Not in a Docker container, exiting.'
exit 1
fi
```

## 7 - Configuration management

**Configuration management is the art of managing your environments so that they’re stable and predictable.** Tools such as Chef and Puppet have attempted to alleviate the sysadmin burden of managing multiple machines.

### Problem: You want to define the command the container will run, but leave the command’s arguments up to the user.

### Solution: Use the Dockerfile ENTRYPOINT instruction.

```Dockerfile
FROM ubuntu:17.04

ADD clean_log /usr/bin/clean_log
RUN chmod +x /usr/bin/clean_log
ENTRYPOINT ["/usr/bin/clean_log"]
CMD ["7"]
```

```bash
#!/bin/bash
echo "Cleaning logs over $1 days old"
find /log_dir -ctime "$1" -name '*log' -exec rm {} \;
```

The difference between `ENTRYPOINT` and `CMD` often confuses people. The key point to understand is that an entrypoint will always be run when the image is started, even if a command is supplied to the `docker run` invocation. If you try to supply a command, it will add that as an argument to the entrypoint, replacing the default defined in the `CMD` instruction. You can only override the entrypoint if you explicitly pass in an `--entrypoint` flag to the docker run command. This means that running the image with a `/bin/bash` command won’t give you a shell; rather, it will supply `/bin/bash` as an argument to the `clean_log` script.

### Problem: You want to ensure that your deb packages are the versions you expect.

## Solution: Run a script to capture the versions of all dependent packages on a system that’s set up as you desire. Then install the specific versions in your Dockerfile, to ensure the versions are exactly as you expect.

```terminal
RUN apt-get -y install nginx=1.4.6-1ubuntu3
```

What this doesn’t do is guarantee that all depen- dencies from this version of nginx have the same versions that you originally verified.

### Problem: You want to alter specific lines in files during a build.

### SOlution: Use the `perl -p -i -e` command.

```terminal
perl -p -i -e 's/127\.0\.0\.1/0.0.0.0/g' *
```

- `-p` flag asks Perl to assume a loop while it processes all the lines seen.
- `-i` flag asks Perl to update the matched lines in place.
- `-e` flag asks Perl to treat the supplied string as a Perl program.
- `s` is an instruction to Perl to search and replace strings as they’re matched in the input. Here `127.0.0.1` is replaced with `0.0.0.0.`
- `g` modifier ensures that all matches are updated, not just the first on any given line.
- the asterisk (`*`) applies the update to all files in this directory.

> If an application within a Docker container appears not to be accessible to you from the host machine, despite the port being open, it can be worth trying to update the addresses to listen on to `0.0.0.0` in the application config file and restarting. It may be that the application is rejecting you because you’re not coming from its `localhost`.

### Problem: You want to remove secret information from the layer history of your image.

### Solution: Instantiate a container with the image, export it, import it, and then tag it with the original image ID.

```Dockerfile
FROM debian

RUN echo "My Big Secret" >> /tmp/secret_key
RUN cat /tmp/secret_key
RUN rm /tmp/secret_key
```

```terminal
$ docker build -t mysecret .

$ docker history mysecret
IMAGE         CREATED       CREATED BY                                  SIZE
55f3c131a35d  3 days ago    /bin/sh -c rm /tmp/secret_key
5b376ff3d7cd  3 days ago    /bin/sh -c cat /tmp/secret_key              0 B
5e39caf7560f  3 days ago    /bin/sh -c echo "My Big Secret" >> /tmp/se  14 B
c90d655b99b2  6 days ago    /bin/sh -c #(nop) CMD [/bin/bash]           0 B
30d39e59ffe2  6 days ago    /bin/sh -c #(nop) ADD file:3f1a40df75bc567  85.01 MB
511136ea3c5a  20 months ago                                             0 B

$ docker run 5b376ff3d7cd cat /tmp/secret_key
My Big Secret
```

To make this image safe, you’ll need to flatten it. This means you’ll keep the same data in the image but remove the intermediate layering information. To achieve this, you need to export the image as a trivially run container and then re-import and tag the resulting image:

```terminal
$ docker run -d mysecret /bin/true
28cde380f0195b24b33e19e132e81a4f58d2f055a42fa8406e755b2ef283630f
$ docker export 28cde380f | docker import - mysecret
$ docker history mysecret
IMAGE             CREATED         CREATED BY  SIZE
fdbeae08751b      13 seconds ago              85.01 MB
```

1. Runs a trivial command to allow the container to exit quickly, because you don’t need it to be running
2. Runs `docker export`, taking a container ID as an argument and outputting a TAR file of the filesystem contents. This is piped to docker import, which takes a TAR file and creates an image from the contents.
3. The `-` argument to the docker import command indicates that you wish to read the TAR file from the command’s standard input. The final argument to docker import indicates how the imported image should be tagged. In this case you’re overwriting the previous tag.

<!-- TODO learn about make
### Problem: You want to add additional tasks around `docker build` execution.

### Solution: Use an ancient (in computing terms) tool called `make`.

At some point you might find that having a bunch of Dockerfiles is limiting your build process. For example, it’s impossible to produce any output files if you limit yourself to running `docker build`, and there’s no way to have variables in Dockerfiles.

`make` is a tool that takes one or more input files and produces an output file, but it can also be used as a task runner.

```make
.PHONY: default createfile catfile

default: createfile

createfile: x.y.z

catfile:
  cat x.y.z

x.y.z:
  echo "About to create the file x.y.z"
  echo abc > x.y.z
```

All indents in a Makefile must be tabs, and each command in a target is run in a different shell (**so environment variables won’t be carried across**).
 -->

### 8 - Continuous integration

// TODO

### 9 - Continuous delivery

**The image that comes out of CI should be final and unmodified throughout your CD process!** Docker makes this easy to enforce with immutable images and encapsulation of state, so using Docker takes you one step down the CD road already.

// TBC
