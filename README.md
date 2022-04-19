# http-game-apex

Linux *Apex Legends* connector powered by [http-driver](https://github.com/XRadius/http-driver). **This connector won't work without `http-driver`**.

# Quick Start

The easiest way to use `http-game-apex` is to navigate to your `http-driver` and load this connector:

```
https://xradius.github.io/http-game-apex/
```

This is the *precompiled production connector*, which [updates automatically](https://github.com/XRadius/http-game-apex/deployments/).

# Installation

We'll setup a development environment to compile and run from source.

1. Install *Google Chrome*, *NodeJS* and *Visual Studio Code*:

* Follow the instructions at https://www.google.com/intl/en_us/chrome/
* Follow the instructions at http://nodejs.org/ (`node` >= 16, `npm` >= 7)
* Follow the instructions at https://code.visualstudio.com/

2. Clone this repository:

```
git clone https://github.com/XRadius/http-game-apex/
```

3. Open the `http-game-apex` directory:

```
cd http-game-apex
```

4. Install dependencies:

```
npm install
```

5. Start debugging:

* Open the `http-game-apex` directory with *Visual Studio Code*.
* Press `F5`, wait for compilation, and eventually *Google Chrome* will launch.

6. Load as a *connector* in your `http-driver`:

* Use the *Google Chrome* window to navigate to your `http-driver`.
* Load *http://0.0.0.0:3000/* as the *connector*. Replace `0.0.0.0` for your *network-resolvable* IP.

# Troubleshooting

These are the most common problems when using `http-game-apex`.

## "Load this connector in your http-driver."

You've loaded this *connector* in your browser without using `http-driver`. Because of [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#warnings_in_firefox_web_console) and [private network CORS](https://web.dev/cors-rfc1918-feedback/) policies, your browser will prevent the *connector* from reaching your `http-driver`. To prevent this, `http-driver` loads *connectors* through a [reverse proxy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling) mechanism to map the *connector* into its private network space. To solve this issue, navigate to your `http-driver` and enter the *connector* URL there.

## "Your http-driver is outdated."

As it says on the box, your `http-driver` is outdated! Follow the [update instructions](https://github.com/XRadius/http-driver#updating) and try again.
