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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';

const taskSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  status: z.string().nonempty(),
});

export function DeleteTaskDialog({ children, editInfo, onUpdate }: any) {
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
    },
  });

  const { toast } = useToast();

  const submit = async (formData: any) => {
    try {
      const { data }: any = await API.patch(
        `/api/tasks/${editInfo._id}/edit`,
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
      form.setValue('title', editInfo.title);
      form.setValue('description', editInfo.description);
      form.setValue('status', editInfo.status);
    }
  }, [editInfo]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <div className="grid gap-4 w-full py-4">
              <div className="grid grid-cols-4 w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="title"
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
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="description"
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
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex w-[350px] items-end justify-center gap-2">
                        <div className="w-full ">
                          <Label>Status</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              form.getValues('status') || field.value
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  className="w-[350px]"
                                  placeholder="Select a request status"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={' '}>NONE</SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                              <SelectItem value="inprogress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button type="submit">Edit Task</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
