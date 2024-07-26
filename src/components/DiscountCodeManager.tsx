"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import DiscountCodeForm from "./DiscountCodeForm";
import DiscountCodeList from "./DiscountCodeList";
import { css } from "../../styled-system/css";

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
    <div
      className={css({
        maxWidth: "4xl",
        mx: "auto",
        p: 6,
        bgColor: "white",
        shadow: "lg",
        rounded: "lg",
      })}
    >
      <h1
        className={css({
          fontSize: "3xl",
          fontWeight: "bold",
          mb: 8,
          textAlign: "center",
          color: "gray.800",
        })}
      >
        Discount Code Manager
      </h1>
      <div className={css({ grid: "md", gap: 8 })}>
        <div>
          <h2
            className={css({
              fontSize: "xl",
              fontStyle: "semibold",
              mb: 4,
              color: "gray.700",
            })}
          >
            Add New Code
          </h2>
          <DiscountCodeForm onCodeAdded={fetchDiscountCodes} />
        </div>
        <div>
          <h2
            className={css({
              fontSize: "xl",
              fontStyle: "semibold",
              mb: 4,
              color: "gray.700",
            })}
          >
            Available Codes
          </h2>
          <DiscountCodeList codes={discountCodes} onUseCode={handleUseCode} />
        </div>
      </div>
    </div>
  );
}
