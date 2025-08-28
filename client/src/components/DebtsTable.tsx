import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { FaPlug, FaFire, FaPhoneAlt, FaTrash } from "react-icons/fa";

type Payment = {
  id: number;
  name: string;
  icon: React.ReactElement;
  dueDate: string;
  autoPay: string;
  amount: string;
  checked: boolean;
};

const initialPayments: Payment[] = [
  {
    id: 1,
    name: "Сметка за ток (офис)",
    icon: <FaPlug className="text-white" />,
    dueDate: "20/01/2015",
    autoPay: "Не",
    amount: "25.00 BGN",
    checked: false,
  },
  {
    id: 2,
    name: "Сметка за парно (офис)",
    icon: <FaFire className="text-white" />,
    dueDate: "20/01/2015",
    autoPay: "Не",
    amount: "22 500.00 BGN",
    checked: true,
  },
  {
    id: 3,
    name: "Vivacom (Личен GSM)",
    icon: <FaPhoneAlt className="text-white" />,
    dueDate: "18/01/2015",
    autoPay: "Да",
    amount: "70.00 BGN",
    checked: true,
  },
  {
    id: 4,
    name: "Такса смет",
    icon: <FaTrash className="text-white" />,
    dueDate: "31/12/2014",
    autoPay: "N/a",
    amount: "36.45 BGN",
    checked: true,
  },
];

const PaymentsTable: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const [payments, setPayments] = useState(initialPayments);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setPayments((prev) =>
      prev.map((p) => ({ ...p, checked: newSelectAll }))
    );
  };

  const toggleOne = (id: number) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  };

  return (
    <section className="hidden lg:block border my-5 border-gray-300 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
        <h2 className="text-xl pl-4 py-3 font-semibold flex items-center uppercase">
          {t("pendingPayments")}
        </h2>
        <div className="flex items-stretch">
          <a
            href="#"
            className="flex items-center px-3 border-l border-gray-300 hover:text-blue-800 text-base"
          >
            {t("seeAll")} &gt;
          </a>
          <div className="relative group flex items-center hover:text-blue-800 cursor-pointer text-gray-700 justify-center border-l border-gray-300 w-12">
            <button>
              <IoIosSettings className="text-xl cursor-pointer" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white text-black font-semibold border border-gray-300 text-md px-2 py-1 whitespace-nowrap z-10 uppercase">
              {t("settings")}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase">
              <th className="border-b border-gray-300 p-3 text-left w-10">
                <input type="checkbox" className="w-4 h-4" checked={selectAll} onChange={toggleSelectAll} />
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("name")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("toDate")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("autoPay")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("amount")}
              </th>
              <th className="border-b border-gray-300 p-3"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="odd:bg-white even:bg-gray-50 text-md">
                <td className="p-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    checked={p.checked}
                    onChange={() => toggleOne(p.id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-3 border-b border-gray-200 flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      p.id === 1
                        ? "bg-yellow-500"
                        : p.id === 2
                        ? "bg-red-600"
                        : p.id === 3
                        ? "bg-blue-600"
                        : "bg-green-600"
                    }`}
                  >
                    {p.icon}
                  </div>
                  <span className="text-gray-800">{p.name}</span>
                </td>
                <td className="p-3 border-b border-l border-gray-200">{p.dueDate}</td>
                <td className="p-3 border-b border-l border-gray-200">{p.autoPay}</td>
                <td className="p-3 border-b border-l border-gray-200 text-red-600">
                  {p.amount}
                </td>
                <td className="p-3 border-b border-gray-200 text-gray-500 text-lg">
                  ⋮
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Button */}
      <div className="p-4 bg-white">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-1 text-lg">
          {t("pay")} &gt;
        </button>
      </div>
    </section>
  );
};

export default PaymentsTable;