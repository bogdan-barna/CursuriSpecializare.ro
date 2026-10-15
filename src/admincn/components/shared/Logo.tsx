// Config Imports
import themeConfig from '@admincn/configs/themeConfig'

// SVG Imports
import LogoSvg from '@admincn/assets/svg/logo'

// Util Imports
import { cn } from '@admincn/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoSvg className='size-8.5' />
      <span className='text-xl font-bold'>{themeConfig.templateName}</span>
    </div>
  )
}

export default Logo
