'use client'

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import { useAuth } from "@/contexts/authContext"
import { useForms } from "@/contexts/formsContext"
import { useUsers } from "@/contexts/usersContext"
import { normalizeAnswers } from "@/utils/functions/setFormAnwerObject"
import { setQuestionComponent } from "@/utils/functions/setQuestionComponent"
import { faBan, faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function AnswerEvaluation({params}: {params: {id: string}}) {
  const {
    getEvaluationById,
    answerEvaluation,
    getFormById,
    formDetails,
    answerEvaluationRequest,
    answerId,
    editAnswerEvaluationRequest,
    getEvaluationAnswerById,
    evaluationAnswerDetails
  } = useForms()

  const {
    elderlyId
  } = useUsers()

  const [formId, setFormId] = useState<string | null>(null)
  const [endedForms, setEndedForms] = useState<string[]>([])

  const searchParams = useSearchParams()
  const elderlyIdFromUrl = searchParams.get('elderlyId')
  const answerIdFromUrl = searchParams.get('answerId')


  if(!elderlyId && !elderlyIdFromUrl) {
    return (
      <div className="h-screen p-8 w-full">
        <Alert 
        className="alert alert-error shadow-lg "
        icon={
          <FontAwesomeIcon icon={faBan}/>
        }
        message="Valide a identidade do idoso antes de responder a avaliação."
        />

      </div>
    )
  }

  useEffect(() => {
    if (!answerIdFromUrl) return;
    getEvaluationAnswerById(answerIdFromUrl)
  }, [answerIdFromUrl])


  const {
    register,
    handleSubmit,
  } = useForm()

  const {
    userId,
  } = useAuth()

  useEffect(() => {
    getEvaluationById(params.id)
  }, [params.id])

  useEffect(() => {
    if (answerEvaluation?.formsRel && answerEvaluation.formsRel.length > 0 && !answerIdFromUrl) {
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

  useEffect(() => {
    if (!evaluationAnswerDetails) return;
    setEndedForms(evaluationAnswerDetails?.formAnswares?.map((formAnswer) => formAnswer.form.id) || []);

    const lastAnsweredForm = evaluationAnswerDetails?.formAnswares?.[evaluationAnswerDetails?.formAnswares?.length - 1];

    const currentIndex = answerEvaluation?.formsRel?.findIndex(
      (formsRel) => formsRel.form?.id === lastAnsweredForm?.form.id
    );

    if (currentIndex !== -1 && currentIndex + 1 < answerEvaluation?.formsRel?.length) {
      const nextFormId = answerEvaluation.formsRel[currentIndex + 1].form?.id;
      if (nextFormId) {
        setFormId(nextFormId);
      }
    } else {
      console.log("Último formulário respondido ou nenhum próximo formulário encontrado.");
    }

  }, [evaluationAnswerDetails])

  const handleEndForm = async (data: any) => {
    const answers = normalizeAnswers(data, formDetails)
    const evaluationAnswer: EvaluationAnswer = {
      evaluationId: answerEvaluation.id,
      formAnswares: [
        {
          formId: formDetails.id || '',
          elderlyId: elderlyId || elderlyIdFromUrl || '',
          questionsAnswares: answers,
          techProfessionalId: '3f5d87f2-9fc7-41fb-b165-dedde6a019bc',
        }
      ]
    }

    if(answerId || answerIdFromUrl) {
      editAnswerEvaluationRequest(evaluationAnswer, answerId || answerIdFromUrl || '')
    } 
    else {
      await answerEvaluationRequest(evaluationAnswer)
    }

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
          <ul className="steps">
            {
              answerEvaluation.formsRel?.map((formsRel) => (
                <li 
                className={`${(formId === formsRel.form?.id || endedForms.includes(formsRel.form?.id)) && 'step-primary'} step`}
                
                >
                  {(endedForms.includes(formsRel.form?.id)) && (
                    <span className="step-icon"><FontAwesomeIcon icon={faCheck}/></span>
                  )}
                  {formsRel.form.title}
                </li>
                
              ))
            }
          </ul>
          {
            answerEvaluation.formsRel?.map((formsRel) => (
              <>
              {
                (formId === formsRel.form?.id) && (
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
                        <form onSubmit={handleSubmit(handleEndForm)}>
                        {formDetails?.seccions?.map((section, sectionIndex) => (
                          <fieldset key={section.id} className=" border border-gray-300 p-4 rounded mb-4">
                            <legend className="text-sm font-bold">{section.title}</legend>
                            {section.questionsIds.length > 0 ? (
                              section.questionsIds.map((rel, questionIndex) => (
                                <div key={questionIndex} className="mb-4">
                                  {setQuestionComponent(rel, register)}
                                </div>
                              ))
                            ) : (
                              <p className="text-sm italic text-gray-400">Nenhuma questão nesta sessão.</p>
                            )}
                          </fieldset>
                        ))}
                          <div className="flex items-center justify-between">
                            <Button className="btn btn-success text-white" type="submit">
                              Continuar
                            </Button>
                            <Button className="btn bg-salmon text-white">
                              Pausar
                            </Button>
                          </div>
                        </form>
                      )
                    }
                  </fieldset>
                )
              }
              </>
              
          ))
          }
          </div>
        </div>
      </div>
    </div>
  )
}
