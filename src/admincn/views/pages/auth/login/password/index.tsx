// Next Imports
import Link from 'next/link'

// Components Import
import Logo from '@admincn/components/shared/Logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@admincn/components/ui/card'
import LoginForm from '@admincn/views/pages/auth/login/login-form'

// SVG Import
import AuthBackgroundShape from '@admincn/assets/svg/auth-background-shape'

const PasswordLogin = () => {
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
            <CardTitle className='mb-2 text-2xl font-semibold'>Jelszóval való belépés</CardTitle>
            <CardDescription className='text-base'>
              Add meg az e-mail címed és a jelszavad a fiókod eléréséhez.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          <div className='space-y-4'>
            <LoginForm />

            <p className='text-muted-foreground text-center text-base'>
              Más módon szeretnél belépni?{' '}
              <Link href='/pages/auth/login' className='text-card-foreground hover:underline'>
                Vissza az autentificare oldalra
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PasswordLogin
