"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Props {
  onCodeAdded: () => void;
}

export default function DiscountCodeForm({ onCodeAdded }: Props) {
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("discount_codes").insert({
      code,
      category,
      expiration_date: expirationDate,
      description,
    });

    if (error) {
      console.error("Error inserting discount code:", error);
    } else {
      setCode("");
      setCategory("");
      setExpirationDate("");
      setDescription("");
      onCodeAdded();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Discount Code"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Discount Code
      </button>
    </form>
  );
}
