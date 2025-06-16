import { LucideIcon } from 'lucide-react';
import React, { JSX } from 'react';

type StatDetails = {
  title: string;
  amount: string;
  changePercentage: number;
  iconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetails[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? '+' : '';
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl col-span-1 flex flex-col justify-between">
      {/* HEADER  */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>

      {/* BODY  */}
      <div className="flex justify-around items-center px-5 gap-4 mb-6">
        <div className="rounded-full bg-blue-50 p-5 border-[1px] border-sky-300">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-between items-center my-4">
                <span className="text-gray-500">{detail.title}</span>
                <span className="font-bold text-gray-800">{detail.amount}</span>
                <div className="flex items-center">
                  <detail.iconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
