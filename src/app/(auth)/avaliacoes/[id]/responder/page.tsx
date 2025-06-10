'use client'

import Button from "@/components/Button"
import { useForms } from "@/contexts/formsContext"
import { setQuestionComponent } from "@/utils/functions/setQuestionComponent"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function AnswerEvaluation({params}: {params: {id: string}}) {
  const {
    getEvaluationById,
    answerEvaluation,
    getFormById,
    formDetails
  } = useForms()

  const [formId, setFormId] = useState<string | null>(null)
  const [endedForms, setEndedForms] = useState<string[]>([])

  useEffect(() => {
    getEvaluationById(params.id)
  }, [params.id])

  useEffect(() => {
    if (answerEvaluation?.formsRel && answerEvaluation.formsRel.length > 0) {
      const firstFormId = answerEvaluation.formsRel[0].form?.id
      if (firstFormId) {
        getFormById(firstFormId)
        setFormId(firstFormId)
      }
    }
  }, [answerEvaluation])

  useEffect(() => {
    if (formId) {
      getFormById(formId)
    }
  }, [formId])

  const handleEndForm = () => {
    if (!answerEvaluation?.formsRel || !formId) return;
  
    const currentIndex = answerEvaluation.formsRel.findIndex(
      (formsRel) => formsRel.form?.id === formId
    );
  
    if (currentIndex !== -1 && currentIndex + 1 < answerEvaluation.formsRel.length) {
      const nextFormId = answerEvaluation.formsRel[currentIndex + 1].form?.id;
      if (nextFormId) {
        setFormId(nextFormId);
        setEndedForms((prev) => [...prev, formId]); 
      }
    } else {
      console.log("Último formulário respondido ou nenhum próximo formulário encontrado.");
    }
  };

  return(
    <div className="flex py-8 justify-center min-h-screen w-full">
      <div className="card bg-white shadow-2xl w-2/3">
        <div className="card-body w-full">
          <div className="text-center">
            <p className="text-lg font-bold mb-1">
              {answerEvaluation.title}
            </p>
            <p className="text-sm text-gray-500">
              {answerEvaluation.description}
            </p>
          </div>

          <div>
          {
            answerEvaluation.formsRel?.map((formsRel) => (
            <fieldset key={formsRel.form?.id} className="border border-base-300 rounded p-4 my-4 text-xs text-start relative">
              <p className="text-lg font-bold mb-1">{formsRel.form?.title}</p>
              {
                formsRel.form?.description && (
                  <p className="text-sm text-gray-500 mb-2">{formsRel.form.description}</p>
                )
              }
              {
                (formId !== formsRel.form?.id) && (
                  <div className="h-full w-full bg-black/25 backdrop-blur-xs absolute top-0 left-0 rounded flex items-center justify-center">
                    {
                      endedForms.includes(formsRel.form?.id) && (
                        <span className="text-white text-lg font-bold flex items-center gap-2"><FontAwesomeIcon className="text-green-300" icon={faCheckCircle}/>Formulário respondido</span>
                      )
                    }
                  </div>
                )
              }
              {
                (formId === formsRel.form?.id) && (
                  <div>
                  {formDetails?.seccions?.map((section, sectionIndex) => (
                    <fieldset key={section.id} className=" border border-gray-300 p-4 rounded mb-4">
                      <legend className="text-sm font-bold">{section.title}</legend>
                      {section.questionsIds.length > 0 ? (
                        section.questionsIds.map((rel, questionIndex) => (
                          <div key={questionIndex} className="mb-4">
                            {setQuestionComponent(rel)}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm italic text-gray-400">Nenhuma questão nesta sessão.</p>
                      )}
                    </fieldset>
                  ))}
                    <div className="flex items-center justify-between">
                      <Button className="btn btn-success text-white" onClick={handleEndForm}>
                        Finalizar
                      </Button>
                      <Button className="btn bg-salmon text-white">
                        Pausar
                      </Button>
                    </div>
                  </div>
                )
              }
            </fieldset>
          ))
          }
          </div>
        </div>
      </div>
    </div>
  )
}
