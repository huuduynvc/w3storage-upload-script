import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import * as Proof from '@web3-storage/w3up-client/proof'
import { Signer } from '@web3-storage/w3up-client/principal/ed25519'
import * as dotenv from 'dotenv'
import { filesFromPaths } from 'files-from-path'

dotenv.config()

async function main() {
  try {
    // Validate environment variables
    if (!process.env.KEY || !process.env.PROOF) {
      throw new Error('Missing KEY or PROOF in .env file')
    }

    // Initialize the client with the key
    const principal = Signer.parse(process.env.KEY)
    const store = new StoreMemory()
    const client = await Client.create({ principal, store })

    // Convert base64 PROOF to Uint8Array and extract delegation
    const proof = await Proof.parse(process.env.PROOF)
    if (!proof) {
      throw new Error('Failed to extract delegation proof')
    }
    
    const space = await client.addSpace(proof)
    await client.setCurrentSpace(space.did())
    
    // Get files from the specified path
    const path = process.env.PATH_TO_FILES || './images'
    const files = await filesFromPaths([path])
    console.log(`📂 Read ${files.length} file(s) from ${path}`)

    // Upload files as a directory
    console.log('⏳ Uploading files...')
    const directoryCid = await client.uploadDirectory(files)
    
    // Log results
    console.log('✅ Upload complete!')
    console.log('\n🔗 Files available at:')
    console.log(`https://${directoryCid}.ipfs.dweb.link/`)
    console.log(`https://w3s.link/ipfs/${directoryCid}/`)

  } catch (error) {
    console.error('❌ Error occurred:', error)
  }
}

main()
