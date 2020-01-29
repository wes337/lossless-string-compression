# Lossless String Compression

Compress and decompress sorted lists of text using delta encoding. *The entries must be separated by newlines.*

Clone or download this repo, then install using your package manager. Then start the server by running:

```
npm run start

// or

yarn start
```

There are 2 endpoints to call:

**POST /compress** - Takes text, and returns the compressed results.
**POST /decompress** - Takes compressed text, and returns the uncompressed results.

```
curl -H "Content-Type: text/plain" --data-binary @smallwords.txt http://localhost:3000/compress
```