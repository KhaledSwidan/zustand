import { memo } from 'react';

interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    remaining: number;
  };
}

const TodoStats = memo(({ stats }: TodoStatsProps) => {
  const { total, completed, remaining } = stats;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className='todo-stats'>
      <div className='stats-grid'>
        <div className='stat-item'>
          <span className='stat-number'>{total}</span>
          <span className='stat-label'>Total</span>
        </div>
        <div className='stat-item'>
          <span className='stat-number'>{remaining}</span>
          <span className='stat-label'>Remaining</span>
        </div>
        <div className='stat-item'>
          <span className='stat-number'>{completed}</span>
          <span className='stat-label'>Completed</span>
        </div>
        <div className='stat-item'>
          <span className='stat-number'>{completionRate}%</span>
          <span className='stat-label'>Progress</span>
        </div>
      </div>
      {total > 0 && (
        <div className='progress-bar'>
          <div
            className='progress-fill'
            style={{ width: `${completionRate}%` }}
            role='progressbar'
            aria-valuenow={completionRate}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${completionRate}% of tasks completed`}
          />
        </div>
      )}
    </div>
  );
});

TodoStats.displayName = 'TodoStats';

export default TodoStats;
