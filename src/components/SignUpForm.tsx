import React, { useEffect } from 'react';
import SingleInputField from './SingleInputField';
import { useState } from 'react';
import Button from './Button';
import { useLoginMutation, useSignupMutation } from '../hooks/useUser';
import { LoginUser, SignupUser, signUpSchema } from '../utilities/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

type SignUpForm = React.FormHTMLAttributes<HTMLFormElement>;

function SignUpForm() {
  const { mutate, isLoading, isError, isSuccess } = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUser>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return (
      <div className="flex gap-2 px-5 py-8 items-end">
        <UseAnimations
          animation={loading}
          strokeColor="rgba(255, 255, 255, 0.4)"
        />
        <h4 className="typography-title text-white-dimmed">Loading.....</h4>
      </div>
    );
  }

  const onSubmit = (data: SignupUser) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <SingleInputField
        error={errors.firstName}
        svg="name"
        placeholder="First name"
        type="text"
        id="firstname"
        {...register('firstName')}
      />
      <SingleInputField
        error={errors.lastName}
        placeholder={'Last name'}
        svg={'name'}
        type="text"
        id="lastname"
        {...register('lastName')}
      />
      <SingleInputField
        error={errors.email}
        placeholder={'your@email.com'}
        svg="email"
        type="email"
        id="email"
        {...register('email')}
      />

      <SingleInputField
        error={errors.password}
        placeholder={'Password'}
        svg="key"
        type="password"
        id="password"
        {...register('password')}
      />
      <SingleInputField
        error={errors.confirmPassword}
        placeholder={'Repeat your password'}
        svg="key"
        type="password"
        id="confirmPassword"
        {...register('confirmPassword')}
      />
      <Button type="submit" size="md">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
