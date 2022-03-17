## File Uploader

**A REST service for managing files with any platform**

The main idea is to be platform agnostic

Available platforms for upload:

- [x] AWS S3
- [ ] Google Cloud
- [x] Google Drive
- [ ] Azure Blob Storage
- [x] Firebase Storage

## How to run the project

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
