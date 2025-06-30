'use client'

import Alert from "@/components/Alert"
import Button from "@/components/Button"
import { useAuth } from "@/contexts/authContext"
import { useForms } from "@/contexts/formsContext"
import { useLoader } from "@/contexts/loaderContext"
import { useUsers } from "@/contexts/usersContext"
import { normalizeAnswers } from "@/utils/functions/setFormAnwerObject"
import { setQuestionComponent } from "@/utils/functions/setQuestionComponent"
import { api } from "@/utils/lib/axios"
import toastError from "@/utils/toast/toastError"
import toastSuccess from "@/utils/toast/toastSuccess"
import { faBan, faCheck, faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchParams } from "next/navigation"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function AnswerEvaluation({params}: {params: {id: string}}) {
  const {
    getEvaluationById,
    answerEvaluation,
    getFormById,
    formDetails,
    answerEvaluationRequest,
    getEvaluationAnswerById,
    evaluationAnswerDetails,
    handlePauseEvaluation,
    headerConfig
  } = useForms()

  const {
    elderlyId
  } = useUsers()

  const {
    setLoading,
  } = useLoader()

  const [formId, setFormId] = useState<string | null>(null)
  const [endedForms, setEndedForms] = useState<string[]>([])
  const [answerId, setAnswerId] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [currentForm, setCurrentForm] = useState<FormAnswerDetails | null>(null)

  const searchParams = useSearchParams()
  const elderlyIdFromUrl = searchParams.get('elderlyId')
  const answerIdFromUrl = searchParams.get('answerId')

  const { 'elderguard.userId': professionalId } = parseCookies()


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
    setValue
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

  const setFormValues = (formId: string) => {
    const formAnswer = evaluationAnswerDetails?.formAnswares?.find((fa) => fa.formId === formId);
    if (!formAnswer) return;
    setCurrentForm(formAnswer);
    formAnswer.questionsAnswares.forEach((answer) => {
      if (answer.answerText !== undefined && answer.answerText !== null) {
        setValue(answer.questionId, answer.answerText);
        return;
      }
      if (answer.answerNumber !== undefined && answer.answerNumber !== null) {
        setValue(answer.questionId, answer.answerNumber);
        return;
      }
      if (answer.answerImage !== undefined && answer.answerImage !== null) {
        setValue(answer.questionId, answer.answerImage);
        return;
      }
      if (answer.answerBoolean !== undefined && answer.answerBoolean !== null) {
        setValue(answer.questionId, answer.answerBoolean ? "true" : "false");
        return;
      }
      if (answer.selectedOptionId !== undefined && answer.selectedOptionId !== null) {
        setValue(answer.questionId, answer.selectedOptionId);
        return;
      }
      if (answer.score !== undefined && answer.score !== null) {
        setValue(answer.questionId, answer.score);
        return;
      }
    });
  };
  
  

  useEffect(() => {
    if (!evaluationAnswerDetails) return;
  
    const isPaused = evaluationAnswerDetails.status === "PAUSED";
    const allFormAnswers = evaluationAnswerDetails.formAnswares || [];
  
    const relevantFormAnswers = isPaused
      ? allFormAnswers.slice(0, -1)
      : allFormAnswers;
  
    const endedFormIds = relevantFormAnswers.map((formAnswer) => formAnswer?.formId);
    setEndedForms(endedFormIds);
  
    const lastAnsweredForm = relevantFormAnswers[relevantFormAnswers.length - 1];
  
    const currentIndex = answerEvaluation?.formsRel?.findIndex(
      (formsRel) => formsRel.form?.id === lastAnsweredForm?.formId
    );
  
    if (isPaused) {
      const lastPausedForm = allFormAnswers[allFormAnswers.length - 1];
      const { formId, questionsAnswares } = lastPausedForm;

    
      if (formId) {
        setFormId(formId);
        setFormValues(formId);
      }
    } else if (currentIndex !== -1 && currentIndex + 1 < answerEvaluation?.formsRel?.length) {
      const nextFormId = answerEvaluation.formsRel[currentIndex + 1].form?.id;
      if (nextFormId) {
        setFormId(nextFormId);
      }
    } else {
      console.log("Último formulário respondido ou nenhum próximo formulário encontrado.");
      if (evaluationAnswerDetails?.status === "COMPLETED") {
        setIsCompleted(true);
        setFormId(allFormAnswers?.[0]?.formId || null);
        const firstForm = allFormAnswers[0];
        if (firstForm) {
          setFormValues(firstForm.formId);
        }
      }
      
    }
    
  }, [evaluationAnswerDetails, answerEvaluation, setValue]);
  
  
  

  const handleNextForm = (id?: string) => {
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
        if (id) {
          getEvaluationAnswerById(id)
        }
        setIsCompleted(true);
        if (evaluationAnswerDetails?.status === "COMPLETED") {
          setIsCompleted(true);
        }
      }
  }

  const handleEndForm = async (data: any) => {
    const answers = await normalizeAnswers(data, formDetails)
    const evaluationAnswer: EvaluationAnswer = {
      evaluationId: answerEvaluation.id,
      professionalId: professionalId,
      elderlyId: elderlyId || elderlyIdFromUrl || '',
      formAnswares: [
        {
          formId: formDetails.id || '',
          elderlyId: elderlyId || elderlyIdFromUrl || '',
          questionsAnswares: answers,
          techProfessionalId: professionalId,
        }
      ]
    }

    const isLastForm = answerEvaluation.formsRel?.length === (endedForms.length + 1);
    if(answerId || answerIdFromUrl) {
      if (isLastForm) {
      setLoading(true)
        api.patch(`/evaluation-answare/${answerId || answerIdFromUrl}/complete`, evaluationAnswer, headerConfig).then((response) => {
          toastSuccess('Avaliação respondida com sucesso', 5000)
          setAnswerId(response.data.id)
          getEvaluationAnswerById(answerId || answerIdFromUrl || '')
          setIsCompleted(true)
        })
        .catch((error) => {
          toastError('Erro ao responder avaliação', false)
        }).finally(() => {
          setLoading(false)
        }
        )
      } else {
      setLoading(true)
        api.patch(`/evaluation-answare/${answerId || answerIdFromUrl}/add-form`, evaluationAnswer, headerConfig).then((response) => {
          toastSuccess('Formulário respondida com sucesso', 5000)
          setAnswerId(response.data.id)
          handleNextForm()
        })
        .catch((error) => {
          toastError('Erro ao responder avaliação', false)
        }).finally(() => {
          setLoading(false)
        }
        )
      }
    } 
    else {
      setLoading(true)
      api.post('/evaluation-answare', evaluationAnswer, headerConfig).then((response) => {
        toastSuccess('Avaliação respondida com sucesso', 5000)
        setAnswerId(response.data.id)
        handleNextForm(response.data.id)  
      })
      .catch((error) => {
        toastError('Erro ao responder avaliação', false)
      }).finally(() => {
        setLoading(false)
      }
      )
    }
    
  };
  const handlePause = async (data: any) => { 
    const answers = await normalizeAnswers(data, formDetails)
    const evaluationAnswer: EvaluationAnswer = {
      evaluationId: answerEvaluation.id,
      professionalId: 'd55db403-c4b8-4153-94e0-551cf5852fe5',
      elderlyId: elderlyId || elderlyIdFromUrl || '',
      formAnswares: [
        {
          formId: formDetails.id || '',
          elderlyId: elderlyId || elderlyIdFromUrl || '',
          questionsAnswares: answers,
          techProfessionalId: 'd55db403-c4b8-4153-94e0-551cf5852fe5',
        }
      ]
    }
    await handlePauseEvaluation (answerId || answerIdFromUrl || '', evaluationAnswer)
  }
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
                answerEvaluation.formsRel?.map((formsRel) => {
                  const currentFormId = formsRel.form?.id;
                  const isCurrent = formId === currentFormId;
                  const isEnded = endedForms.includes(currentFormId);
                  const isClickable = isCompleted;

                  return (
                    <li
                      key={currentFormId}
                      className={`step ${isCurrent || isEnded ? 'step-primary' : ''} ${isClickable ? 'cursor-pointer' : ''}`}
                      onClick={() => {
                        if (isClickable && currentFormId) {
                          setFormId(currentFormId);
                          getFormById(currentFormId);
                          setFormValues(currentFormId);
                        }
                      }}
                    >
                      {isEnded && (
                        <span className="step-icon">
                          <FontAwesomeIcon icon={faCheck}/>
                        </span>
                      )}
                      {formsRel.form.title}
                    </li>
                  )
                })
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
                        <form>
                        {formDetails?.seccions?.map((section, sectionIndex) => (
                          <fieldset key={section.id} className=" border border-gray-300 p-4 rounded mb-4">
                            <legend className="text-sm font-bold">{section.title}</legend>
                            {section.questionsIds.length > 0 ? (
                              section.questionsIds.map((rel, questionIndex) => (
                                <>
                                {
                                  (isCompleted && rel.type=== "IMAGE") ? (
                                    <div key={questionIndex} className="mb-4">
                                      <img 
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${currentForm?.questionsAnswares.find((q) => q.questionId === rel.id)?.answerImage}`|| ''}
                                        alt={rel.title}
                                        className="w-full h-auto rounded"
                                      />
                                    </div>
                                  ) : (
                                    setQuestionComponent(rel, register, isCompleted)
                                  )
                                }
                                {
                                  isCompleted && (
                                    <div className="flex justify-end items-center gap-4">
                                      <span>Pontuação:</span>
                                      <span className="text-sm font-semibold">
                                        {currentForm?.questionsAnswares.find((q) => q.questionId === rel.id)?.score || 0}
                                      </span>
                                    </div>
                                  )
                                }
                                </>
                              ))
                            ) : (
                              <p className="text-sm italic text-gray-400">Nenhuma questão nesta sessão.</p>
                            )}
                          </fieldset>
                        ))}
                        {
                          !isCompleted ? (
                            <div className="flex items-center justify-between">
                              <Button className="btn bg-salmon text-white" onClick={handleSubmit(handlePause)}>
                                Pausar
                              </Button>
                              <Button className="btn btn-success text-white" onClick={handleSubmit(handleEndForm)} >
                                Continuar
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-between text-base">
                              <p>Pontuação total:</p>
                              <span>
                                {currentForm?.totalScore} pontos
                              </span>
                            </div>
                          )
                        }
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
