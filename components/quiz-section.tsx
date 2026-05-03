"use client"

import { useState } from "react"
import { X, Sparkles, ChevronRight, Share2, RotateCcw, ArrowRight } from "lucide-react"

interface Question {
  question: string
  options: { label: string; value: "A" | "B" | "C" | "D" }[]
}

const questions: Question[] = [
  {
    question: "Como describes tu estilo?",
    options: [
      { label: "Elegante y sofisticado, siempre a la moda", value: "A" },
      { label: "Artistico y romantico, con toques unicos", value: "B" },
      { label: "Poderoso y llamativo, que todos noten tu entrada", value: "C" },
      { label: "Dulce y femenino, con detalles coreanos", value: "D" },
    ],
  },
  {
    question: "Que harias un sabado libre?",
    options: [
      { label: "Ir de shopping a tiendas de lujo", value: "A" },
      { label: "Tocar guitarra y escribir canciones en casa", value: "B" },
      { label: "Practicar baile por horas hasta perfeccionarlo", value: "C" },
      { label: "Ver doramas y mimar a tu mascota", value: "D" },
    ],
  },
  {
    question: "Cual es tu superpoder artistico?",
    options: [
      { label: "Rapear con actitud y flow unicos", value: "A" },
      { label: "Una voz que eriza la piel", value: "B" },
      { label: "Bailar como nadie mas en el mundo", value: "C" },
      { label: "Cantar con una dulzura que llega al corazon", value: "D" },
    ],
  },
  {
    question: "Como eres con tus amigos?",
    options: [
      { label: "La lider natural, siempre con estilo", value: "A" },
      { label: "La sensible que los escucha y apoya", value: "B" },
      { label: "La energetica que anima a todos", value: "C" },
      { label: "La chistosa que hace reir a todos", value: "D" },
    ],
  },
  {
    question: "Que pais te gustaria visitar?",
    options: [
      { label: "Francia - Paris, la capital de la moda", value: "A" },
      { label: "Australia - naturaleza y musica en vivo", value: "B" },
      { label: "Tailandia - cultura, colores y festivales", value: "C" },
      { label: "Japon - anime, cultura pop y doramas", value: "D" },
    ],
  },
  {
    question: "Que marca de moda te representa?",
    options: [
      { label: "CHANEL - lujo clasico e intemporal", value: "A" },
      { label: "Saint Laurent - rock elegante y sofisticado", value: "B" },
      { label: "CELINE - minimalismo poderoso", value: "C" },
      { label: "Dior - feminidad romantica y refinada", value: "D" },
    ],
  },
  {
    question: "Cual es tu frase al enfrentar un reto?",
    options: [
      { label: '"Soy la mejor y lo se"', value: "A" },
      { label: '"La musica me da fuerzas para todo"', value: "B" },
      { label: '"Lo dare todo con pasion hasta lograrlo"', value: "C" },
      { label: '"Con amor y humor todo se puede"', value: "D" },
    ],
  },
  {
    question: "Que rol tendrias en un grupo musical?",
    options: [
      { label: "La que domina el escenario con actitud", value: "A" },
      { label: "La que emociona con su voz unica", value: "B" },
      { label: "La que deja sin aliento con su baile", value: "C" },
      { label: "La visual que todos quieren ver", value: "D" },
    ],
  },
]

const memberResults = {
  JENNIE: {
    name: "JENNIE",
    image: "https://nolae.es/cdn/shop/articles/jennie-blackpink-profil-646657.jpg?v=1732634830&width=1200",
    description: "Eres sofisticada, segura y magnetica. Tienes el don de destacar en cualquier lugar sin siquiera intentarlo. Como Jennie, tu presencia habla antes que tus palabras.",
  },
  ROSE: {
    name: "ROSE",
    image: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Bildschirmfoto_2024-11-22_um_11.58.02.png?v=1732273097",
    description: "Eres sensible, artistica y autentica. Tienes una forma unica de ver el mundo y lo expresas a traves del arte. Como Rose, tu corazon es tu instrumento mas poderoso.",
  },
  LISA: {
    name: "LISA",
    image: "https://i0.wp.com/plus.cusica.com/wp-content/uploads/2021/07/Lisa-e1626180793774.jpeg?fit=1080%2C685&ssl=1",
    description: "Eres apasionada, energetica e imparable. Cuando te propones algo, nada te detiene hasta lograrlo. Como Lisa, irradias una energia que contagia a todos.",
  },
  JISOO: {
    name: "JISOO",
    image: "https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Bildschirmfoto_2024-09-03_um_12.22.45.png?v=1725359995",
    description: "Eres carinosa, genuina y adorable. Tienes el don de hacer sentir bien a todos con solo estar presente. Como Jisoo, tu alegria ilumina cualquier lugar.",
  },
}

type MemberKey = keyof typeof memberResults

export function QuizSection() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealCount, setRevealCount] = useState(3)
  const [result, setResult] = useState<MemberKey | null>(null)
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 })

  const calculateResult = (allAnswers: string[]) => {
    const newScores = { A: 0, B: 0, C: 0, D: 0 }
    allAnswers.forEach((answer) => {
      if (answer in newScores) {
        newScores[answer as keyof typeof newScores]++
      }
    })
    setScores(newScores)
    const maxScore = Math.max(newScores.A, newScores.B, newScores.C, newScores.D)
    if (newScores.A === maxScore) return "JENNIE"
    if (newScores.B === maxScore) return "ROSE"
    if (newScores.C === maxScore) return "LISA"
    return "JISOO"
  }

  const handleAnswer = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleNext = () => {
    if (!selectedAnswer) return
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer(null)

    if (currentQuestion === questions.length - 1) {
      const memberResult = calculateResult(newAnswers)
      setResult(memberResult)
      setIsRevealing(true)
      let count = 3
      const interval = setInterval(() => {
        count--
        setRevealCount(count)
        if (count === 0) {
          clearInterval(interval)
          setTimeout(() => {
            setIsRevealing(false)
            setShowResult(true)
            localStorage.setItem("bp_quiz_result", memberResult)
          }, 500)
        }
      }, 800)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResult(false)
    setIsRevealing(false)
    setRevealCount(3)
    setResult(null)
    setScores({ A: 0, B: 0, C: 0, D: 0 })
  }

  const closeQuiz = () => {
    setIsQuizOpen(false)
    setTimeout(resetQuiz, 300)
  }

  const shareResult = async () => {
    if (!result) return
    const text = `Soy ${memberResults[result].name} segun el quiz de BLACKPINK!`
    if (navigator.share) {
      await navigator.share({ title: "Mi resultado BLACKPINK", text })
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    }
  }

  const scrollToMember = () => {
    closeQuiz()
    setTimeout(() => {
      document.getElementById("lineup")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  const getPercentage = (member: "A" | "B" | "C" | "D") => {
    const total = scores.A + scores.B + scores.C + scores.D
    if (total === 0) return 0
    return Math.round((scores[member] / total) * 100)
  }

  return (
    <section id="quiz" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#e0457b]/5 to-transparent" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl mb-4 neon-text-subtle text-[#e0457b]">
          CON CUAL BLINK CONECTAS?
        </h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">
          Descubre que integrante de BLACKPINK eres segun tu personalidad
        </p>

        <button
          onClick={() => setIsQuizOpen(true)}
          className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#e0457b] text-white font-semibold text-base sm:text-lg uppercase tracking-wider rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            Iniciar Quiz
          </span>
        </button>
      </div>

      {isQuizOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center p-4">
          <button 
            onClick={closeQuiz} 
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer z-[10000]"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-lg bg-[#0a0a0a] border border-[#e0457b]/20 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#e0457b]/20">
              <span className="text-white/60 text-sm">
                {!showResult && !isRevealing && `Pregunta ${currentQuestion + 1} de ${questions.length}`}
                {showResult && "Resultado"}
                {isRevealing && "Calculando..."}
              </span>
            </div>

            {!showResult && !isRevealing && (
              <div className="h-1 bg-white/10">
                <div
                  className="h-full bg-[#e0457b] transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            )}

            <div className="p-5">
              {isRevealing && (
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-white/60 text-lg mb-6">Tu resultado es...</p>
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-[#e0457b] flex items-center justify-center animate-pulse">
                      <span className="font-[var(--font-bebas)] text-5xl text-[#e0457b]">
                        {revealCount > 0 ? revealCount : "!"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!showResult && !isRevealing && (
                <div>
                  <h3 className="text-lg sm:text-xl text-white font-semibold mb-4 text-center">
                    {questions[currentQuestion].question}
                  </h3>

                  <div className="space-y-2">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-3 rounded-lg text-left transition-all duration-300 cursor-pointer ${
                          selectedAnswer === option.value
                            ? "bg-[#e0457b] border-2 border-[#e0457b] text-white"
                            : "bg-white/5 border-2 border-white/10 text-white hover:border-[#e0457b]/50"
                        }`}
                      >
                        <span className="flex items-start gap-2">
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                            selectedAnswer === option.value ? "border-white bg-white text-[#e0457b]" : "border-white/30"
                          }`}>
                            {selectedAnswer === option.value ? "✓" : String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-sm">{option.label}</span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {selectedAnswer && (
                    <button
                      onClick={handleNext}
                      className="w-full mt-4 py-3 bg-[#e0457b] text-white font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-[#e0457b]/90 cursor-pointer"
                    >
                      {currentQuestion === questions.length - 1 ? "Ver resultado" : "Siguiente"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {showResult && result && (
                <div>
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <img
                      src={memberResults[result].image}
                      alt={memberResults[result].name}
                      className="w-full h-full rounded-full object-cover border-4 border-[#e0457b]"
                    />
                  </div>

                  <h3 className="font-[var(--font-bebas)] text-2xl text-center text-[#e0457b] mb-2">
                    Eres {memberResults[result].name}!
                  </h3>
                  <p className="text-white/70 text-center mb-4 text-sm leading-relaxed">
                    {memberResults[result].description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {[
                      { key: "A" as const, name: "JENNIE" },
                      { key: "B" as const, name: "ROSE" },
                      { key: "C" as const, name: "LISA" },
                      { key: "D" as const, name: "JISOO" },
                    ].map((member) => (
                      <div key={member.key} className="flex items-center gap-2">
                        <span className="w-14 text-white/60 text-xs">{member.name}</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#e0457b] rounded-full transition-all duration-1000"
                            style={{ width: `${getPercentage(member.key)}%` }}
                          />
                        </div>
                        <span className="w-8 text-white/60 text-xs text-right">{getPercentage(member.key)}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={shareResult}
                      className="flex items-center justify-center gap-1 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer text-white"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-xs">Compartir</span>
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="flex items-center justify-center gap-1 p-2 bg-white/5 rounded-lg hover:bg-white/10 cursor-pointer text-white"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-xs">Repetir</span>
                    </button>
                    <button
                      onClick={scrollToMember}
                      className="flex items-center justify-center gap-1 p-2 bg-[#e0457b] rounded-lg hover:bg-[#e0457b]/90 cursor-pointer text-white"
                    >
                      <span className="text-xs">Ver perfil</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
