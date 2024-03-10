'use client'

import { useEffect } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import { HomePageTitle } from '@/app/components/home-page-title'
import { ChainInfo } from '@/components/web3/chain-info'
import { ConnectButton } from '@/components/web3/connect-button'
import { ElectionContractInteractions } from '@/components/web3/election-contract-interactions'

export default function HomePage() {
  // Display `useInkathon` error messages (optional)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <div className="container relative flex grow flex-col items-center justify-center py-10">
        {/* Title */}
        <HomePageTitle />

        {/* Connect Wallet Button */}
        <ConnectButton />

        <div className="mt-12 ">
          {/* Election Read/Write Contract Interactions */}
          <ElectionContractInteractions />

          <div className='pb-[70px]'></div>
          {/* Chain Metadata Information */}
          <ChainInfo />
        </div>
      </div>
    </>
  )
}
