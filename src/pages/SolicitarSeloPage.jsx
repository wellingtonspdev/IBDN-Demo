import React, { useState, useEffect, useCallback } from "react";
import { Star, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import * as seloService from "../services/seloService";
import * as tipoSeloService from "../services/tipoSeloService";
import Modal from "../components/Modal";
import SolicitarSeloForm from "../components/SolicitarSeloForm";
import useAuthStore from "../store/authStore";

const statusColors = {
  Pendente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Em Renovação": "bg-blue-100 text-blue-800 border-blue-200",
};

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center p-20 bg-white rounded-3xl shadow-sm border border-gray-100 my-8">
    <div className="w-12 h-12 border-4 border-ibdn-primary/20 border-t-ibdn-primary rounded-full animate-spin mb-4"></div>
    <p className="text-ibdn-primary font-medium opacity-80">Carregando dados...</p>
  </div>
);

function SolicitarSeloPage() {
  const { user } = useAuthStore();
  const [tiposSelo, setTiposSelo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [solicitacoesDaEmpresa, setSolicitacoesDaEmpresa] = useState([]);

  const fetchTiposSeloAndSolicitacoes = useCallback(async () => {
    if (!user?.empresa_id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const [tiposSeloData, solicitacoesData] = await Promise.all([
        tipoSeloService.listarTiposSelo(),
        seloService.getSelosByEmpresa(user.empresa_id),
      ]);
      setTiposSelo(tiposSeloData);
      setSolicitacoesDaEmpresa(
        solicitacoesData.filter(
          (s) => s.status === "Pendente" || s.status === "Em Renovação"
        )
      );
      setError(null);
    } catch (err) {
      setError("Falha ao carregar dados. Por favor, tente novamente mais tarde.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTiposSeloAndSolicitacoes();
  }, [fetchTiposSeloAndSolicitacoes]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => { if (isSaving) return; setIsModalOpen(false); };

  const handleSolicitarSelo = async (dadosSolicitacao) => {
    setIsSaving(true);
    try {
      await seloService.solicitarSelo(dadosSolicitacao);
      alert("Solicitação de selo enviada com sucesso! Um administrador revisará sua solicitação.");
      handleCloseModal();
      await fetchTiposSeloAndSolicitacoes();
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        "Não foi possível enviar a solicitação. Verifique se você já possui este selo ou se a empresa está ativa.";
      alert(errorMessage);
      console.error("Erro ao solicitar selo:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderContent = () => {
    if (loading) return <LoadingSpinner />;

    if (error)
      return (
        <div className="text-center p-14 bg-red-50 rounded-3xl shadow-sm border border-red-100 flex flex-col items-center my-8">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-serif font-bold text-red-800">Erro</h3>
          <p className="mt-2 text-md text-red-600 max-w-sm">{error}</p>
        </div>
      );

    if (!user?.empresa_id) {
      return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow">
          <p className="font-semibold">Atenção:</p>
          <p>
            Você precisa ter uma empresa registrada para solicitar selos. Por
            favor, complete o cadastro da sua empresa no menu "Registrar Empresa".
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Card: Solicitar Novo Selo */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ibdn-accent/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-ibdn-accent" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-serif font-bold text-ibdn-primary">
                Solicitar Novo Selo
              </h2>
            </div>
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 bg-ibdn-primary text-white text-sm font-medium rounded-xl shadow-sm shadow-ibdn-primary/20 hover:bg-ibdn-primary-focus transition-colors disabled:opacity-50"
              disabled={tiposSelo.length === 0}
            >
              Solicitar Agora
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            Selecione um tipo de selo do nosso catálogo para enviar uma
            solicitação de concessão para a sua empresa. Sua solicitação será
            revisada por um administrador.
          </p>
          {tiposSelo.length === 0 && (
            <p className="mt-3 text-sm text-gray-400">
              Não há tipos de selo disponíveis para solicitação no momento.
            </p>
          )}
        </div>

        {/* Card: Solicitações Pendentes */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-serif font-bold text-ibdn-primary">
              Minhas Solicitações Pendentes
            </h2>
          </div>

          {solicitacoesDaEmpresa.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {solicitacoesDaEmpresa.map((solicitacao) => (
                <li
                  key={solicitacao.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {solicitacao.nome_selo}{" "}
                      <span className="font-mono text-gray-500 font-normal">
                        ({solicitacao.sigla_selo})
                      </span>
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      statusColors[solicitacao.status] ||
                      "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {solicitacao.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center py-10 text-center text-gray-400">
              <CheckCircle2 className="w-12 h-12 mb-3 text-gray-200" strokeWidth={1.5} />
              <p className="text-sm">Nenhuma solicitação pendente ou em renovação.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ibdn-primary tracking-tight">
            Solicitar Selo
          </h1>
          <p className="mt-1 text-gray-500">
            Gerencie suas solicitações de certificação ambiental.
          </p>
        </div>
      </div>

      {renderContent()}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Formulário de Solicitação de Selo"
      >
        <SolicitarSeloForm
          tiposSelo={tiposSelo}
          onSubmit={handleSolicitarSelo}
          onCancel={handleCloseModal}
          isSaving={isSaving}
        />
      </Modal>
    </div>
  );
}

export default SolicitarSeloPage;
