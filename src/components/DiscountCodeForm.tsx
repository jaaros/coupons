"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { css } from "../../styled-system/css";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700"
        >
          Discount Code
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter discount code"
          required
          className={css({
            mt: 1,
            px: 3,
            py: 2,
            bgColor: "white",
            border: 1,
            borderColor: "gray.300",
            blockSize: 1,
            rounded: "md",
            shadow: "sm",
          })}
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className={css({ blockSize: 1, fontSize: "sm", color: "gray.700" })}
        >
          Category
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          required
          className={css({
            mt: 1,
            blockSize: 1,
            width: "full",
            px: 3,
            py: 2,
            bgColor: "white",
            border: 1,
            borderColor: "gray.300",
            rounded: "md",
            shadow: "sm",
          })}
        />
      </div>
      <div>
        <label
          htmlFor="expirationDate"
          className={css({ blockSize: 1, fontSize: "sm", color: "gray.700" })}
        >
          Expiration Date
        </label>
        <input
          id="expirationDate"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          required
          className={css({
            mt: 1,
            blockSize: 1,
            width: "full",
            px: 3,
            py: 2,
            bgColor: "white",
            border: 1,
            borderColor: "gray.300",
            rounded: "sm",
            shadow: "sm",
          })}
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className={css({ blockSize: 1, fontSize: "sm", color: "gray.700" })}
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className={css({
            mt: 1,
            blockSize: 1,
            width: "full",
            px: 3,
            py: 2,
            bgColor: "white",
            border: 1,
            borderColor: "gray.300",
            rounded: "md",
            shadow: "sm",
          })}
        />
      </div>
      <button
        type="submit"
        className={css({
          width: "full",
          py: 2,
          px: 4,
          border: 1,
          rounded: "sm",
          shadow: "sm",
          fontSize: "sm",
          color: "white",
          bgColor: "indigo.600",
        })}
      >
        Add Discount Code
      </button>
    </form>
  );
}
