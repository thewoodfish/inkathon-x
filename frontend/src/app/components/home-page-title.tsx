import Image from 'next/image'
import Link from 'next/link'
import { AnchorHTMLAttributes, FC } from 'react'

import githubIcon from 'public/icons/github-button.svg'
import telegramIcon from 'public/icons/telegram-button.svg'
import vercelIcon from 'public/icons/vercel-button.svg'
import wakandaLogo from 'public/images/wakanda.jpeg'

import { cn } from '@/utils/cn'

interface StyledIconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  className?: string
}

const StyledIconLink: React.FC<StyledIconLinkProps> = ({ className, children, ...rest }) => (
  <Link
    className={cn(
      'group opacity-90 transition-all hover:-translate-y-0.5 hover:opacity-100',
      className,
    )}
    {...rest}
  >
    {children}
  </Link>
)

export const HomePageTitle: FC = () => {
  const title = 'Wakanda General Elections'
  const desc = 'Contract for conducting the general elections in Wakanda'
  const githubHref = 'https://github.com/thewoodfish/inkathon'

  return (
    <>
      <div className="flex flex-col items-center text-center font-mono">
        {/* Logo & Title */}
        <Link
          href={githubHref}
          target="_blank"
          // className="group"
          className="group flex cursor-pointer items-center gap-4 rounded-3xl px-3.5 py-1.5 transition-all hover:bg-gray-900"
        >
          <Image src={wakandaLogo} priority width={60} alt="ink!athon Logo" />
          <h1 className="text-[2.5rem] font-black tracking-tighter">{title}</h1>
        </Link>

        {/* Tagline & Lincks */}
        <p className="mb- mt-4 text-gray-400">{desc}</p>
        <div className="my-5 h-[1px] w-[5rem] max-w-full bg-gray-800" />
      </div>
    </>
  )
}
