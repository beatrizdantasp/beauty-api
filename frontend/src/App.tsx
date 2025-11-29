import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './api';
import { z } from 'zod'; 

const bookingSchema = z.object({
  cliente_nome: z.string().min(3, "O nome deve ter pelo menos 3 letras."),
  cliente_whatsapp: z.string().min(10, "WhatsApp inválido (mínimo 10 números)."),
  data_agendamento: z.string().min(1, "Selecione uma data."),
  horario: z.string().min(1, "Selecione um horário."),
  servico_id: z.number()
});

function App() {
  const [view, setView] = useState('home'); 
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [editingService, setEditingService] = useState<any>(null);

  const fetchServices = () => {
    api.get('/servicos')
      .then((response: any) => setServices(response.data))
      .catch((error: any) => console.error("Erro ao buscar serviços:", error));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const loadAppointments = (senhaSalva?: string) => {
    const senha = senhaSalva || prompt("🔒 Área Restrita\nDigite a senha de administrador:");
    if (!senha) return;

    api.get('/agendamentos', { headers: { 'x-senha-admin': senha } })
    .then((response: any) => {
      setAppointments(response.data);
      setAdminPassword(senha);
      setView('admin');
      setEditingService(null);
    })
    .catch((error: any) => {
      if (error.response && error.response.status === 403) alert("❌ Senha incorreta!");
      else alert("Erro ao carregar agendamentos.");
    });
  };

  const handleDeleteAppointment = (id: number) => {
    if (window.confirm("Excluir este agendamento?")) {
      api.delete(`/agendamentos/${id}`, { headers: { 'x-senha-admin': adminPassword } })
      .then(() => {
        alert("🗑️ Agendamento excluído!");
        loadAppointments(adminPassword);
      })
      .catch(() => alert("Erro ao excluir."));
    }
  };

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    api.put(`/servicos/${editingService.id}`, editingService, {
      headers: { 'x-senha-admin': adminPassword }
    })
    .then(() => {
      alert("✅ Serviço atualizado com sucesso!");
      setEditingService(null);
      fetchServices();
    })
    .catch((err: any) => {
      alert("Erro ao atualizar: " + (err.response?.data?.error || "Erro desconhecido"));
    });
  };

  const goHome = () => { setView('home'); setSelectedService(null); window.scrollTo(0, 0); };
  
  const scrollToServices = () => {
    if (view !== 'home') {
        setView('home');
        setTimeout(() => document.getElementById('area-servicos')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
        document.getElementById('area-servicos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDetails = (service: any) => { setSelectedService(service); setView('detail'); window.scrollTo(0, 0); };
  const goToBooking = () => { setView('booking'); window.scrollTo(0, 0); };

  const filteredServices = services.filter(s =>
    s.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    const dadosBrutos = {
      cliente_nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      cliente_whatsapp: (form.elements.namedItem('whatsapp') as HTMLInputElement).value,
      data_agendamento: (form.elements.namedItem('data') as HTMLInputElement).value,
      horario: (form.elements.namedItem('horario') as HTMLSelectElement).value,
      servico_id: selectedService.id
    };

    try {
      const dadosValidados = bookingSchema.parse(dadosBrutos);

      api.post('/agendamentos', dadosValidados)
      .then((response: any) => { 
        alert(`✅ Agendamento Confirmado! ID: ${response.data.id}`); 
        goHome(); 
      })
      .catch((error: any) => {
          if (error.response?.status === 409) alert("❌ Horário já reservado!");
          else alert('Erro ao agendar na API.');
      });

    } catch (err: any) {
      if (err instanceof z.ZodError) {
        alert(`⚠️ Erro: ${err.issues[0].message}`);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg sticky-top bg-white shadow-sm">
        <div className="container">
          <button className="navbar-brand btn-unstyled" onClick={goHome} style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', fontFamily: 'Playfair Display', color: '#d6336c' }}>
            <i className="fas fa-gem me-2"></i>Escova Express
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav align-items-center gap-3">
              <li className="nav-item"><button className="nav-link btn-unstyled text-secondary" onClick={goHome} style={{background: 'none', border: 'none'}}>Início</button></li>
              <li className="nav-item"><button className="nav-link btn-unstyled text-secondary" onClick={scrollToServices} style={{background: 'none', border: 'none'}}>Agendar</button></li>
              <li className="nav-item ms-2"><input type="text" className="form-control form-control-sm" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{width: '150px'}} /></li>
            </ul>
          </div>
        </div>
      </nav>

      {view === 'home' && (
        <div className="fade-in">
          <section className="py-5 text-center bg-light" style={{ background: 'linear-gradient(to bottom, #ffeaf0, #fff)' }}>
            <div className="container">
              <h1 className="display-4 fw-bold">Beleza & Bem-estar</h1>
              <p className="lead text-muted">Escolha o serviço ideal e agende seu momento de cuidado.</p>
              <button className="btn btn-primary-custom mt-3" onClick={scrollToServices}>Ver Catálogo</button>
            </div>
          </section>
          <section id="area-servicos" className="py-5 container">
            <div className="row g-4">
              {filteredServices.map(service => (
                <div key={service.id} className="col-md-4">
                  <div className="card service-card h-100" onClick={() => openDetails(service)}>
                    <img src={service.imagem_url} className="card-img-top service-img" alt={service.titulo} />
                    <div className="card-body text-center">
                      <span className="badge bg-light text-dark mb-2">{service.categoria}</span>
                      <h5 className="card-title fw-bold">{service.titulo}</h5>
                      <h6 style={{ color: '#d6336c' }}>R$ {service.preco}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {view === 'detail' && selectedService && (
        <div className="container py-5 fade-in">
          <button className="btn btn-outline-custom mb-4" onClick={goHome}>Voltar</button>
          <div className="row">
            <div className="col-lg-6"><img src={selectedService.imagem_url} className="img-fluid rounded shadow" alt={selectedService.titulo} /></div>
            <div className="col-lg-6">
              <span className="badge bg-secondary mb-2">{selectedService.categoria}</span>
              <h1 className="display-4 fw-bold">{selectedService.titulo}</h1>
              <h2 className="mb-4 text-pink">R$ {selectedService.preco}</h2>
              <p className="lead">{selectedService.descricao}</p>
              <button className="btn btn-primary-custom btn-lg w-100" onClick={goToBooking}>Agendar Agora</button>
            </div>
          </div>
        </div>
      )}

      {view === 'booking' && selectedService && (
        <div className="container py-5 fade-in" style={{background: '#ffeaf0', borderRadius: '20px'}}>
           <div className="row justify-content-center"><div className="col-md-8"><div className="card border-0 shadow p-4">
              <h3 className="text-center mb-4">Confirmar Agendamento</h3>
              <form onSubmit={handleBookingSubmit}>
                <div className="mb-3"><label>Serviço</label><input type="text" className="form-control fw-bold" readOnly value={selectedService.titulo} /></div>
                <div className="row"><div className="col-md-6 mb-3"><label>Nome</label><input name="nome" type="text" className="form-control" placeholder="Mínimo 3 letras" /></div><div className="col-md-6 mb-3"><label>WhatsApp</label><input name="whatsapp" type="tel" className="form-control" placeholder="Mínimo 10 números" /></div></div>
                <div className="row"><div className="col-md-6 mb-3"><label>Data</label><input name="data" type="date" className="form-control" /></div><div className="col-md-6 mb-3"><label>Horário</label><select name="horario" className="form-select"><option value="">Selecione...</option><option>09:00</option><option>10:00</option><option>11:00</option><option>14:00</option><option>15:00</option><option>16:00</option></select></div></div>
                <button type="submit" className="btn btn-primary-custom w-100 mt-3">Confirmar</button>
              </form>
           </div></div></div>
        </div>
      )}

      {view === 'admin' && (
        <div className="container py-5 fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>⚙️ Painel Administrativo</h2>
                <button className="btn btn-outline-secondary" onClick={goHome}>Sair</button>
            </div>

            {editingService && (
                <div className="card shadow-sm mb-5 border-warning" style={{borderLeft: '5px solid #ffc107'}}>
                    <div className="card-body">
                        <h4>✏️ Editando: {editingService.titulo}</h4>
                        <form onSubmit={handleUpdateService}>
                            <div className="row">
                                <div className="col-md-4 mb-2"><label>Título</label><input type="text" className="form-control" value={editingService.titulo} onChange={e => setEditingService({...editingService, titulo: e.target.value})} /></div>
                                <div className="col-md-3 mb-2"><label>Preço</label><input type="number" className="form-control" value={editingService.preco} onChange={e => setEditingService({...editingService, preco: e.target.value})} /></div>
                                <div className="col-md-3 mb-2"><label>Categoria</label><input type="text" className="form-control" value={editingService.categoria} onChange={e => setEditingService({...editingService, categoria: e.target.value})} /></div>
                                <div className="col-md-2 d-flex align-items-end gap-2 mb-2"><button type="submit" className="btn btn-success w-100">Salvar</button><button type="button" className="btn btn-secondary" onClick={() => setEditingService(null)}>Cancelar</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <h4 className="mt-4 mb-3 text-pink">📅 Agendamentos Recentes</h4>
            <div className="table-responsive shadow-sm mb-5" style={{borderRadius: '10px'}}>
                <table className="table table-hover mb-0 bg-white align-middle">
                    <thead className="table-light"><tr><th>Data</th><th>Horário</th><th>Cliente</th><th>Serviço</th><th>Ações</th></tr></thead>
                    <tbody>
                        {appointments.map(app => (
                            <tr key={app.id}>
                                <td>{formatDate(app.data_agendamento)}</td><td>{app.horario.substring(0, 5)}</td><td className="fw-bold">{app.cliente_nome}</td><td><span className="badge bg-light text-dark border">{app.servico_titulo}</span></td>
                                <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteAppointment(app.id)}>🗑️</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h4 className="mt-4 mb-3 text-pink">💇‍♀️ Gerenciar Catálogo</h4>
            <div className="table-responsive shadow-sm" style={{borderRadius: '10px'}}>
                <table className="table table-hover mb-0 bg-white align-middle">
                    <thead className="table-light"><tr><th>ID</th><th>Serviço</th><th>Categoria</th><th>Preço</th><th>Ações</th></tr></thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id}>
                                <td>#{service.id}</td><td className="fw-bold">{service.titulo}</td><td>{service.categoria}</td><td className="text-success fw-bold">R$ {service.preco}</td>
                                <td><button className="btn btn-sm btn-outline-warning" onClick={() => { setEditingService(service); window.scrollTo(0, 0); }}>✏️ Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      <footer className="text-center py-4 mt-5 text-white" style={{ backgroundColor: '#d6336c' }}>
        <div className="container">
            <h3 className="mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Escova Express</h3>
            <button onClick={() => loadAppointments()} style={{background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem'}}>Área Admin</button>
        </div>
      </footer>
    </div>
  );
}

export default App;