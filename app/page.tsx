"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [tables, setTables] = useState<any[]>([]);
    const [form, setForm] = useState({
        reserve_date: "",
        id: "",
        peopleCount: 1,
        reserver: "",
        phone: ""
    });

    const fetchTables = async () => {
        const res = await fetch("/api/tables");
        const data = await res.json();
        setTables(data);
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "reserve_date") {
            const formatted = value.replaceAll("-", "");
            setForm(prev => ({ ...prev, [name]: formatted }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/reserve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            alert("Бронь успешно создана!");
        } else {
            const error = await res.text();
            alert(`Ошибка: ${error}`);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 p-4 flex items-center justify-center">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 animate-fade-in">
                <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Бронирование стола</h1>
                <img src="/schema.jpg" alt="схема" className="rounded-lg mb-6 shadow-md" />
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Дата:</label>
                        <input
                            type="date"
                            name="reserve_date"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Стол:</label>
                        <select
                            name="id"
                            value={form.id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        >
                            <option value="">Выберите стол</option>
                            {tables.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.number}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Кол-во человек:</label>
                        <input
                            type="number"
                            name="peopleCount"
                            value={form.peopleCount}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            min={1}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Имя:</label>
                        <input
                            type="text"
                            name="reserver"
                            value={form.reserver}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Телефон:</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    >
                        Забронировать
                    </button>
                </form>
            </div>
        </main>
    );
}
