'use client';

import API from '@/lib/API';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input.aceternity';
import { Label } from '../ui/label.acerternity';
import { useToast } from '../ui/use-toast';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/api/login', { username, password });
      if (!data) {
        throw new Error('Login failed');
      }

      if (data.data.token) {
        localStorage.setItem('token', JSON.stringify(data.data.token));
      }
      toast({
        title: 'Success!',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });

      navigate('/dashboard');
      // window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error!',
        description: 'Something went wrong!',
      });
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-neutral-950">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to out Task Manager
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please log in to manage your tasks efficiently and stay organized.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label className="mr-auto" htmlFor="firstname">
              User name
            </Label>
            <Input
              id="username"
              placeholder="Nick"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label className="mr-auto" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="Nick@123"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col  space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
