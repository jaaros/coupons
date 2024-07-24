import Image from "next/image";
import styles from "./page.module.css";
import DiscountCodeManager from "../components/DiscountCodeManager";
import Link from "next/link";
import { css } from "../../styled-system/css";

export default function Home() {
  return (
    <div>
      <div
        className={css({
          minHeight: "100vh",
          padding: "2rem",
          backgroundColor: "blue.100",
        })}
      >
        <h1>Discount Code Manager</h1>
        <p className={styles.subtitle}>
          Manage your discount codes efficiently
        </p>
        <DiscountCodeManager />
      </div>
    </div>
  );
}
