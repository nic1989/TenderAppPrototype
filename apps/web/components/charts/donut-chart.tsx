import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
    name: string,
    count: number
}

interface DonutChartProps {
  chartData: ChartProps[];
}

const COLORS: { [key: string]: string } = {
    'Active': '#00C49F',
    'Draft':'#0088FE',
    'Completed': '#FF8042',
    'Inactive': '#CC0000',
    'Recommended': '#00C49F',
    'Not Recommended': '#CC0000',
};

export default function DonutChart({chartData}: DonutChartProps) {
    const total = chartData.reduce((sum, item) => sum + item.count, 0);
    return (
        <>
            <ResponsiveContainer
                width="100%"
                height={250}
            >
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="count"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[entry.name]}
                            />
                        ))}
                    </Pie>
                    <text
                        x="50%"
                        y="48%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-2xl font-bold"
                        >
                        {total}
                    </text>

                    <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-muted-foreground text-sm"
                        >
                        Tenders
                    </text>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center-safe w-full gap-4">
                {chartData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                        <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: COLORS[item.name] }}
                        />
                        <span>{item.name}</span>
                        <span className="font-semibold">({item.count})</span>
                    </div>
                ))}
            </div>
        </>
    );
}