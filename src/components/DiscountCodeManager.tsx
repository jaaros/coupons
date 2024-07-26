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
  description: string;
  used_at: string | null;
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

  const handleUseCode = async (code: DiscountCode) => {
    if (code.used_at) {
      console.log(`Code ${code.code} has already been used at ${code.used_at}`);
      return;
    }

    const now = new Date().toISOString();
    const { error } = await supabase
      .from("discount_codes")
      .update({ used_at: now })
      .eq("id", code.id);

    if (error) {
      console.error("Error updating code usage:", error);
    } else {
      console.log(`Code ${code.code} used at ${now}`);
      // Refresh the list to reflect the updated state
      fetchDiscountCodes();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Discount Code Manager</h1>
      <DiscountCodeForm onCodeAdded={fetchDiscountCodes} />
      <DiscountCodeList codes={discountCodes} onUseCode={handleUseCode} />
    </div>
  );
}
