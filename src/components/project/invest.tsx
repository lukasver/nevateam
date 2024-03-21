import React from 'react';
import { ProjectDetailsActionsSectionProps } from './sections';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  TextField,
} from '@mui/material';
import { Paragraph, Title } from '../ui/typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, formValues } from '@/types/projects';
import currencyJs from 'currency.js';
import { fireErrorToast, onInvalid } from '@/lib/client/utils';
import { toast } from 'sonner';
import { useToggle } from '@/lib/client/hooks';

function InvestComponent({ project }: ProjectDetailsActionsSectionProps) {
  const { on, toggle } = useToggle();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = useForm<formValues>({
    resolver: zodResolver(FormValues),
    defaultValues: {
      currency: 'USD',
      value: '25000',
      amount: '25000',
    },
  });
  const onSubmit: SubmitHandler<formValues> = async (data) => {
    if (!isValid) {
      return fireErrorToast('Form status is invalid');
    }
    console.debug('🚀 ~ data:', data);
    try {
      toggle(true);
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json());
      if (!response.success) {
        throw new Error('Failed to send email');
      }
      toast('Contact sent 🎉!', {
        description: 'We will get back to you in no time!',
      });
    } catch (e: unknown) {
      console.log('Error', e);
      fireErrorToast(e);
    } finally {
      toggle(false);
    }
  };

  return (
    <Card
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      component={'form'}
      sx={{
        width: '100%',
        boxShadow: '2',
        borderRadius: '10px',
        padding: '2rem',
      }}
    >
      <Stack spacing={2}>
        <Title sx={{ color: 'primary.main' }}>Interested in investing?</Title>
        <Divider />
        <Paragraph>
          Fill out the form below and we will get back to you as soon as
          possible.
        </Paragraph>
        <Stack spacing={1}>
          {INPUTS.map(({ name, label, type }) => (
            <TextField
              key={name}
              label={label}
              {...register(name, {
                onChange:
                  name === 'amount'
                    ? (e) => {
                        const quantity = e.target.value;
                        const amount = currencyJs(quantity, {
                          precision: 2,
                        }).multiply(project.faceValuePerUnit);
                        return setValue('value', amount.toString());
                      }
                    : undefined,
              })}
              size={'small'}
              error={!!errors[name]}
              helperText={errors[name]?.message}
              type={type}
            />
          ))}
          <Box sx={{ display: 'flex', gap: '.5rem', width: '100%' }}>
            <TextField
              disabled
              fullWidth
              label={'Amount'}
              {...register('value')}
              size={'small'}
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors['value']}
              helperText={errors['value']?.message}
            />
            <TextField
              disabled
              fullWidth
              label={'Currency'}
              size={'small'}
              InputProps={{
                readOnly: true,
              }}
              {...register('currency', { value: 'USD' })}
              error={!!errors['currency']}
              helperText={errors['currency']?.message}
            />
          </Box>
        </Stack>
        <Button
          type={'submit'}
          fullWidth
          variant={'contained'}
          color={'primary'}
          disabled={on}
        >
          {on ? <CircularProgress size={25} /> : 'Submit'}
        </Button>
      </Stack>
    </Card>
  );
}
const INPUTS = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'name', label: 'Full name', type: 'text' },
  { name: 'amount', label: 'Quantity', type: 'number' },
] as const;

export default InvestComponent;
