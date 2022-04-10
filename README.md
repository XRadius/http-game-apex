# http-game-apex

Linux *Apex Legends* tools powered by [http-driver](https://github.com/XRadius/http-driver). **These tools won't work without `http-driver`**.

# Installation

The easiest way to use `http-game-apex` is to open the [precompiled production version](http://xradius-apex.herokuapp.com/).

## Browsers

Tools run in *Chrome for Android* or *Safari for iOS*. Other browsers may not work as intended.

### Chrome for Android

1. Disable the [Block insecure private network requests](https://web.dev/cors-rfc1918-feedback/#step-1:-requests-to-private-network-resources-will-be-allowed-only-from-https-web-pages) feature. [It won't work otherwise](https://developer.chrome.com/blog/private-network-access-preflight/#introduction).
2. Make sure you are on the HTTP version, **NOT** the HTTPS version. [It won't work otherwise](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#warnings_in_firefox_web_console).

### Safari for iOS

1. Make sure you are on the HTTP version, **NOT** the HTTPS version. [It won't work otherwise](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content#warnings_in_firefox_web_console).

## Usage

After selecting a tool, you need to enter some information:

* Server=http://YOUR_MACHINE_IP:8080
  * Replace `YOUR_MACHINE_IP` with your computer local IP address.
  * See [this FAQ for more information](https://letmegooglethat.com/?q=linux+get+local+ip) on local IP addresses.
* Username=???
  * Use the value you set during installation of `http-driver`.
* Password=???
  * Use the value you set during installation of `http-driver`.

# Development

We'll setup a development environment to compile and run from source.

1. Install *Google Chrome*, *NodeJS* and *Visual Studio Code*:

* Follow the instructions at https://www.google.com/intl/en_us/chrome/
* Follow the instructions at http://nodejs.org/ (`node` >= 16, `npm` >= 7)
* Follow the instructions at https://code.visualstudio.com/

2. Clone this repository:

```
git clone https://github.com/XRadius/http-game-apex
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

* Open the repository with *Visual Studio Code*.
* Press `F5`, wait for compilation, and eventually *Google Chrome* will launch.
* Change any piece of code and the application will automatically refresh.

Finally, you can use `npm run webpack:build` to build your own *precompiled production version*.

# Contributions

So, you want to contribute? Please do!

* [Bugfixes]: Pull requests are always welcome.
* [New Offsets]: Pull requests are always welcome.
* [New Features]: Discuss before a pull request.
* [New Tools]: Discuss before a pull request.

Anything else should be discussed first.
