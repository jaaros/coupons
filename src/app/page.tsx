import styles from "./page.module.css";
import DiscountCodeManager from "../components/DiscountCodeManager";
import { css } from "../../styled-system/css";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div
        className={css({
          minHeight: "100vh",
          padding: "2rem",
          backgroundColor: "blue.50",
        })}
      >
        <DiscountCodeManager />
      </div>
    </div>
  );
}
