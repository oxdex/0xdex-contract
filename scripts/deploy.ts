import { BigNumber, providers, Wallet } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import OxDexFactory from '../build/OxDexFactory.json'
import { enpoint, mnemonic } from '../deploy.json'
import { createInterface } from 'readline'

const deployComfirm = (chainId: number, deployer: string) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((res, rej) => {
    rl.question(`Please confirm: deploy by ${deployer} on network ${chainId}(Y/n) `, (answer) => {
      try {
        if (answer === 'Y') {
          res(null)
        } else {
          rej('rejected')
        }
      } finally {
        rl.close()
      }
    })
  })
}

async function main() {
  const provider = new providers.JsonRpcProvider(enpoint)
  const signer = Wallet.fromMnemonic(mnemonic).connect(provider)

  const { chainId } = await provider.getNetwork()
  await deployComfirm(chainId, signer.address)

  console.log('deploying...')
  const factory = await deployContract(signer, OxDexFactory, [signer.address], {
    gasPrice: BigNumber.from(1e9),
  })
  await factory.deployed()
  console.log('deployed at', factory.address)
}

main().catch(console.log)
