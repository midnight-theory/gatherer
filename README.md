[![license](https://img.shields.io/github/license/midnight-theory/gatherer.svg)](https://github.com/midnight-theory/gatherer/blob/master/LICENSE)

# Gatherer
Gather content from [GatherContent](https://gathercontent.com/).

Originally written from [@kyleoliveiro](https://github.com/kyleoliveiro), modified by [@aaronkow](https://github.com/aaronkow) to fetch V2 API from GatherContent.

![Demo](https://github.com/midnight-theory/gatherer/blob/master/demo/gatherer.gif?raw=true)

## Installation
```bash
# For npm
$ npm i -g @midnight-theory/gatherer

# For yarn
$ yarn global add @midnight-theory/gatherer
```

## Gatting started
1. Create config with naming `gatherer.json` with reference to your GatherContent `username` and `password` with format:
```json
{
  "username": "<your-email>",
  "password": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "project": "888888",
  "pages": "./dest"
}
```

2. Then run `gatherer`. That's all.

### Config for gatherer.json
| Key  | Explaination |
| ------------- | ------------- |
| `username`  | Specify your username here, which is the email you registered with GatherContent |
| `password`  | Password is your API key which you can generate via API tab under "Personal settings" |
| `project`  | This is the project ID which you can obtain from via project link |
| `pages`  | Specify where the data should be stored |