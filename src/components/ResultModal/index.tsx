'use client'
import { useForms } from "@/contexts/formsContext"
import { formatDate } from "@/utils/formatters/formateDate"
import { useEffect, useState } from "react"
import Modal from "../Modal"
import { Chart } from 'primereact/chart';
import Button from "../Button"

interface ResultModalProps {
  elderlyId: string;
  formId: string;
}
const ResultModal: React.FC<ResultModalProps> = ({
  elderlyId,
  formId,
}) => {
  const [chartData, setChartData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    formAnswerData,
    handleHistoryEvaluation
  } = useForms() 
    
  const labels = formAnswerData?.scores?.map((s) => formatDate(s.date))
  const data = formAnswerData?.scores?.map((s) => s.totalScore)
  
  const monthData = {
    labels,
    datasets: [
      {
        label: 'Pontuação',
        data,
        borderColor: '#3fcd82',
      }
    ]
  }

  useEffect(() => {
    if (formAnswerData?.scores) {
      setChartData(monthData);
    }
  }, [formAnswerData]);

  const handleOpenModal = async () => {
    await handleHistoryEvaluation(elderlyId, formId)
    setIsModalOpen(true);
  }


  return (
    <>
      <Button 
      className="btn btn-primary mt-4"
      type="button"
      onClick={handleOpenModal}
      >
        Comparar resultados
      </Button>
      <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="w-1/3 h-1/2"
      >
          <h2 className="text-xl font-bold mb-4">Resultados da Avaliação</h2>
          <Chart type="line" data={chartData} className="w-full"/>
      </Modal>
    </>
  )
}

export default ResultModal;