<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <input class="new-todo" autocomplete="off" placeholder="添加 待办事项" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all"/>
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in list"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
       todo left
      </span>
      <ul class="filters">
        <li><a :class="{ selected: visibility === 'active' }" @click.prevent="getList('active')">正在执行</a></li>
        <li><a :class="{ selected: visibility === 'completed' }" @click.prevent="getList('completed')">已完成</a></li>
<!--        <li v-for="(val, key) in filters" :key="key">-->
<!--          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>-->
<!--        </li>-->
      </ul>
    </footer>
  </section>
</template>

<script>
    import Todo from './Todo.vue'
    import {addTodoTask, getTodoTasksNoPage, editTodoTask, delTodoTask} from '@/api/todoTask'

    export default {
        components: {Todo},
        data() {
            return {
                visibility: 'active',
                // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
                list: null,
                status: null,
            }
        },
        computed: {
            remaining() {
                if (this.list !== null) {
                    if (this.visibility === 'active') {
                        return this.list.filter(todo => todo.status === 1).length
                    } else {
                        return this.list.filter(todo => todo.status === 2).length
                    }
                }
            }
        },
        created() {
          this.getList(this.visibility);
        },
        methods: {
            getList(type) {
                this.visibility = type;
                if (type === 'active') {
                    this.status = 1;
                } else if (type === 'completed') {
                    this.status = 2;
                }
                getTodoTasksNoPage({status: this.status}).then((res) => {
                    this.list = res.data;
                })
            },
            addTodo(e) {
                const text = e.target.value;
                if (text.trim()) {
                    addTodoTask({title: text, status: 1}).then((res) => {
                        this.$notify({
                            title: '待办事项',
                            message: res.message,
                            position: 'bottom-right'
                        });

                        this.getList('active');
                    });
                }

                e.target.value = ''
            },
            toggleTodo(val) {
                this.status = val.status === 1?2:1;
                editTodoTask({status: this.status, id: val.id}).then((res) => {
                    this.$notify({
                        title: '待办事项',
                        message: res.message,
                        position: 'bottom-right'
                    });

                    this.getList('active');
                })
            },
            deleteTodo(todo) {
                delTodoTask(todo.id).then((res) => {
                    this.$notify({
                        title: '待办事项',
                        message: res.message,
                        position: 'bottom-right'
                    });
                    if (todo.status === 1) {
                        this.getList('active');
                    } else {
                        this.getList('completed');
                    }
                });
            },
            editTodo({todo, value}) {
                todo.title = value;
                editTodoTask(todo).then((res) => {
                    this.$notify({
                        title: '待办事项',
                        message: res.message,
                        position: 'bottom-right'
                    });

                    this.getList('active');
                })
            },
        }
    }
</script>

<style lang="scss">
  @import './index.scss';
</style>
