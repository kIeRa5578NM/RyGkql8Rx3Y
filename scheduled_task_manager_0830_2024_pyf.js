// 代码生成时间: 2025-08-30 20:24:54
import Ember from 'ember';

// 定时任务调度器组件
export default Ember.Component.extend({
    // 任务列表
    tasks: [],
    // 任务执行间隔（毫秒）
    interval: 1000,

    // 组件初始化
    init() {
        this._super(...arguments);
        this.scheduleTasks();
    },

    // 调度任务
    scheduleTasks() {
        this.get('tasks').forEach((task) => {
            setInterval(() => {
                try {
                    // 尝试执行任务
                    task.action();
                } catch (error) {
                    // 任务执行错误处理
                    console.error(`Error executing task: ${error.message}`);
                }
            }, task.interval);
        });
    },

    // 添加任务
    addTask(task) {
        if (!task || typeof task.action !== 'function' || typeof task.interval !== 'number') {
            throw new Error('Invalid task configuration');
        }
        this.get('tasks').pushObject(task);
        this.scheduleTasks();
    },

    // 移除任务
    removeTask(task) {
        this.get('tasks').removeObject(task);
    },

    // 清理组件
    willDestroy() {
        this._super(...arguments);
        this.get('tasks').forEach((task) => {
            clearInterval(task.timerId);
        });
    }
});