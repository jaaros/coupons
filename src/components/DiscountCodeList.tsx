import React from "react";

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
    <div>
      <h2 className="text-xl font-bold mb-4">
        Available Discount Codes (Sorted by Category and Expiration Date)
      </h2>
      {sortedCodes.length === 0 ? (
        <p>No available discount codes at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {sortedCodes.map((code, index, array) => (
            <React.Fragment key={code.id}>
              {(index === 0 || code.category !== array[index - 1].category) && (
                <h3 className="text-lg font-semibold mt-4 mb-2">
                  {code.category}
                </h3>
              )}
              <li className="border p-2 rounded flex justify-between items-center">
                <div>
                  <strong>{code.code}</strong> - Expires:{" "}
                  {new Date(code.expiration_date).toLocaleDateString()} -
                  Description: <em>{code.description}</em>
                </div>
                <button
                  onClick={() => onUseCode(code)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4"
                >
                  Use
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
