# DEFCON REST Gateway Plugin

## Prerequisits
1. [DEFCON](http://github.com/acuminous/defcon)

## Installation
1. ```cd $DEFCON_INSTALL_DIR```
2. ```npm install defcon-rest-gateway```
3. Enable and configure 'defcon-rest-gateway' in your DEFCON configuration file, e.g.
```json
{
    "plugins": {
        "installed": [
            "defcon-rest-gateway"
        ]
    }
}
```
4. Restart defcon (you can do this via ```kill -s USRSIG2 <pid>``` if you want zero downtime)

## Usage
Notifying DEFCON of events via the REST Gateway Plugin requires you to POST a json object to http://<defcon-host>:<defcon-port>/plugin/rest-gateway/api/v1/event. The json object should be as follows
```js
{
    "system": "entertainment-portal",
    "group": "www",                                // optional
    "type": "error",
    "environment": "production",                   // optional
    "host": "192.168.1.100",                       // defaults to 'x-forwarded-for' header or remote address 
    "message": "Gateway timeout 504",              // optional
    "severity": "1",                               // 1-5, defaults to 1
    "link": "http://www.entertainment-portal.com"  // optional
}"
```

### Testing from the command line
```bash
curl -i -X POST localhost:8080/plugin/defcon-rest-gateway/api/v1/event -H "Content-Type: application/json" -d "{\"system\": \"entertainment-portal\", \"group\": \"www\", \"type\": \"error\", \"environment\": \"production\", \"message\": \"Gateway timeout 504\", \"severity\": \"3\", \"link\": \"http://www.entertainment-portal.com\" }"
```
