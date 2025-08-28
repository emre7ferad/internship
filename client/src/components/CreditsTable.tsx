import React, { useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type Credit = {
  id: number;
  name: string;
  amount: string;
  currency: string;
  interest: string;
  dueInstallment: string;
  dueDate: string;
  maturity: string;
  checked: boolean;
};

const initialCredits: Credit[] = [
  {
    id: 1,
    name: "Потребителски кредит",
    amount: "10 000.00",
    currency: "BGN",
    interest: "7.70%",
    dueInstallment: "200.00",
    dueDate: "05/02/2015",
    maturity: "05/12/2018",
    checked: false,
  },
  {
    id: 2,
    name: 'Жилищен кредит "Право на избор"',
    amount: "300 000.00",
    currency: "EUR",
    interest: "5.80%",
    dueInstallment: "2 200.00",
    dueDate: "25/01/2015",
    maturity: "05/03/2030",
    checked: true,
  },
  {
    id: 3,
    name: "Супер кредит",
    amount: "150 000.00",
    currency: "USD",
    interest: "6.50%",
    dueInstallment: "2 662.00",
    dueDate: "30/01/2015",
    maturity: "05/07/2020",
    checked: true,
  },
];

const CreditsTable: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const [credits, setCredits] = useState(initialCredits);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCredits((prev) => prev.map((c) => ({ ...c, checked: newSelectAll })));
  };

  const toggleOne = (id: number) => {
    setCredits((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  return (
    <section className="hidden lg:block border my-5 border-gray-300 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-stretch border-b border-gray-300 bg-white">
        <h2 className="text-xl pl-4 py-3 font-semibold flex items-center uppercase">
          {t("credits")}
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
        <table className="w-full border-collapse text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase">
              <th className="border-b border-gray-300 p-3 text-left w-10">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("type")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("currency")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("interest")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("installment")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("dueDate")}
              </th>
              <th className="border-b border-gray-300 p-3 text-left">
                {t("maturity")}
              </th>
            </tr>
          </thead>
          <tbody>
            {credits.map((c) => (
              <tr key={c.id} className="odd:bg-white even:bg-gray-50 text-md">
                <td className="p-3 border-b border-gray-200">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={c.checked}
                    onChange={() => toggleOne(c.id)}
                  />
                </td>
                <td className="p-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-blue-800 text-white">
                    <FaHandHoldingUsd />
                  </div>
                  <span className="text-gray-800">{c.name}</span>
                </td>
                <td className="p-3 border-b border-l border-gray-200">{c.currency}</td>
                <td className="p-3 border-b border-l border-gray-200">{c.interest}</td>
                <td className="p-3 border-b border-l border-gray-200 text-red-600">
                  {c.dueInstallment}
                </td>
                <td className="p-3 border-b border-l border-gray-200">{c.dueDate}</td>
                <td className="p-3 border-b border-l border-gray-200">{c.maturity}</td>
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

export default CreditsTable;
