# Here are some developers informations

## Difference between unifios and unifi
Unifi is the network server that you can install on multiple plateform (docker/linux/windows) .

UnifiOS is the OS of the unifi consoles . They include an unifi network server behind an internal proxy .
They manage some things differently, like authentication (need to do it on unifios level and not on the unifi server) .
And are really harder to "emulate";

## Tests

### Generating datas
generating datas for scenarios will need you to have some pieces of hardware .

But, to do this, you need to setup env variables :
````dotenv
JEST_RECORD=true
TEST_UNIFIOS_URL=https://pathToYourUnifiOs
TEST_UNIFI_URL=https://pathToYourUnifi
````


### debugging test

you can use
````dotenv
DEBUG=nock*,test-recorder*,unifi*
````
