# Lossless String Compression

Compress and decompress sorted lists of text using delta encoding. *The entries must be separated by newlines.*

Clone or download this repo, then install using your package manager.
*You also have to install dependencies from the client directory*
```json5
yarn // or npm install
cd client
yarn // again, or npm install
```

Then start the server by running:
```json5
npm run start
// or
yarn start
```

You can visit the React SPA at:
```
http://localhost:3000
```

There are 2 endpoints to call:

**POST /compress** - Takes text, and returns the compressed results.
**POST /decompress** - Takes compressed text, and returns the uncompressed results.

You can call them directly using Postman, or Curl like this:
```
curl -H "Content-Type: text/plain" --data-binary @smallwords.txt http://localhost:5000/compress
```

Wesley Moses 2020