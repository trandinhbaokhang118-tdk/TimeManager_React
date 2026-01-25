import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { ListTodo, AlertCircle } from 'lucide-react';
import type { Task } from '../../types';

interface TaskListProps {
    tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
    return (
        <div className="bg-[var(--surface-1)] border border-[var(--border)] rounded-xl p-4 sticky top-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
                <ListTodo className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-[var(--text)]">Chưa lên lịch</h3>
                <span className="ml-auto text-sm text-[var(--text-3)]">{tasks.length}</span>
            </div>

            {tasks.length === 0 ? (
                <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-[var(--text-3)] mx-auto mb-3" />
                    <p className="text-sm text-[var(--text-2)]">Tất cả công việc đã được lên lịch</p>
                </div>
            ) : (
                <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </SortableContext>
            )}

            <div className="mt-4 pt-3 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-3)] text-center">
                    Kéo thả công việc vào ngày để lên lịch
                </p>
            </div>
        </div>
    );
}
