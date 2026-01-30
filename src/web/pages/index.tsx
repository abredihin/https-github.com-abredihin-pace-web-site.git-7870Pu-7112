import { useState, useEffect, createContext, useContext } from "react";

// Translations
const translations = {
  en: {
    heroTitle: "Improve your Pace",
    heroSubtitle: "We know this chaos: Strava screenshots, Excel plans, race sites everywhere.",
    heroDescription: "Everything for running in one app.",
    heroCTA: "Join waitlist",
    whyTitle: "Why Pace exists",
    whyBody: "Today you post every run to Strava to keep a history and check how friends train, but Strava doesn't answer the question:",
    whyQuestion: "\"What should I do next after this run?\"",
    whyAdditional: "It's a great log, but it isn't adaptive.",
    whyMore: "Your races are saved from random websites, your plan sits in a spreadsheet, and your coach gets screenshots in chat.",
    whySolution: "Pace is an early product that wants to fix this by putting adaptive plans, races and coaches into one app, so your running doesn't feel scattered across five tools.",
    solutionTitle1: "Improve your Pace.",
    solutionTitle2: "And your pace.",
    solutionSubtitle: "Three ways Pace brings your running together",
    adaptivePlans: "Adaptive Plans",
    adaptivePlansText: "Missed a week? Classic plans ignore it. Pace rebuilds your week around real life.",
    raceCalendar: "Race Calendar",
    raceCalendarText: "One place for all races. No more searching on random websites.",
    coachPlatform: "Coach Platform",
    coachPlatformText: "Coach sees everything in Pace. No screenshots needed. Coach sets training week directly in app.",
    seeHowItWorks: "See how it works",
    mvpTitle: "We start simple",
    mvpBody: "Pace is early in development. The vision is one home for plans, races and coaches in a single app. The first step:",
    mvpHighlight: "adaptive plans",
    mvpBodyEnd: "that understand when life happens.",
    mvpResearch: "We want to build the best running home, so we are running a short research study. Your experience as a runner can directly shape how Pace works for everyone. Take a quick survey to share your story:",
    mvpSurveyPrimary: "Take the survey in English",
    mvpSurveySecondary: "Questionário",
    mvpNote: "Early testers shape the full running home.",
    ctaTitle: "Start your Pace journey",
    ctaBody: "Join waitlist to test app and help us to build the running app you'd wish to have",
    ctaTeam: "",
    emailLabel: "Email *",
    emailPlaceholder: "your@email.com",
    whatsappLabel: "WhatsApp (optional)",
    whatsappPlaceholder: "+1 234 567 8900",
    consentText: "Early access updates about Pace.",
    joinTeamLabel: "I'd like to join the team",
    helpWithPlaceholder: "i can help with..",
    submitButton: "Join waitlist",
    submitting: "Joining...",
    successTitle: "You're on the list!",
    successMessage: "We'll be in touch soon.",
    footerTagline: "Everything for running in one app.",
    footerRights: "All rights reserved.",
  },
  ptbr: {
    heroTitle: "Melhore seu Pace",
    heroSubtitle: "Sabemos desse caos: screenshots do Strava, planos no Excel, sites de corrida por toda parte.",
    heroDescription: "Tudo para correr em um único app.",
    heroCTA: "Junte-se à lista de espera",
    whyTitle: "Por que Pace existe",
    whyBody: "Hoje você publica cada corrida no Strava para manter um histórico e verificar como amigos treinam, mas o Strava não responde a pergunta:",
    whyQuestion: "\"O que devo fazer após essa corrida?\"",
    whyAdditional: "É um ótimo registro, mas não é adaptativo.",
    whyMore: "Suas provas são salvas em sites aleatórios, seu plano fica em uma planilha e seu treinador recebe screenshots no chat.",
    whySolution: "Pace é um produto em desenvolvimento que quer corrigir isso colocando planos adaptativos, provas e treinadores em um único app, para que seu treino não se sinta espalhado em cinco ferramentas.",
    solutionTitle1: "Melhore seu Pace.",
    solutionTitle2: "E seu ritmo.",
    solutionSubtitle: "Três formas de unir sua corrida",
    adaptivePlans: "Planos Adaptativos",
    adaptivePlansText: "Perdeu uma semana? Planos clássicos ignoram. Pace reconstrói sua semana em torno da vida real.",
    raceCalendar: "Calendário de Provas",
    raceCalendarText: "Um lugar para todas as provas. Sem mais buscas em sites aleatórios.",
    coachPlatform: "Plataforma para Treinadores",
    coachPlatformText: "O treinador vê tudo no Pace. Sem screenshots. O treinador define o treino diretamente no app.",
    seeHowItWorks: "Veja como funciona",
    mvpTitle: "Começamos simples",
    mvpBody: "Pace está em desenvolvimento inicial. A visão é uma casa para planos, provas e treinadores em um único app. O primeiro passo:",
    mvpHighlight: "planos adaptativos",
    mvpBodyEnd: "que entendem quando a vida acontece.",
    mvpResearch: "Queremos criar a melhor casa para corredores, por isso estamos fazendo uma pesquisa rápida. A sua experiência de corrida pode influenciar diretamente como o Pace funciona para todo mundo. Responda a um questionário curto e conte a sua história:",
    mvpSurveyPrimary: "Questionário",
    mvpSurveySecondary: "Survey",
    mvpNote: "Testadores iniciais moldam a casa completa para corredores.",
    ctaTitle: "Comece sua jornada Pace",
    ctaBody: "Entre na lista de espera para testar o app ou Ajude a construir o app de corrida que você gostaria de ter.",
    ctaTeam: "",
    emailLabel: "Email *",
    emailPlaceholder: "seu@email.com",
    whatsappLabel: "WhatsApp (opcional)",
    whatsappPlaceholder: "+55 11 99999 9999",
    consentText: "Atualizações de acesso antecipado sobre Pace.",
    joinTeamLabel: "Gostaria de fazer parte do time",
    helpWithPlaceholder: "posso ajudar com..",
    submitButton: "Junte-se à lista",
    submitting: "Entrando...",
    successTitle: "Você está na lista!",
    successMessage: "Entraremos em contato em breve.",
    footerTagline: "Tudo para correr em um único app.",
    footerRights: "Todos os direitos reservados.",
  },
};

type Language = "en" | "ptbr";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

const useLanguage = () => useContext(LanguageContext);

// Language Switcher Component
const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = (newLang: Language) => {
    if (newLang === lang) return;
    setIsChanging(true);
    setTimeout(() => {
      setLang(newLang);
      setIsChanging(false);
    }, 150);
  };

  return (
    <div
      className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-[20px] border border-white/30 bg-white/10 p-2.5 shadow-lg backdrop-blur-xl sm:right-6 sm:top-6"
      role="group"
      aria-label="Language selector"
    >
      <button
        onClick={() => handleChange("ptbr")}
        onKeyDown={(e) => e.key === "Enter" && handleChange("ptbr")}
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-all duration-300 ${
          lang === "ptbr"
            ? "scale-105 border border-[#0080FF] bg-[rgba(0,128,255,0.4)]"
            : "bg-white/5 opacity-60 hover:scale-105 hover:bg-[rgba(0,128,255,0.4)] hover:opacity-100"
        }`}
        aria-label="Português (Brasil)"
        aria-pressed={lang === "ptbr"}
      >
        🇧🇷
      </button>
      <button
        onClick={() => handleChange("en")}
        onKeyDown={(e) => e.key === "Enter" && handleChange("en")}
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-all duration-300 ${
          lang === "en"
            ? "scale-105 border border-[#0080FF] bg-[rgba(0,128,255,0.4)]"
            : "bg-white/5 opacity-60 hover:scale-105 hover:bg-[rgba(0,128,255,0.4)] hover:opacity-100"
        }`}
        aria-label="English"
        aria-pressed={lang === "en"}
      >
        🇬🇧
      </button>
    </div>
  );
};

// Hero Section with video background
const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center video-background"
        src="./user-video-4.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="hero-title mb-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl lang-transition">
          {t.heroTitle}
        </h1>
        <p className="hero-subtitle mb-4 max-w-2xl text-lg text-white/80 sm:text-xl md:text-2xl lang-transition">
          {t.heroSubtitle}
        </p>
        <p className="hero-body mb-10 text-base text-white/60 sm:text-lg md:text-xl lang-transition">
          {t.heroDescription}
        </p>
        <a
          href="#form"
          className="hero-cta group relative overflow-hidden rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all hover:border-[#007AFF]/50 hover:bg-[#007AFF]/30 hover:shadow-lg hover:shadow-[#007AFF]/20 sm:px-10 sm:py-5 sm:text-xl lang-transition"
        >
          <span className="relative z-10">{t.heroCTA}</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
        </a>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 rounded-full border-2 border-white/40">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-white/60 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

// Why Pace Section
const WhyPaceSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen w-full overflow-hidden py-24">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center video-background"
        src="./qs44lu51b6.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Content with glassmorphism */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-6">
        <div className="rounded-[20px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl sm:p-12 md:p-16">
          <h2 className="section-title mb-10 text-4xl font-semibold tracking-tight text-[#343232] sm:text-5xl md:text-6xl lang-transition">
            {t.whyTitle}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-[#343232]/90 sm:text-xl md:text-2xl">
            <p className="lang-transition">
              {t.whyBody} <span className="font-semibold text-[#4b9fff]">{t.whyQuestion}</span>
            </p>
            <p className="text-[#343232] lang-transition">
              {t.whyAdditional}
            </p>
            <p className="lang-transition">
              {t.whyMore}
            </p>
            <p className="pt-4 text-[#343232] lang-transition">
              <strong>Pace</strong> {t.whySolution.replace("Pace ", "")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Solution Section - Feature with video
interface FeatureProps {
  title: string;
  text: string;
  videoSrc: string;
  reverse?: boolean;
}

const FeatureBlock = ({ title, text, videoSrc, reverse }: FeatureProps) => {
  return (
    <div className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${reverse ? "lg:flex-row-reverse" : ""}`}>
      {/* Video */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-2xl lg:w-1/2">
        <video
          className="h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>
      
      {/* Text */}
      <div className="flex flex-col lg:w-1/2">
        <h3 className="mb-4 text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl lang-transition">
          {title}
        </h3>
        <p className="text-lg leading-relaxed text-slate-600 sm:text-xl lang-transition">
          {text}
        </p>
      </div>
    </div>
  );
};

const SolutionSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      title: t.adaptivePlans,
      text: t.adaptivePlansText,
      videoSrc: "./2nqkbf2npz.mp4",
    },
    {
      title: t.raceCalendar,
      text: t.raceCalendarText,
      videoSrc: "./5ek2ofn3m5.mp4",
    },
    {
      title: t.coachPlatform,
      text: t.coachPlatformText,
      videoSrc: "./nolgvg0yag.mp4",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#F6F8FF] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="section-title mb-6 text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lang-transition">
          {t.solutionTitle1}
          <br />
          <span className="text-[#007AFF]">{t.solutionTitle2}</span>
        </h2>
        <p className="mx-auto mb-20 max-w-2xl text-center text-lg text-slate-600 sm:text-xl lang-transition">
          {t.solutionSubtitle}
        </p>
        
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <FeatureBlock
              key={feature.title}
              {...feature}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
          <a
            href="#form"
            className="group relative overflow-hidden rounded-full border-2 border-[#007AFF] bg-transparent px-8 py-4 text-lg font-semibold text-[#007AFF] transition-all hover:bg-[#007AFF] hover:text-white sm:px-10 sm:py-5 sm:text-xl lang-transition"
          >
            <span className="relative z-10">{t.seeHowItWorks}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// MVP Section
const MVPSection = () => {
  const { t, lang } = useLanguage();
  
  return (
    <section className="relative min-h-screen w-full overflow-hidden py-24">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center video-background"
        src="./2nqkbf2npz.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl sm:p-16 md:p-20">
          <h2 className="section-title mb-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lang-transition">
            {t.mvpTitle}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/80 sm:text-xl md:text-2xl lang-transition">
            {t.mvpBody} <span className="text-[#007AFF]">{t.mvpHighlight}</span> {t.mvpBodyEnd}
          </p>
          <p className="mb-8 text-lg leading-relaxed text-white/80 sm:text-xl lang-transition">
            {t.mvpResearch}
          </p>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={lang === "en" ? "https://tally.so/r/OD1XrM" : "https://tally.so/r/wMkrKY"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-md transition-all hover:border-[#007AFF]/50 hover:bg-[#007AFF]/30 hover:shadow-lg sm:px-8 sm:py-4 sm:text-lg"
            >
              {t.mvpSurveyPrimary}
            </a>
            <a
              href={lang === "en" ? "https://tally.so/r/wMkrKY" : "https://tally.so/r/OD1XrM"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white/70 backdrop-blur-md transition-all hover:border-[#007AFF]/50 hover:bg-[#007AFF]/20 hover:text-white hover:shadow-lg sm:px-8 sm:py-4 sm:text-lg"
            >
              {t.mvpSurveySecondary}
            </a>
          </div>
          <p className="text-base italic text-white/60 sm:text-lg lang-transition">
            {t.mvpNote}
          </p>
        </div>
      </div>
    </section>
  );
};

// CTA / Form Section
const CTASection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [wantsToJoinTeam, setWantsToJoinTeam] = useState(false);
  const [helpWith, setHelpWith] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate submission - in real app, would include wantsToJoinTeam and helpWith in the data
    console.log({ email, whatsapp, wantsToJoinTeam, helpWith });
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="form" className="relative min-h-screen w-full overflow-hidden py-24">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center video-background"
        src="./nolgvg0yag.mp4"
        autoPlay
        muted
        loop
        playsInline
        ref={(el) => { if (el) el.volume = 0; }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12 md:p-16">
          <h2 className="section-title mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lang-transition">
            {t.ctaTitle}
          </h2>
          <p className="mb-10 text-base text-white/70 sm:text-lg md:text-xl lang-transition">
            {t.ctaBody}
          </p>
          
          {isSubmitted ? (
            <div className="py-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xl text-white lang-transition">{t.successTitle}</p>
              <p className="mt-2 text-white/60 lang-transition">{t.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80 lang-transition">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-white/40 outline-none transition-all focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/30"
                />
              </div>
              
              <div className="text-left">
                <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-white/80 lang-transition">
                  {t.whatsappLabel}
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder={t.whatsappPlaceholder}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-white/40 outline-none transition-all focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/30"
                />
              </div>
              
              {/* Join Team Checkbox with slide-down input */}
              <div className="text-left">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="joinTeam"
                    checked={wantsToJoinTeam}
                    onChange={(e) => setWantsToJoinTeam(e.target.checked)}
                    className="h-5 w-5 cursor-pointer rounded border-white/20 bg-white/10 text-[#007AFF] focus:ring-[#007AFF]/30 focus:ring-offset-0"
                  />
                  <label htmlFor="joinTeam" className="cursor-pointer text-sm text-white/80 lang-transition">
                    {t.joinTeamLabel}
                  </label>
                </div>
                
                {/* Slide-down input field */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    wantsToJoinTeam ? "mt-4 max-h-20 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <input
                    type="text"
                    id="helpWith"
                    value={helpWith}
                    onChange={(e) => setHelpWith(e.target.value)}
                    placeholder={t.helpWithPlaceholder}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder-white/40 outline-none transition-all focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/30"
                  />
                </div>
              </div>
              
              <p className="text-xs text-white/50 lang-transition">
                {t.consentText}
              </p>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-xl bg-[#007AFF] px-8 py-5 text-lg font-semibold text-white transition-all hover:bg-[#0066DD] hover:shadow-lg hover:shadow-[#007AFF]/30 disabled:cursor-not-allowed disabled:opacity-60 lang-transition"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t.submitting}
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">{t.submitButton}</span>
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="relative w-full bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-lg font-semibold tracking-tight text-white">
          PACE
        </p>
        <p className="mt-2 text-sm text-white/40 lang-transition">
          {t.footerTagline}
        </p>
        <p className="mt-6 text-xs text-white/30 lang-transition">
          © {new Date().getFullYear()} Pace. {t.footerRights}
        </p>
      </div>
    </footer>
  );
};

// Main Page Component
function Index() {
  const [lang, setLang] = useState<Language>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem("paceLanguage") as Language | null;
    if (savedLang && (savedLang === "en" || savedLang === "ptbr")) {
      setLang(savedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith("pt")) {
        setLang("ptbr");
      }
    }
    setIsLoaded(true);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("paceLanguage", newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      <main className={`pace-landing ${isLoaded ? "loaded" : ""}`}>
        <LanguageSwitcher />
        <HeroSection />
        <WhyPaceSection />
        <SolutionSection />
        <MVPSection />
        <CTASection />
        <Footer />
        
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
          
          .pace-landing {
            font-family: 'Inter', sans-serif;
            scroll-behavior: smooth;
          }
          
          .pace-landing h1,
          .pace-landing h2,
          .pace-landing h3,
          .hero-title,
          .section-title {
            font-family: 'Montserrat', sans-serif;
          }
          
          /* Language transition animation */
          .lang-transition {
            transition: opacity 0.3s ease;
          }
          
          /* Entrance animations */
          .hero-title {
            animation: fadeInUp 1s ease-out 0.2s both;
          }
          
          .hero-subtitle {
            animation: fadeInUp 1s ease-out 0.4s both;
          }
          
          .hero-body {
            animation: fadeInUp 1s ease-out 0.6s both;
          }
          
          .hero-cta {
            animation: fadeInUp 1s ease-out 0.8s both;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Video color grading overlay - cinematic cool tones */
          video {
            filter: contrast(1.05) saturate(0.9) brightness(0.95);
          }
        `}</style>
      </main>
    </LanguageContext.Provider>
  );
}

export default Index;
