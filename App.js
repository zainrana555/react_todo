import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header'
import TodoItem from './components/todoItem'
import AddTodo from './components/addTodos'
import Sandbox from './components/sandbox'


export default function App() {
  const [todos, setTodos] = useState([
    { text: 'buy coffee', key: '1' },
    { text: 'create an app', key: '2' },
    { text: 'play on the twitch', key: '3' }
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {

    text.length > 2 ? setTodos((prevTodos) => {
      return [
        { text: text, key: Math.random().toString() },
        ...prevTodos
      ];
    }) : Alert.alert('OOPS!', 'Todo must be of atleast 3 characters', [
      {text: 'Got it', onPress: () => console.log('alert closed')}
    ]);
  }

  return (
    // <Sandbox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={styles.container}>
        <Header />
        
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />

          <View style={styles.list}>

            <FlatList
            data={todos}
            renderItem={({ item }) => (
            <TodoItem item={item} pressHandler={pressHandler} />
            )} 
            />

          </View>

        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex:1,
    padding: 40,
    paddingHorizontal: 30,
    paddingBottom: 15,
  },
  list: {
    flex: 1,
    marginTop: 20,
  }
});
