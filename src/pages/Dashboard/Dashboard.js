// src/Dashboard.js
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Cores para o gráfico de pizza
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const [vendas, setVendas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [kpis, setKpis] = useState({
    totalVendas: 0,
    clientesAtivos: 0,
    ticketMedio: 0,
  });

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
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Painel lateral */}
      <nav className="bg-dark text-white p-3" style={{ width: "220px", minHeight: "100vh" }}>
        <h4 className="mb-4">Painel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Início</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Perfil</a>
          </li>
          <li className="nav-item mb-2">
            <a className="nav-link text-white" href="#">Configurações</a>
          </li>
        </ul>
      </nav>

      {/* Conteúdo principal */}
      <div className="flex-grow-1">
        {/* Header */}
        <header className="bg-primary text-white p-3">
          <h2>Dashboard CRM</h2>
        </header>
        <main className="p-4">
          {/* KPIs */}
          <div className="d-flex gap-3 mb-4 flex-wrap">
            <div className="card text-center flex-fill" style={{ minWidth: "150px", maxWidth: "220px" }}>
              <div className="card-body">
                <h5 className="card-title">Total de Vendas</h5>
                <p className="card-text fs-4">{kpis.totalVendas}</p>
              </div>
            </div>
            <div className="card text-center flex-fill" style={{ minWidth: "150px", maxWidth: "220px" }}>
              <div className="card-body">
                <h5 className="card-title">Clientes Ativos</h5>
                <p className="card-text fs-4">{kpis.clientesAtivos}</p>
              </div>
            </div>
            <div className="card text-center flex-fill" style={{ minWidth: "150px", maxWidth: "220px" }}>
              <div className="card-body">
                <h5 className="card-title">Ticket Médio</h5>
                <p className="card-text fs-4">{kpis.ticketMedio}</p>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="d-flex gap-5 flex-wrap">
            <div>
              <LineChart width={500} height={300} data={vendas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="#8884d8" />
              </LineChart>
            </div>
            <div>
              <PieChart width={300} height={300}>
                <Pie
                  data={categorias}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categorias.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
