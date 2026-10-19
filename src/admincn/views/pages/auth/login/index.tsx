// Next Imports
import Link from 'next/link'

// Components Import
import Logo from '@admincn/components/shared/Logo'
import { Button } from '@admincn/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@admincn/components/ui/card'
import { Separator } from '@admincn/components/ui/separator'
import MagicLinkForm from '@admincn/views/pages/auth/login/magic-link-form'

// SVG Import
import AuthBackgroundShape from '@admincn/assets/svg/auth-background-shape'

const Login = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full gap-6 py-6 sm:max-w-lg'>
        <CardHeader className='gap-6 px-6'>
          <Link href='/'>
            <Logo className='gap-3' />
          </Link>

          <div>
            <CardTitle className='mb-2 text-2xl font-semibold'>Autentificare</CardTitle>
            <CardDescription className='text-base'>Lépj be a fiókodba e-mail linkkel vagy gyors belépéssel.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          <div className='space-y-4'>
            <MagicLinkForm />

            <p className='text-muted-foreground text-center text-base'>
              Ha rendelkezel jelszóval,{' '}
              <Link href='/pages/auth/login/password' className='text-card-foreground hover:underline'>
                jelszóval belépés
              </Link>
            </p>

            {/* Quick Login Buttons */}
            <div className='flex flex-wrap gap-4 sm:gap-6'>
              <Button variant='outline' className='grow'>
                Belépés felhasználóként
              </Button>
              <Button variant='outline' className='grow'>
                Belépés adminként
              </Button>
            </div>

            <p className='text-muted-foreground text-center text-base'>
              Új vagy a platformon?{' '}
              <Link href='/pages/auth/register' className='text-card-foreground hover:underline'>
                Fiók létrehozása
              </Link>
            </p>

            <div className='flex items-center gap-4'>
              <Separator className='flex-1' />
              <p className='text-base'>vagy</p>
              <Separator className='flex-1' />
            </div>

            <Button variant='ghost' className='w-full' render={<Link href='#' />} nativeButton={false}>
              Belépés Google-lel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
