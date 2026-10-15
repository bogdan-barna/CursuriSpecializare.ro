'use client'

// Component Import
import { Button } from '@admincn/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@admincn/components/ui/field'
import { Input } from '@admincn/components/ui/input'

const ForgotPasswordForm = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        {/* Email */}
        <Field>
          <FieldLabel className='leading-5' htmlFor='userEmail'>
            Email address*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Enter your email address' />
        </Field>
        <Field>
          <Button className='w-full' type='submit'>
            Send Reset Link
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ForgotPasswordForm
