'use client'

// React Imports
import { useState } from 'react'

// Components Import
import { Button } from '@admincn/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@admincn/components/ui/field'
import { Input } from '@admincn/components/ui/input'

const MagicLinkForm = () => {
  const [email, setEmail] = useState('')

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        <Field className='gap-2'>
          <FieldLabel htmlFor='magicLinkEmail' className='leading-5'>
            E-mail cím*
          </FieldLabel>
          <Input
            type='email'
            id='magicLinkEmail'
            placeholder='Add meg az e-mail címed'
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete='email'
          />
        </Field>
        <Field>
          <Button className='w-full' type='submit'>
            Belépési link küldése
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default MagicLinkForm
