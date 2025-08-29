// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

// Cores para o gráfico de pizza
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [vendas, setVendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [kpis, setKpis] = useState({ totalVendas: 0, clientesAtivos: 0, ticketMedio: 0 });

  // Simulando fetch de API do CRM
  useEffect(() => {
    const fetchData = async () => {
      // Dados de vendas por mês
      setVendas([
        { mes: "Jan", vendas: 4000 },
        { mes: "Fev", vendas: 3000 },
        { mes: "Mar", vendas: 5000 },
        { mes: "Abr", vendas: 2000 },
      ]);

      // Dados de vendas por categoria
      setCategorias([
        { name: "Eletrônicos", value: 400 },
        { name: "Roupas", value: 300 },
        { name: "Alimentos", value: 300 },
        { name: "Outros", value: 200 },
      ]);

      // KPIs gerais
      setKpis({ totalVendas: 14500, clientesAtivos: 328, ticketMedio: 289 });
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard CRM</h1>

      {/* KPIs */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <div style={cardStyle}>
          <h3>Total de Vendas</h3>
          <p>{kpis.totalVendas}</p>
        </div>
        <div style={cardStyle}>
          <h3>Clientes Ativos</h3>
          <p>{kpis.clientesAtivos}</p>
        </div>
        <div style={cardStyle}>
          <h3>Ticket Médio</h3>
          <p>{kpis.ticketMedio}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        <LineChart width={500} height={300} data={vendas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="vendas" stroke="#8884d8" />
        </LineChart>

        <PieChart width={300} height={300}>
          <Pie data={categorias} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {categorias.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

// Estilo simples para os cards
const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "20px",
  minWidth: "150px",
  textAlign: "center",
};
