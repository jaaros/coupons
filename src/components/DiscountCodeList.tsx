import React from "react";
import { css } from "../../styled-system/css";

interface DiscountCode {
  id: number;
  code: string;
  category: string;
  expiration_date: string;
  description: string;
  used_at: string | null;
}

interface Props {
  codes: DiscountCode[];
  onUseCode: (code: DiscountCode) => void;
}

export default function DiscountCodeList({ codes, onUseCode }: Props) {
  // Filter out used codes
  const unusedCodes = codes.filter((code) => !code.used_at);

  // Sort by category and then by expiration date
  const sortedCodes = unusedCodes.sort((a, b) => {
    // First, sort by category
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;

    // If categories are the same, sort by expiration date
    return (
      new Date(a.expiration_date).getTime() -
      new Date(b.expiration_date).getTime()
    );
  });

  return (
    <div className={css({ bgColor: "gray.50", p: 4, rounded: "lg" })}>
      {sortedCodes.length === 0 ? (
        <p className={css({ color: "gray.500", fontStyle: "italic" })}>
          No available discount codes at the moment.
        </p>
      ) : (
        <ul
          className={css({
            spaceY: 4,
          })}
        >
          {sortedCodes.map((code, index, array) => (
            <React.Fragment key={code.id}>
              {(index === 0 || code.category !== array[index - 1].category) && (
                <h3
                  className={css({
                    fontSize: "lg",
                    fontWeight: "semibold",
                    mt: 4,
                    mb: 2,
                    color: "gray.700",
                  })}
                >
                  {code.category}
                </h3>
              )}
              <li className="bg-white shadow-sm rounded-md p-4">
                <div
                  className={css({
                    flex: "1",
                    justifyContent: "space-between",
                    alignItems: "center",
                  })}
                >
                  <div>
                    <span
                      className={css({
                        fontWeight: "bold",
                        color: "indigo.600",
                      })}
                    >
                      {code.code}
                    </span>
                    <p
                      className={css({
                        fontSize: "sm",
                        color: "grey.500",
                      })}
                    >
                      Expires:{" "}
                      {new Date(code.expiration_date).toLocaleDateString()}
                    </p>
                    <p
                      className={css({
                        fontSize: "sm",
                        color: "gray.700",
                        mt: 1,
                        fontStyle: "italic",
                      })}
                    >
                      {code.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onUseCode(code)}
                    className={css({
                      bgColor: "green.500",
                      color: "white",
                      fontWeight: "bold",
                      py: 2,
                      px: 4,
                      rounded: "full",
                      transition: "ease-out",
                      transitionDuration: "0.15s",
                    })}
                  >
                    Use
                  </button>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
