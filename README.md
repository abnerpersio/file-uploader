<h2 align="center">File uploader</h4>

<h3 align="center">A service for managing files with any platform</h3>

*You can use it for manage your files or as a simple REST service :)*

### All about the service:

This was made for learning more about Clean Code, OOP in Javascript, Typescript, Node, Cloud Platforms (aws, azure, google cloud, firebase), github workflows, automated deploy with Heroku or any other system.

Developed with:
- Typescript
- Node

Tested with:
- Jest

Deployed (automacally) with:
- Heroku

#### Available platforms for upload:

- [x] AWS S3
- [x] Google Cloud
- [x] Firebase Storage
- [x] Azure Blob Storage


### Technical Documentation
#### How to run the project

*1. Clone this project*
```bash
git clone https://github.com/abnerpersio/file-uploader.git
cd file-uploader
```

*2. Configure `.env` file based on `.env.example` with your configurations*

You can configure only the providers that you want. Eg.: AWS or Firebase

*3. Install dependencies*
```bash
yarn 
```

*4. Run development server*
```bash
yarn dev
```

**If you wanna run in production:**

*5. Build the project*
```bash
yarn build
```

*6. Start the production server*
```bash
yarn start
```


### API Docs

There is a insomnia `.yaml` file with request in `docs/` folder. Import it on your insomnia to use the requests

**POST** `/files`

Possible `upload_provider` values (query: upload_provider):

```ts
'aws' | 'firebase' | 'azure' | 'google_cloud'
```

Headers: 
```json
{
  "Content-Type": "multipart/form-data"
}
```

Query
```json
{
  "upload_provider": "provider"
}
```

Body (image metadata - optional)
```json
{
  "key": "value"
}
```


**Sample responses**

<span style="color:red;font-weight:bold">400 (invalid upload provider sent)</span>
```json
{
  "success": false,
  "message": "The upload client was not found"
}
```

<span style="color:red;font-weight:bold">422 (missing or invalid file)</span>
```json
{
  "success": false,
  "message": "File is required for uploading"
}
```

<span style="color:green;font-weight:bold">201</span>
```json
{
  "success": true,
  "data": {
    "url": "https://uploaded-image.ext"
  }
}
```
