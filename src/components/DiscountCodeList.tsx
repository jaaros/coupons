interface DiscountCode {
  id: number;
  code: string;
  category: string;
  expiration_date: string;
}

interface Props {
  codes: DiscountCode[];
}

export default function DiscountCodeList({ codes }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Discount Codes (Sorted by Expiration Date)
      </h2>
      <ul className="space-y-2">
        {codes.map((code) => (
          <li key={code.id} className="border p-2 rounded">
            <strong>{code.code}</strong> - {code.category} - Expires:{" "}
            {new Date(code.expiration_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
