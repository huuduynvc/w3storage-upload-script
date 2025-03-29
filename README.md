## Dependencies

```bash
npm install @web3-storage/w3up-client
```

## Setup Process

1. **Login to W3**

   ```bash
   w3 login
   ```

2. **Update .env file**

```bash
# The following command returns what will be your Agent private key and DID
w3 key create
 
# ❗️ Store the private key (starting "Mg...") in environment variable KEY
 
# The following command creates a UCAN delegation from the w3cli agent to the
# agent you generated above.
#
# Use `w3 space use` prior to this to set the Space you intend on delegating
# access to.
#
# If you want to limit permissions being passed to the Agent, you can specify
# permissions to give, e.g., `--can space/blob/add --can space/index/add --can
# filecoin/offer --can upload/add` limits to just being able to upload.
w3 delegation create <did_from_ucan-key_command_above> --base64
 
# ❗️ Store the output in environment variable PROOF
```

## Running the Application

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd [project-directory]
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file with necessary configuration settings.

4. **Run the Application**
   ```bash
   npm start
   ```