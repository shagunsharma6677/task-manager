'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedTooltip } from './animated-tooltip';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

const people = [
  {
    id: 1,
    name: 'Nick',
    designation: 'Software Engineer',
    image: 'https://nextui.org/images/album-cover.png',
  },
];

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const initialTab = propTabs.length > 0 ? propTabs[0] : null;
  const [active, setActive] = useState<Tab | null | undefined>(initialTab);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const navigate = useNavigate();

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab: any = newTabs?.splice(idx, 1);
    newTabs?.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    // window.location.reload()
  };

  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center justify-between our-button glow[perspective:1000px] relative overflow-auto sm:overflow-visible bg-black p-2 rounded-full no-visible-scrollbar max-w-full w-full px-6',
          containerClassName
        )}
      >
        <div>
          {propTabs?.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => {
                moveSelectedTabToTop(idx);
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn('relative px-4 py-2 rounded-full', tabClassName)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {active?.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    'absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ',
                    activeTabClassName
                  )}
                />
              )}

              <span className="relative block text-black dark:text-white">
                {tab.title}
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button>
            <AnimatedTooltip items={people} />
          </Button>
          {/* <button
            onClick={handleLogout}
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Logout
          </button> */}
        </div>
      </div>
      {active && (
        <FadeInDiv
          tabs={tabs}
          active={active}
          key={active.value}
          hovering={hovering}
          className={cn('mt-32', contentClassName)}
        />
      )}
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0]?.value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn('w-full h-full absolute top-0 left-0', className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
