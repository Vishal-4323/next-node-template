"use client";

import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState<{ _id: string; name: string }[]>([]);
    const [newItem, setNewItem] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/items', { name: newItem });
            setItems((prevItems) => [...prevItems, response.data]);
            setNewItem('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
            <h1>Items</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {items.map(item => (
                        <li key={item._id}>{item.name}</li>
                    ))}
                </ul>
            )}
            <form onSubmit={addItem}>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add a new item"
                    required
                />
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default Home;

