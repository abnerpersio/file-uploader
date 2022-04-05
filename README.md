<h2 align="center">File uploader</h4>

<p align="center"> 
  <img src="https://media.giphy.com/media/3o7ZeqkYTvaL3lGjCw/giphy.gif" width="250" />
</p>

<h3 align="center">A service for managing files with any platform</h3>

*You can use it for manage files or any other idea you have :)*

Using the service:

### API Docs

- **POST** `/files`

Sample request

Possible `upload_provider` values:

```ts
'aws' | 'firebase' | 'azure' | 'google_cloud'
```


**Headers:** 
```json
{
  "Content-Type": "multipart/form-data"
}
```

**Query**
```json
{
  "upload_provider": "provider"
}
```

**Body (image metadata - optional)**
```json
{
  "key": "value"
}
```

Sample responses

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
yarn // or npm install
```

*4. Run development server*
```bash
yarn dev // or npm run dev
```

**If you wanna run in production:**

*5. Build the project*
```bash
yarn build // or npm run build
```

*6. Start the production server*
```bash
yarn start // or npm run start
```
