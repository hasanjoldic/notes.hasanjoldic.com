---
title: "High Performance Browser Networking"
date: "2022-08-23"
urls:
  - https://enki.fra1.digitaloceanspaces.com/High%20Performance%20Browser%20Networking.pdf
---

# High Performance Browser Networking

> **Latency** - The time from the source sending a packet to the destination receiving it

> **Bandwidth** - Maximum throughput of a logical or physical communication path

## Building Blocks of TCP

At the heart of the Internet are two protocols, **IP** and **TCP**.

> The IP, or Internet Protocol, is what provides the host-to-host routing and addressing,

> and TCP, or Transmission Control Protocol, is what provides the abstraction of a reliable network running over an unreliable channel.

When you work with a TCP stream, you are guaranteed that all bytes sent will be identical with bytes received and that they will arrive in the same order to the client. As such, TCP is optimized for accurate delivery, rather than a timely one.

**The HTTP standard does not specify TCP as the only transport protocol.** If we wanted, we could deliver HTTP via a datagram socket (User Datagram Protocol or UDP), or any other transport protocol of our choice, but in practice all HTTP traffic on the Internet today is delivered via TCP.

### Three-Way Handshake

[computerphile video](https://www.youtube.com/watch?v=86cQJ0MMses)

All TCP connections begin with a three-way handshake.
Before the client or the server can exchange any application data, they must agree on starting packet sequence numbers, as well as a number of other connection specific variables, from both sides.
The sequence numbers are picked randomly from both sides for security reasons.

The delay imposed by the three-way handshake makes new TCP connections expensive to create, and is one of the big reasons why connection reuse is a critical optimization for any application running over TCP.
