import { StarField } from "@/components/StarField"
import { ChevronDown, MessageCircle } from "lucide-react"
import Icon from "@/components/ui/icon"
import { ContactForm } from "@/components/ContactForm"
import { ChatbotModal } from "@/components/ChatbotModal"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Index() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [initialHeight, setInitialHeight] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const maxBlur = 8
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [initialHeight])

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true)
          if (aboutContentRef.current) {
            aboutObserver.unobserve(aboutContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (aboutContentRef.current) {
      aboutObserver.observe(aboutContentRef.current)
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current)
      if (aboutContentRef.current) aboutObserver.unobserve(aboutContentRef.current)
      if (servicesContentRef.current) servicesObserver.unobserve(servicesContentRef.current)
      if (servicesTitleRef.current) servicesTitleObserver.unobserve(servicesTitleRef.current)
    }
  }, [])

  const scaleFactor = 1 + blurAmount / 16

  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out",
  }

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const openChatbot = () => setIsChatbotOpen(true)
  const closeChatbot = () => setIsChatbotOpen(false)

  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <a
            href="https://discord.gg/example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Наш Discord"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <Icon name="MessageCircle" size={20} />
          </a>

          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Купить
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="backdrop-blur-sm px-6 py-4 rounded-lg inline-block relative"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.25) 100%)",
              }}
            >
              <h1 className="text-3xl font-bold text-white md:text-5xl font-pixel leading-tight">
                CraftStore{" "}
                <span role="img" aria-label="diamond">
                  💎
                </span>
              </h1>
              <p className="mt-4 text-lg text-green-400 md:text-xl px-4 max-w-xs mx-auto md:max-w-none font-semibold tracking-wide">
                Донат-магазин для Minecraft
              </p>
              <p className="mt-2 text-sm text-gray-400 px-4 max-w-sm mx-auto">
                Привилегии, кейсы, валюта и уникальные наборы — всё для лучшей игры
              </p>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="sm"
                className="mt-6 bg-transparent text-white border-green-500 hover:bg-green-500 hover:text-black transition-colors"
              >
                Подробнее
              </Button>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Перейти к разделу о нас"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") scrollToAbout()
            }}
          >
            <ChevronDown className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-green-600 flex-shrink-0 bg-gray-800 flex items-center justify-center">
                <span className="text-8xl">⛏️</span>
              </div>
              <div className="space-y-4 text-center md:text-left px-4 md:px-0">
                <h2 className="text-3xl font-bold font-heading">О магазине</h2>
                <div className="space-y-4 max-w-2xl">
                  <p className="text-gray-300">
                    CraftStore — официальный донат-магазин нашего Minecraft-сервера. Здесь вы найдёте всё для того, чтобы сделать игру ещё круче и интереснее.
                  </p>
                  <p className="text-gray-300">
                    Каждая покупка поддерживает развитие сервера: новые карты, ивенты, улучшение инфраструктуры. Вы помогаете нам делать лучший Minecraft-опыт для всего сообщества.
                  </p>
                  <p className="text-gray-300">
                    Моментальная выдача товаров, безопасная оплата, поддержка 24/7. Если что-то пошло не так — напишите нам, разберёмся быстро.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                  <Button
                    onClick={scrollToContact}
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-white border-green-500 hover:bg-green-500 hover:text-black transition-colors w-[160px] mx-auto sm:mx-0"
                  >
                    Написать нам
                  </Button>
                  <Button
                    onClick={openChatbot}
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[160px] mx-auto sm:mx-0 flex items-center justify-center"
                  >
                    <Icon name="Bot" size={16} className="mr-1" />
                    Помощник
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services / Products Section */}
      <section ref={servicesSectionRef} id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Что можно купить
          </h2>
          <div
            ref={servicesContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Привилегии */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700 border border-transparent hover:border-green-600">
                <div className="flex items-center mb-4">
                  <Icon name="Crown" size={28} className="text-yellow-400 mr-4" />
                  <h3 className="text-xl font-semibold font-heading">Привилегии</h3>
                </div>
                <p className="text-gray-300">
                  VIP, Premium, Elite — уникальные префиксы, расширенные возможности, приоритетный вход на сервер и эксклюзивные команды.
                </p>
              </div>

              {/* Кейсы */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700 border border-transparent hover:border-green-600">
                <div className="flex items-center mb-4">
                  <Icon name="Package" size={28} className="text-blue-400 mr-4" />
                  <h3 className="text-xl font-semibold font-heading">Кейсы и наборы</h3>
                </div>
                <p className="text-gray-300">
                  Случайные наборы с редкими предметами, броней и оружием. Открывай и удивляй — каждый кейс содержит что-то особенное.
                </p>
              </div>

              {/* Игровая валюта */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700 border border-transparent hover:border-green-600">
                <div className="flex items-center mb-4">
                  <Icon name="Coins" size={28} className="text-green-400 mr-4" />
                  <h3 className="text-xl font-semibold font-heading">Игровая валюта</h3>
                </div>
                <p className="text-gray-300">
                  Пополни баланс игровых монет для покупок на аукционе и у других игроков. Лучший курс — только в нашем магазине.
                </p>
              </div>

              {/* Стартовые наборы */}
              <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700 border border-transparent hover:border-green-600">
                <div className="flex items-center mb-4">
                  <Icon name="Sword" fallback="Zap" size={28} className="text-purple-400 mr-4" />
                  <h3 className="text-xl font-semibold font-heading">Стартовые наборы</h3>
                </div>
                <p className="text-gray-300">
                  Готовые наборы предметов для быстрого старта: инструменты, еда, ресурсы и зелья. Начни игру с преимуществом!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactSectionRef} id="contact" className="bg-gray-950 py-16">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className={cn(
              "mb-4 text-center text-3xl font-bold font-heading text-white transition-all duration-1000 ease-out",
              isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Связаться с нами
          </h2>
          <p className="text-center text-gray-400 mb-12">Проблема с заказом или есть вопросы? Напишите — ответим быстро.</p>
          <ContactForm />
        </div>
      </section>

      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  )
}