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
    <div className="bg-gray-50 p-4 rounded-lg">
      {sortedCodes.length === 0 ? (
        <p className="text-gray-500 italic">
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
                // <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-700">
                <h3
                  className={css({
                    fontSize: "lg",
                    fontWeight: "semibold",
                    mt: 4,
                    mb: 2,
                    color: "gray.700",
                    bgColor: "red",
                  })}
                >
                  {code.category}
                </h3>
              )}
              <li className="bg-white shadow-sm rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-indigo-600">
                      {code.code}
                    </span>
                    <p className="text-sm text-gray-500">
                      Expires:{" "}
                      {new Date(code.expiration_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {code.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onUseCode(code)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-150 ease-in-out"
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
