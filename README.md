# micro-app-onetime-password

Micro app to generate onetime passwords needed to login to services
like github when two-factor authentication is enabled.

**Note since the totp password is easily obtained from the browser once the app is started, it is only
suitable where you have good physical control over the client, for example the computer in
your house.**

![sample onetime password page](https://raw.githubusercontent.com/mhdawson/micro-app-onetime-password/master/pictures/onetime-password-window.jpg)

# Usage

After installation modify ../lib/config.json to match your configuration

The configuration entries that must be updated include:

* totp_secret - the encrypted version of your totp secret. You can use the utility in the micro-app
  framework to generated the encrypted value.
  It is called .../node_modules/micro-app-framework/lib/enc_config_value.js  The first parameter is
  the value to be encrypted and the second is the password that will be used to authenticate to 
  the micro app 
* authInfo.password - the hashed password tha will be used to authenticate to the micro-app.  This 
  can be generated with the utility in the micro-app framework which is called:
  .../node_modules/micro-app-framework/lib/gen_password.js.  The first parameter is the password
  to be hashed.  
* change authInfo.userid
* optionally change authInfo.realm

NOTE you need to use the same password to encrypt the totp_secret and for the pre-hashed value used
for authInfo.password.

In addition since tls is enabled you will need to generate a certificate and key for the server
which need to be stored in the ../lib directory for the onetime-password micro-app and need to 
be called:

* cert.pem 
* key.pem


As an example the configuration file that comes with the install is:

<PRE>
{
  "totp_secret": "encrypted value",
  "tls": "true",
  "authenticate": "true",
  "authInfo": { "username": "onetime", "password": "hashedvalue", "realm": "onetime" }
}

both the "encrypted value" and "hashedvalue" need to be repaced with appropriate values
as explained above.
</PRE>

# Installation

Simply run npm install micr-app-onetime-password

# Running

To run the onetime-password app, add node.js to your path (currently requires 4.x or better) and
then run:

<PRE>
npm start
</PRE>

From the directory in the micro-app-onetime-password was installed.

Once the server is started. Point your browser at the host/port for the server.
If you have configured your browswer to allow javascript to close the current page
the original window will be closed and one with the correct size of the onetime
password app page will be created.

You will need to provide the userid/password as configured in .../lib/config.json


# Example

The following is the page shown for my configuration:

![sample onetime password page](https://raw.githubusercontent.com/mhdawson/micro-app-onetime-password/master/pictures/onetime-password-window.jpg)

# Key Depdencies

## micro-app-framework
As a micro-app the onetime password app depends on the micro-app-framework:

* [micro-app-framework npm](https://www.npmjs.com/package/micro-app-framework)
* [micro-app-framework github](https://github.com/mhdawson/micro-app-framework)

See the documentation on the micro-app-framework for more information on general
configurtion options that are availble (ex using tls, authentication, serverPort, etc)

# Acknowledgements

Base32 decoding is from [link](http://blog.tinisles.com/2011/10/google-authenticator-one-time-password-algorithm-in-javascript/)

# TODO

* Second version where totp secret is kept only in the server to improve security
* nicer page layout
* improve page size calculation and or precision of the sizes of the entries
