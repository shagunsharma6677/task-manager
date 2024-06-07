import { Task } from '@/components/Task/Task';
import { User } from '@/components/User/User';
import { Tabs } from '@/components/ui/tabs';

const Dashboard = () => {
  const tabs = [
    {
      title: 'Task',
      value: 'task',
      content: (
        <div className="w-full dark:bg-violet-800 overflow-hidden relative h-full rounded-2xl md:p-10 p-2 text-xl md:text-4xl font-bold text-white">
          <p>Task</p>
          <Task />
        </div>
      ),
    },
    {
      title: 'Users',
      value: 'users',
      content: (
        <div className="w-full dark:bg-lime-600 overflow-hidden relative h-full rounded-2xl md:p-10 p-2 text-xl md:text-4xl font-bold text-white">
          <p>User</p>
          <User />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[40rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-6xl mx-auto w-full pt-16 items-start justify-start">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Dashboard;
