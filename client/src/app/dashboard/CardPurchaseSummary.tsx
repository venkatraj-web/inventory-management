import { useGetDashboardMetricsQuery } from '@/state/api';
import { TrendingDown, TrendingUp } from 'lucide-react';
import numeral from 'numeral';
import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CardPurchaseSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between row-span-2 min-[1260px]:max-[1290px]:row-span-4 min-[1299px]:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white rounded-2xl shadow-md ">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          {/* HEADER  */}
          <div>
            <h2 className="text-lg font-semibold px-7 pt-5 mb-2">
              Purchase Summary
            </h2>
            <hr />
          </div>

          {/* BODY  */}
          <div>
            {/* BODY HEADER  */}
            <div className="mb-4 px-7 mt-7">
              <p className="text-xs text-gray-400">Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format('$0.00a')
                    : '0'}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm flex ml-3 ${
                      lastDataPoint.changePercentage! >= 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    } `}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* CHART  */}
          <ResponsiveContainer width="100%" height={200} className="p-2">
            <AreaChart
              data={purchaseData}
              margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
            >
              <XAxis dataKey="date" tick={false} axisLine={false} />
              <YAxis tickLine={false} tick={false} axisLine={false} />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString('en')}`,
                ]}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                }}
              />
              <Area
                type="linear"
                dataKey="totalPurchased"
                stroke="#8884d8"
                fill="#8884d8"
                dot={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
