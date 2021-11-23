**Dear E-Mail recipient,**

if you are reading this, you are probably wondering what's deal with the line
that says "pgp" in my E-mail signature, followed by a bunch of numbers and
letters, or attachment called "signature.asc" in the message you just received
from me. The short version: this file contains an electronic signature which
you can use to verify the authenticity of the E-mail message you received.
This means, you are able to verify that indeed I, Sebastian, composed the
message, and nobody else tampered with it, and nobody else composed it
pretending to be me. Now you may be asking yourself some questions, such as:

## How can I verify the authenticity of your message?

The mechanism used for creating and verifying the signature is called OpenPGP. I
won't go into detail about how to use OpenPGP; there are excellent tutorials
available online, which I linked at the end of this page. But I will give you a
quick overview on the most common operations done with OpenPGP. 
  
## What is OpenPGP?
 
PGP stands for Pretty Good Privacy, and is, in short, an encryption software
commonly used for encrypting E-mails. OpenPGP is the standard behind it. The
most common operations supported by OpenPGP are signing, verifying, encrypting
and decrypting.

E-mails encrypted with OpenPGP are end-to-end encrypted. This means that no one,
except for the sender and the recipient, is able to read the contents of the
E-mail. This is unlike the transport encryption which is employed by various
free E-mail providers such as Gmail or Yahoo-Mail, where E-mails are encrypted
on the ways between, but not on the servers of the E-mail providers of the
sender and recipient. However, OpenPGP is agnostic of any E-mail provider and
can be used on services such as Gmail or Yahoo-Mail, too.

Traditionally, in symmetric encryption methods, only one key is used for
encrypting and decrypting information. This creates a problem, because
correspondents need to exchange the key among themselves secretly before being
able to make use of it. Doing it securely over a long distance, especially over
the internet, is generally impossible.

OpenPGP makes use of asymmetric cryptography: Users of this software create
themselves a pair of two keys: one _public_ key, and one _private_ key (often
called _secret_ key). As the name implies, the _private_ key may never be known
to anyone other than its creator. The _public_ key however is safe to be shared
around.

Information encrypted with the _public_ key can only be decrypted with the
corresponding _private_ key. This means anyone in possession of a _public_ key
is able to send secret messages to the holder of the corresponding _private_
key, without ever having to meet in person to exchange the key secretly.

Information signed with the _private_ key can be verified with the corresponding
_public_ key. This means, if I know the _public_ key of a person who sent me a
signed message, I can verify that the message was indeed signed with the
corresponding _private_ key without having to know it, and since only the sender
knows the _private_ key, I can verify that the message is authentic.

In the message that I sent you, I added a link to the _public_ key whose
corresponding _private_ key I used for signing the message. The numbers and
letters on that link (D34D 12E4 etc) are the final 16 bytes of the key's
fingerprint; a calculated identifier that can be used to check whether two keys
are identical, without having to compare the entire keys. 

## How can I trust that the public key you gave me is indeed Sebastian's public key?

Excellent question, since the ability to verify the authenticity of a message
against a key is useless if you can't verify the authenticity of the key.

Disappointingly, the short answer to above question is: You can't.

The long answer: Using [Keybase](https://keybase.io/sebastianwieland), I made it
possible for you to verify that the owner of the PGP key that was used for
signing the E-mail you received, the owner of the `nwie.land` domain (from which
the message you received was sent), and the owner of the `sebastianwie.land`
domain and website (which you are currently on) are the same person. If you
don't want to take Keybase's word for it, you can verify those proofs manually.
The only thing I cannot prove is that this person is me. 

### Prerequisites for verifying said ownerships manually

You need:

- My [public OpenPGP key](https://sebastianwie.land/pgp-pubkey.asc), which is also
  available via [Web Key Directory (WKD)](https://wiki.gnupg.org/WKD)
- An OpenPGP implementation. For this guide I use [GnuPG](https://gnupg.org/),
  but any implementation works.

If you're using GnuPG, you don't even need to manually download my public key.
Thanks to WKD, you can automatically import it using the command `gpg
--locate-keys sebasti@nwie.land` in a terminal window. 

### Proof that the keyholder and the website-owner of sebastianwie.land are the same person

I created following object: 

```json
{
  "body": {
    "key": {
      "eldest_kid": "010191ddf1d5d1d4dd3b38f3e52f516ed3a3b24557d5857deb6020c6c586e92489330a",
      "fingerprint": "01123c382eea91d726228888d34d12e412edef1a",
      "host": "keybase.io",
      "key_id": "d34d12e412edef1a",
      "kid": "010191ddf1d5d1d4dd3b38f3e52f516ed3a3b24557d5857deb6020c6c586e92489330a",
      "uid": "98ed804846fdb3c65e7f552910691619",
      "username": "sebastianwieland"
    },
    "service": {
      "hostname": "sebastianwie.land",
      "protocol": "https:"
    },
    "type": "web_service_binding",
    "version": 1
  },
  "ctime": 1616607287,
  "expire_in": 157680000,
  "prev": "1da748e9f287b4574beaf1df08ea988ac1390b4a2b6476eb74072f9ee3f44572",
  "seqno": 5,
  "tag": "signature"
}
```

I signed it using my OpenPGP key, and put the signed message into a file at
[https://sebastianwie.land/keybase.txt](https://sebastianwie.land/keybase.txt).

1. Copy the PGP message (Everything between the `---BEGIN PGP MESSAGE---` and
   `---END PGP MESSAGE---` markers, including the markers) and save it into a
   file, e.g. `signed-proof.asc`
2. Open the folder in which you saved the file using a terminal, then run:
    ```bash
    gpg --decrypt signed-proof.asc
    ```
3. GnuPG will print out the original object (minus whitespaces and line-breaks) and
tell you that the signature is good.

### Proof that the keyholder and the domain-owner of sebastianwie.land are the same person

I created following object: 

```json
{
  "body": {
    "key": {
      "eldest_kid": "010191ddf1d5d1d4dd3b38f3e52f516ed3a3b24557d5857deb6020c6c586e92489330a",
      "fingerprint": "01123c382eea91d726228888d34d12e412edef1a",
      "host": "keybase.io",
      "key_id": "d34d12e412edef1a",
      "kid": "010191ddf1d5d1d4dd3b38f3e52f516ed3a3b24557d5857deb6020c6c586e92489330a",
      "uid": "98ed804846fdb3c65e7f552910691619",
      "username": "sebastianwieland"
    },
    "service": {
      "domain": "sebastianwie.land",
      "protocol": "dns"
    },
    "type": "web_service_binding",
    "version": 1
  },
  "ctime": 1616607185,
  "expire_in": 157680000,
  "prev": "ea5a8c8f2c2fc762de4e4bf93b68f6b667f58d708f733e5fbd778dee8d532943",
  "seqno": 4,
  "tag": "signature"
}
```

I signed it using my OpenPGP key, yielding following signed message: 

```
-----BEGIN PGP MESSAGE-----

owGtUn1MVWUYv9fEKU75cPSBUPICEsbHPd/n8KFkthoFRYg5iI9zzvuey0HuOZd7
L/didMWxGFgxaRaILgNkJs2NzAQ0oGjkBqyg0GBEaWUBfmA05KogdA7Lf1p/9mzv
++599nt+z+/37KlZ95DB2zic4n/V/+atQOPAlGDIy3L9UAoEFe4FcaVgD1p+UCFE
dkfuHhmCOGDCTBiHQShhkIIYJCEkBIKVCEThEoXRCBI8IeAkRTGQYrULCbQJN4m0
SLE04nCS5QjCxIMoIMmKGdmsNllxLNNiOCESLI4Qr9EzOI3jrBaQICGGI1I7EEmY
Xpiv2vUKTZzA21GMrGo57ZO7LO8/8P+z7uJlOo5FkDWRLElLUCBEmkKMRFE4h5lo
DqMxTgfakU3hLUhD25Em1SHziktGhbwCgTtKy9mcsoj0AUPVwsvKv3Axy8AoYLWp
DlVUC3Vzil2vdOy16qQuJOT+Q5IryArU5qnBnchml1WNDNOQokPW+2uCaNrEYCwV
BVCJVbahXL0dRjE0a9JCb4KcIC4PIJ7iWZGVcBGXRIbGISIRKUgcIdCsRAs0rblk
IWNiJYbQRicJkGFYiBALKQLnSALovooUFcSRmk7erHuSzQrvKLYh4PY+sIJYaTB6
G4IfDllp9E9gY669O7IZVFU92EGvFfoCGrzX+D7IpE36LJWl5JzMVz8qsB8I/PRH
zyb5NWNbZjfl9M0Oea/nda60pTq7yh7qzjln3pd66+nyVWPbpwdjg2/ylvavr+an
W+/Oih+CyJFtgw3q5hsdNfur07tivSbLf6ufOThV0zvu/6R3X0X80lljaKynN30r
l9lWMp16tDX158DODREZs09kWF75uCN5PHKYCehKfqZs7NnsCckrcSysebBmR3XP
2kdnhgpi6yzHONLQMOLuNiZwp84tBZ8uKm6N8a2dtofS0WWfRZff6Jtz1fu15G3Y
ZL1kL7a3hLlLWu4EhfvdPsKffn9HZQh5fmvYVG/44r2m9WfdW+ZnxcRRD+3JmBze
PdA3UNoaXZPweXk9+fa6u6D/UPs72xY4dviMgI9fOF6b1L4QFDLvu/6ToH1zf5A/
Wfzeup98Z2ouhAGeuZa6vsUE5grT3Zn418b+L4bxiNKZ595ovL/WR/zz+KnDMT0R
FbublPPO7La429PxZb+u6qw9sfpMvNdXDfxGD/8t+C7pkW/A/uujb05U7jKHb7lU
C45NBNS54i+uIfihlEXL6u351149XNdeNu4s+vKDx5mRQ6AJ+ERknhxzKQXxFamV
OxciHT7PDzXmvPRi1mhlT0V/ljksNOD35loQtKsjs7HoYtOVeyekyzvTY0vyj5Z3
zTTPX7/wcvtTjx1RWy8nmdPEtF9eOPj9fP7f
=Di24
-----END PGP MESSAGE-----
```

I hashed the message using the sha256 algorithm, and published the base64
representation of this hash as DNS record at `_keybase.sebastianwie.land`.

1. Copy the PGP message and save it into a file, e.g. `signed-proof.asc`.
2. Open the folder in which you saved the file using a terminal, then run:
    ```bash
    gpg --decrypt signed-proof.asc
    ```
3. GnuPG will print out the original object (minus whitespaces and line-breaks) and
tell you that the signature is good.
4. Create a base64 encoded SHA256 hash of the signed message.
    
    - On Linux or Mac, run:
        ```bash
        gpg -o - --dearmor signed-proof.asc | openssl -sha256 -binary | base64
        ```
    - On Windows, make sure that you're using Powershell and run:
        ```powershell
        gpg -o signed-proof.gpg --dearmor signed-proof.asc
        $dearmored = Get-Content -Encoding byte signed-proof.gpg
        [System.Convert]::ToBase64String([System.Security.Cryptography.SHA256]::Create().ComputeHash($dearmored))
        ```
5. Compare the base64 encoded SHA256 hash with the one I published as DNS record at `_keybase.sebastianwie.land`

    - On Linux or Mac, run:
        ```bash
        dig _keybase.sebastianwie.land TXT +noall +answer
        ```
    - On Windows, run:
        ```powershell
        Resolve-DnsName -Type TXT _keybase.sebastianwie.land
        ```
6. The hash I published can be found in the TXT record that starts with
   keybase-site-verification and is, apart from base64 padding (i.e. trailing
   `=` signs) identical to the one you just generated.

### Proof that the keyholder and the domain-owner of nwie.land are the same person

I created following object:

```json
{
  "body": {
    "key": {
      "eldest_kid": "010191ddf1d5d1d4dd3b38f3e52f516ed3a3b24557d5857deb6020c6c586e92489330a",
      "fingerprint": "01123c382eea91d726228888d34d12e412edef1a",
      "host": "keybase.io",
      "key_id": "d34d12e412edef1a",
      "kid": "010191ddf1d5d1d4dd3b38f3e52f516ed3a3b24557d5857deb6020c6c586e92489330a",
      "uid": "98ed804846fdb3c65e7f552910691619",
      "username": "sebastianwieland"
    },
    "service": {
      "domain": "nwie.land",
      "protocol": "dns"
    },
    "type": "web_service_binding",
    "version": 1
  },
  "ctime": 1616607095,
  "expire_in": 157680000,
  "prev": "e16fa062f39335538ea188a48ea74b50ca745295acd560a8d14b7ab609e7cda9",
  "seqno": 3,
  "tag": "signature"
}
```

I signed it using my OpenPGP key, yielding following signed message: 

```
-----BEGIN PGP MESSAGE-----

owGtUntQVFUY3+UhAwnBZiIYhVfB4bXc995loFoYEyd8VDgoEuu9e86uV/Dusru8
2nj0UBaaRmXTwpoQRyJrVpAYsomoIQx0iT8QNR+DQiAh8rAgYXKic5n8rz87M+d8
c77z+37f7/fNORLorQhQXt6qGlVNzYQrPROCYu+e4jIHJphBKZbkwPLgcoD5ANrs
+jwRYEkYTuCElgDASAAGEIAGgBIozkhBhjQyBAsBxVMCSTOMBjAcOqDA4iRuYA0M
x0ItSXNaisJ5LB4zipIJWi1WUbIv0xIkZaA4EkIe0WtIliQ5tABFA4KENNoAGgm5
cJ/ZJlcgcQJvg2rRjHLool+W9x/4/1l34TKdloOAw2mOZo1AoAwsAzVGhiG1BM5q
CZbQykAbtEr8AYjQNoik2kVeKhZhPi8BrCwe5axFogHKAwbmA7woIZz8rl4GxGMW
q9luNpjzZVOSTa6wl1pksmIo6P8t1guiBNAcEbwIWm2iGZEQCGmwi3JfJIRlcQ2u
ZeIxWGIRrVAvtyEYDcvhaMlNYBGihARr5HF2F2mkkE2GoTjIExzH0yhqaIHBDSgg
dwxvAAyL8xwgaEHDoxFpocYAeNmuDRZIZiyJQjp5k+xZNEm8vdAKsbKAai/KR6EM
UESsXuejVCVz6ntHr0VjTufjv+frJX88RYB/8OPME28EK1yltrWdc3fYmyOmku1P
H/GoUn4kVtW+SdyuuDc5fPX7voaPE631X0b5HiQ6AtVRkj81M/3riaCWHZnvPKxw
+zV57+7aa8mcwy7FOFpW7qnybIrdqmv3SL+kxI2seT7q2rDuGHVr6P2O8qL5iNcK
pxKydg9kjVXcyPTKWdHoFxpzrunG3+cnll5dnHEOXGAO3ambaumtL/zosnfNs4u9
xu60z8cX26I6pCsbz6gtJQ8newpda15Jn20e3KK74P1e72fPeXILLIL/rrGvJ8PL
3tK25x5/pDv57qedjRLw71m9s2flzP5tifuaHWO/faMbXl/ufLQ+7KfKDFf/6Sna
aU2NzQ4JCC8//Oes8kR3f+pIest8g6stF/5ekBzpVeceW+H7dlzgaTLMu8pVvzAS
+Z1vg+Nisyknd+huwbZzOUUTO29fwc4GadXPdHU3+tRGxKS63Za+pJuVcaqQS60h
wZX3Vfvjf872Y2bd8/SLedWx1YlnXgr/xHp8lLWl/6H/Yc50UtcX+W1QWVjaX2tX
jXy1ZXBzQWjK3cWXN9hqvmgXm7Kmzt6fHOucVWIZbdPjF9PZyiW6dinb0vPB5ut5
aY7Z1oaapxKim9ZdHz81tFBhZ56M8Ur4MJrOGO33JPYnD3WZolOPLkQvRp6Kq3Jv
IDa6jp3PGny97sF0wsCm1heuPjh8a3v5QNfBHaH/AA==
=sZvq
-----END PGP MESSAGE-----
```

I hashed the message using the sha256 algorithm, and published the base64
representation of this hash as DNS record at `_keybase.nwie.land`.

1. Copy the PGP message and save it into a file, e.g. `signed-proof.asc`.
2. Open the folder in which you saved the file using a terminal, then run:
    ```bash
    gpg --decrypt signed-proof.asc
    ```
3. GnuPG will print out the original object (minus whitespaces and line-breaks) and
tell you that the signature is good.
4. Create a base64 encoded SHA256 hash of the signed message.
    
    - On Linux or Mac, run:
        ```bash
        gpg -o - --dearmor signed-proof.asc | openssl -sha256 -binary | base64
        ```
    - On Windows, make sure that you're using Powershell and run:
        ```powershell
        gpg -o signed-proof.gpg --dearmor signed-proof.asc
        $dearmored = Get-Content -Encoding byte signed-proof.gpg
        [System.Convert]::ToBase64String([System.Security.Cryptography.SHA256]::Create().ComputeHash($dearmored))
        ```
5. Compare the base64 encoded SHA256 hash with the one I published as DNS record at `_keybase.nwie.land`

    - On Linux or Mac, run:
        ```bash
        dig _keybase.nwie.land TXT +noall +answer
        ```
    - On Windows, run:
        ```powershell
        Resolve-DnsName -Type TXT _keybase.nwie.land
        ```
6. The hash I published can be found in the TXT record that starts with
   keybase-site-verification and is, apart from base64 padding (i.e. trailing
   `=` signs) identical to the one you just generated.