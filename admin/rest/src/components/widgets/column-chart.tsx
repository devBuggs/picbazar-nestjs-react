import Chart from '@/components/ui/chart';
import cn from 'classnames';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ArrowDown } from '@/components/icons/arrow-down';

const BarChart = ({
  widgetTitle,
  series,
  colors,
  prefix,
  totalValue,
  text,
  position,
  percentage,
  categories,
}: any) => {
  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '65%',
          endingShape: 'flat',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
      },
      grid: {
        borderColor: '#F7F7F7',
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: colors,
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: categories,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
    },
    series: [
      {
        name: 'Sale',
        data: series,
      },
    ],
  };

  return (
    <div className="h-full w-full rounded bg-light shadow-sm">
      <div className="flex items-center justify-between p-8">
        <h3 className="text-sm text-heading">{widgetTitle}</h3>

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-green-500">
            {prefix}
            {totalValue}
          </span>

          <div className="flex items-center">
            {position === 'up' && (
              <span className="text-green-500">
                <ArrowUp />
              </span>
            )}
            {position === 'down' && (
              <span className="text-red-400">
                <ArrowDown />
              </span>
            )}
            <span className="ms-1 text-sm text-heading">
              <span
                className={cn(
                  position === 'down' ? 'text-red-400' : 'text-green-500'
                )}
              >
                {percentage}
              </span>
              &nbsp;
              {text}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap" style={{ display: 'block' }}>
        <Chart
          options={options.options}
          series={options.series}
          height="350"
          width="100%"
          type="bar"
        />
      </div>
    </div>
  );
};

export default BarChart;
