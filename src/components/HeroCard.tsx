import { Tilt } from '@/components/ui/tilt';

export function HeroCard() {
    return (
      <Tilt rotationFactor={8} isRevese>
        <div
          style={{
            borderRadius: '8px',
          }}
          className='flex max-w-[380px] flex-col overflow-hidden border border-brand-logo/80 bg-white dark:border-zinc-50/10 dark:bg-zinc-900/20'
        >
          <img
            src='/banner.jpg'
            alt='banner'
            className='h-52 w-full object-cover'
          />
          <div className='p-2'>
            <p className='font-mono text-zinc-700 dark:text-zinc-400'>@Maple Ridge</p>
          </div>
        </div>
      </Tilt>
    );
  }