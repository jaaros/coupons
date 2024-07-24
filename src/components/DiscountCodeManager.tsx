"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import DiscountCodeForm from "./DiscountCodeForm";
import DiscountCodeList from "./DiscountCodeList";

interface DiscountCode {
  id: number;
  code: string;
  category: string;
  expiration_date: string;
}

export default function DiscountCodeManager() {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);

  useEffect(() => {
    fetchDiscountCodes();
  }, []);

  async function fetchDiscountCodes() {
    const { data, error } = await supabase
      .from("discount_codes")
      .select("*")
      .order("expiration_date", { ascending: true });

    if (error) {
      console.error("Error fetching discount codes:", error);
    } else {
      setDiscountCodes(data || []);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Discount Code Manager</h1>
      <DiscountCodeForm onCodeAdded={fetchDiscountCodes} />
      <DiscountCodeList codes={discountCodes} />
    </div>
  );
}
