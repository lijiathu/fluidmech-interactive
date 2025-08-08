import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FluidMechApp = () => {
  const [velocity, setVelocity] = useState(10); // 初始速度设置为10 m/s
  const [dragCoefficient, setDragCoefficient] = useState(0.47); // 默认圆球阻力系数为 0.47

  // 计算力学公式中的阻力
  const calculateDragForce = (velocity, dragCoefficient) => {
    const density = 1000; // 水的密度（kg/m³）
    const area = Math.PI * Math.pow(0.1 / 2, 2); // 圆球的截面积，假设直径为 0.1 米
    return 0.5 * density * Math.pow(velocity, 2) * dragCoefficient * area;
  };

  const dragForce = calculateDragForce(velocity, dragCoefficient);

  // 模拟不同速度下的阻力数据
  const data = Array.from({ length: 50 }, (_, i) => {
    const vel = i + 1; // 速度从 1 m/s 到 50 m/s
    return {
      velocity: vel,
      dragForce: calculateDragForce(vel, dragCoefficient),
    };
  });

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-4">流体力学基本方程</h1>
      <p className="mb-4">此应用通过不同速度下的阻力计算来展示流体力学的基本原理。</p>

      <div className="mb-4">
        <label htmlFor="velocity" className="mr-2">速度 (m/s):</label>
        <input
          type="number"
          id="velocity"
          value={velocity}
          onChange={(e) => setVelocity(Number(e.target.value))}
          className="p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dragCoefficient" className="mr-2">阻力系数 (Cd):</label>
        <input
          type="number"
          id="dragCoefficient"
          step="0.01"
          value={dragCoefficient}
          onChange={(e) => setDragCoefficient(Number(e.target.value))}
          className="p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">计算的阻力: {dragForce.toFixed(2)} N</h2>
      </div>

      <div className="w-full" style={{ height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="velocity" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="dragForce" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="text-lg">物理含义：</h3>
        <p>该图展示了速度与阻力之间的关系，速度越大，流体的阻力（Drag Force）越大。</p>
      </div>
    </div>
  );
};

export default FluidMechApp;
