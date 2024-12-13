import React, { useState, useEffect } from 'react';
    import { useAuth } from './AuthContext.jsx';
    import { db } from './firebase.js';
    import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, where, setDoc } from 'firebase/firestore';

    function App() {
      const { user, logout } = useAuth();
      const [todos, setTodos] = useState([]);
      const [input, setInput] = useState('');
      const [editIndex, setEditIndex] = useState(null);
      const [itemCount, setItemCount] = useState(0);
      const [paymentRequired, setPaymentRequired] = useState(false);

      useEffect(() => {
        if (user) {
          const q = query(collection(db, 'todos'), where('userId', '==', user.uid));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTodos(todosData);
            setItemCount(todosData.length);
          });
          return unsubscribe;
        }
      }, [user]);

      const addTodo = async (e) => {
        e.preventDefault();
        if (input.trim()) {
          if (itemCount >= 5 && !paymentRequired) {
            setPaymentRequired(true);
            return;
          }
          if (editIndex !== null) {
            const todoRef = doc(db, 'todos', todos[editIndex].id);
            await updateDoc(todoRef, { text: input });
            setEditIndex(null);
          } else {
            await addDoc(collection(db, 'todos'), {
              text: input,
              completed: false,
              userId: user.uid
            });
          }
          setInput('');
        }
      };

      const removeTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
      };

      const editTodo = (index) => {
        setInput(todos[index].text);
        setEditIndex(index);
      };

      const toggleComplete = async (id, completed) => {
        const todoRef = doc(db, 'todos', id);
        await updateDoc(todoRef, { completed: !completed });
      };

      const handlePayment = async (paymentMethod) => {
        // Implement payment logic here
        // For example, redirect to a payment gateway
        // After successful payment, update the user's status
        if (paymentMethod === 'gpay') {
          window.location.href = 'upi://pay?pa=your-upi-id@oksbi&pn=ToDoApp&mc=1234&tid=123456789&tr=123456789&tn=Payment+for+ToDoApp&am=100&cu=INR&url=https://your-app-url.com';
        } else if (paymentMethod === 'phonepe') {
          window.location.href = 'phonepe://pay?pa=your-upi-id@ybl&pn=ToDoApp&mc=1234&tid=123456789&tr=123456789&tn=Payment+for+ToDoApp&am=100&cu=INR&url=https://your-app-url.com';
        }
        await setDoc(doc(db, 'users', user.uid), { paid: true });
        setPaymentRequired(false);
      };

      return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
          <header className="w-full max-w-md mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">To-Do List</h1>
            <button onClick={logout} className="mt-4 w-full bg-red-500 text-white py-2 rounded shadow">
              Logout
            </button>
          </header>
          <main className="w-full max-w-md bg-white p-6 rounded shadow">
            {paymentRequired ? (
              <div>
                <p>You have reached the limit of 5 items. Please make a payment to continue using the app.</p>
                <button onClick={() => handlePayment('gpay')} className="mt-4 w-full bg-green-500 text-white py-2 rounded shadow">
                  Pay with Google Pay
                </button>
                <button onClick={() => handlePayment('phonepe')} className="mt-4 w-full bg-blue-500 text-white py-2 rounded shadow">
                  Pay with PhonePe
                </button>
              </div>
            ) : (
              <form onSubmit={addTodo} className="mb-4 flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add a new task"
                  className="flex-1 p-2 border border-gray-300 rounded mr-2"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </form>
            )}
            <ul>
              {todos.map((todo, index) => (
                <li key={todo.id} className="p-2 border-b border-gray-300 flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id, todo.completed)}
                      className="mr-2"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.text}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-yellow-500 text-white rounded" onClick={() => editTodo(index)}>
                      Edit
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded" onClick={() => removeTodo(todo.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      );
    }

    export default App;
