import React from 'react';
import {
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

import {

} from 'recharts';

import './styles.css';

const petsCadastrados = [
  { name: 'Dog', value: 50 },
  { name: 'Cat', value: 20 },
];

const petsGender = [
  { name: 'Male', value: 30 },
  { name: 'Female', value: 20 },
];

const data = [
  {
    subject: 'Math', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Chinese', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'English', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Geography', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'Physics', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'History', A: 65, B: 85, fullMark: 150,
  },
];



const COLORS = ['#F67280', '#118696', '#666'];

export default function DashBoard() {

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, name, index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill={COLORS[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${name}`}
      </text>
    );
  };

  return (
    <div className="dashBord-container">
      <div className="dashboard-header">
        <p>200</p>
        <p>Pets cadastrados</p>
      </div>

      <PieChart width={250} height={600} onMouseEnter={() => { }}>


        <text x={95} y={130} fill="#333">Specie</text>
        <Pie
          data={petsCadastrados}
          cx={110}
          cy={120}
          innerRadius={50}
          outerRadius={60}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            petsCadastrados.map((entry, index) => (
              <Cell key={`cell - ${index} `} fill={COLORS[index % COLORS.length]} />
            ))
          }

        </Pie>


        <text x={90} y={310} fill="#333">Gender</text>
        <Pie
          data={petsGender}
          cx={110}
          cy={300}
          innerRadius={50}
          outerRadius={60}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            petsGender.map((entry, index) => (
              <Cell key={`cell - ${index} `} fill={COLORS[index % COLORS.length]} />
            ))
          }

        </Pie>
      </PieChart>

      <text x={100} y={500} fill="#333">Size</text>
      <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Mike" dataKey="A" stroke="#F67280" fill="#F67280" fillOpacity={0.6} />
        <Radar name="Lily" dataKey="B" stroke="#118696" fill="#118696" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </div>
  );
}

