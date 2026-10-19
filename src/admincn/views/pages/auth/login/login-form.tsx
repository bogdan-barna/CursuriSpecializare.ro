'use client'

// React Imports
import { useEffect, useState, type FormEvent } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { EyeIcon, EyeOffIcon } from 'lucide-react'

// Components Import
import { Button } from '@admincn/components/ui/button'
import { Checkbox } from '@admincn/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@admincn/components/ui/field'
import { Input } from '@admincn/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@admincn/components/ui/input-group'

const REMEMBER_ME_STORAGE_KEY = 'cursurispecializare.auth.rememberMe'
const REMEMBERED_EMAIL_STORAGE_KEY = 'cursurispecializare.auth.rememberedEmail'

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    try {
      const storedRemember = localStorage.getItem(REMEMBER_ME_STORAGE_KEY) === 'true'
      const storedEmail = localStorage.getItem(REMEMBERED_EMAIL_STORAGE_KEY) ?? ''
      setRememberMe(storedRemember)
      if (storedRemember && storedEmail) {
        setEmail(storedEmail)
      }
    } catch {
      // localStorage may be unavailable (SSR / privacy mode)
    }
  }, [])

  const handleRememberMeChange = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true
    setRememberMe(isChecked)
    try {
      if (!isChecked) {
        localStorage.removeItem(REMEMBER_ME_STORAGE_KEY)
        localStorage.removeItem(REMEMBERED_EMAIL_STORAGE_KEY)
      }
    } catch {
      // ignore
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (rememberMe) {
        localStorage.setItem(REMEMBER_ME_STORAGE_KEY, 'true')
        localStorage.setItem(REMEMBERED_EMAIL_STORAGE_KEY, email.trim())
      } else {
        localStorage.removeItem(REMEMBER_ME_STORAGE_KEY)
        localStorage.removeItem(REMEMBERED_EMAIL_STORAGE_KEY)
      }
    } catch {
      // ignore
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className='gap-4'>
        {/* Email */}
        <Field className='gap-2'>
          <FieldLabel htmlFor='userEmail' className='leading-5'>
            E-mail cím*
          </FieldLabel>
          <Input
            type='email'
            id='userEmail'
            placeholder='Add meg az e-mail címed'
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='email'
          />
        </Field>
        {/* Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password' className='leading-5'>
            Jelszó*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id='password'
              type={isVisible ? 'text' : 'password'}
              placeholder='••••••••••••••••'
              autoComplete='current-password'
            />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isVisible ? 'Jelszó elrejtése' : 'Jelszó megjelenítése'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Remember Me and Forgot Password */}
        <div className='flex items-center justify-between gap-y-2'>
          <Field orientation='horizontal' className='flex items-center gap-2'>
            <Checkbox id='rememberMe' checked={rememberMe} onCheckedChange={handleRememberMeChange} />
            <FieldLabel htmlFor='rememberMe' className='text-muted-foreground'>
              Emlékezz rám
            </FieldLabel>
          </Field>
          <Link href='/pages/auth/forgot-password' className='text-base text-nowrap hover:underline'>
            Elfelejtetted a jelszavad?
          </Link>
        </div>
        <Field>
          <Button className='w-full' type='submit'>
            Bejelentkezés
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
