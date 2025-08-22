import { Button } from "../ui/button";
import { useState } from "react";
import type { Action } from "@/type/product/product.type";
import clsx from "clsx";

type ManagementCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  actions: Action[];
};

export default function ManagementCard({
  title,
  description,
  icon: Icon,
  iconColor,
  iconBg,
  actions,
}: ManagementCardProps) {
  const [activeForm, setActiveForm] = useState<number | null>(null);

  const handleButtonClick = (index: number, hasForm: boolean) => {
    if (!hasForm) return;
    setActiveForm((prev) => (prev === index ? null : index)); // toggle
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 w-full max-w-md mx-auto md:max-w-lg transition-all">
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={clsx(
            "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
            iconBg
          )}
        >
          <Icon className={clsx("w-7 h-7", iconColor)} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {/* Actions & Forms */}
      <div className="space-y-3">
        {actions.map((action, i) => (
          <div key={i} className="relative">
            <Button
              className="w-full justify-start bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 rounded-lg"
              variant="outline"
              onClick={() => handleButtonClick(i, !!action.renderForm)}
            >
              <action.icon className="w-5 h-5 mr-3 text-slate-600 dark:text-slate-300" />
              {action.label}
              <span className="ml-auto">
                {/* Arrow icon rotating */}
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    activeForm === i ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </Button>

            {/* Smooth toggling form */}
            <div
              className={clsx(
                "overflow-hidden transition-all duration-300",
                activeForm === i ? "max-h-[2000px] mt-2" : "max-h-0"
              )}
            >
              {activeForm === i && action.renderForm && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-inner">
                  {action.renderForm(() => setActiveForm(null))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
