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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Discount Code Manager
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add New Code
          </h2>
          <DiscountCodeForm onCodeAdded={fetchDiscountCodes} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Available Codes
          </h2>
          <DiscountCodeList codes={discountCodes} onUseCode={handleUseCode} />
        </div>
      </div>
    </div>
  );
}
