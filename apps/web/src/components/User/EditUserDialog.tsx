import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import API from '@/lib/API';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label.acerternity';
import { useToast } from '../ui/use-toast';

const taskSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  newPassword: z.string().nonempty(),
});

export function EditUserDialog({ children, editInfo, onUpdate }: any) {
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      username: '',
      password: '',
      newPassword: '',
    },
  });
  const { toast } = useToast();

  const submit = async (formData: any) => {
    try {
      const { data }: any = await API.patch(
        `/api/auth/${editInfo._id}/edit`,
        formData
      );

      toast({
        title: 'Success!',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      });
      onUpdate();
    } catch (err) {
      console.log('Error creating task:', err);
    }
  };

  useEffect(() => {
    if (editInfo) {
      form.setValue('username', editInfo.username);
    }
  }, [editInfo]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <div className="grid gap-4 w-full py-4">
              <div className="grid grid-cols-4 w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="username"
                          placeholder="Enter username"
                          className="col-span-3 w-[350px]"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          placeholder="Enter passsword"
                          className="col-span-3 w-[350px]"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="newPassword" className="text-right">
                        New Password
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="newPassword"
                          placeholder="Enter task title"
                          className="col-span-3 w-[350px]"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit">Update User</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
