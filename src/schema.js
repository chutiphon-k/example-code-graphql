import TodosList from './data/todos'
//import data

import {
  // GraphQL types
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLBoolean,

  //create the schema
  GraphQLSchema
} from 'graphql';

const Todo = new GraphQLObjectType({
  name: "Todo",
  description: "Todo list",
  fields: () => ({
    _id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    completed: {type: GraphQLBoolean}
  })
})

const Mutation = new GraphQLObjectType({
  name: "TodoMutations",
  fields: {
    createTodo:{
      type: Todo,
      description: "Create a new todo items",
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        completed: {type: GraphQLBoolean}
      },
      resolve: function(source, {...args}){
        let todo = args
        console.log(args)
        todo._id = "cid-" + Math.ceil(Math.random() * 99999999)
        if(!todo.completed){
          todo.completed = false
        }

        TodosList.push(todo)
        return todo

      }
    }
  }
})


const Query = new GraphQLObjectType({
  name: 'TodoSchema',
  description: 'Root Schema',
  fields: () => ({
    todos: {
      type: new GraphQLList(Todo),
      resolve: function () {
        return TodosList
      }
    },
    todos2: {
      type: new GraphQLList(Todo),
      resolve: function () {
        return TodosList
      }
    }

  })
});

// The Schema
const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
