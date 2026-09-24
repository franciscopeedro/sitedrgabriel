'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, type Variants } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Camera, ChevronRight, Menu, MessageCircle, MoveHorizontal, X } from 'lucide-react'

const logo = '/images/logo-official.png'
const heroPhoto = '/images/hero-seated.png'
const aboutPhoto = '/images/about-close.png'
const clinicalBefore = '/images/case-before.png'
const clinicalAfter = '/images/case-after.png'
const tuxedoPhoto = '/images/doctor-tuxedo.png'
const whatsapp = (message = 'Olá, Dr. Gabriel! Conheci seu trabalho pelo site e gostaria de agendar uma consulta.') => `https://wa.me/5585996592083?text=${encodeURIComponent(message)}`
const instagram = 'https://www.instagram.com/dr.gabrielsantos__/'
const principles = ['Empatia', 'Ética', 'Atualização constante', 'Atenção aos detalhes']
const services = [
  ['01', 'Restaurações', 'Procedimentos voltados à recuperação da estrutura e da função do dente, com atenção à estética e às características individuais de cada sorriso.', '/images/service-restorations.png', 'restorations'],
  ['02', 'Clareamento dental', 'Uma opção para quem deseja melhorar a tonalidade do sorriso por meio de avaliação e planejamento individualizados.', '/images/service-whitening.png', 'whitening'],
  ['03', 'Limpeza dental', 'Cuidado preventivo para auxiliar na manutenção da saúde bucal e na remoção de placa e depósitos acumulados.', '/images/service-cleaning.png', 'cleaning'],
  ['04', 'Cirurgias simples', 'Procedimentos cirúrgicos odontológicos realizados a partir de avaliação individual e planejamento adequado para cada caso.', '/images/service-surgery.png', 'surgery'],
  ['05', 'Cirurgia de 3º molar', 'Avaliação e abordagem individualizada para casos que envolvem terceiros molares, de acordo com a necessidade de cada paciente.', '/images/service-wisdom-tooth.png', 'wisdom-tooth'],
  ['06', 'Tratamento de canal', 'Tratamento indicado em situações específicas envolvendo a parte interna do dente, sempre a partir de avaliação clínica individual.', '/images/service-root-canal.png', 'root-canal'],
]
const articles = [['Saúde bucal', 'Pequenos cuidados, grandes diferenças.'], ['Prevenção', 'Informação para cuidar melhor do seu sorriso.'], ['Cuidado', 'Uma odontologia feita de presença e atenção.']]
const ease = [0.22, 1, 0.36, 1] as const
const reveal = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease } } }
const leftReveal = { hidden: { opacity: 0, x: -25 }, show: { opacity: 1, x: 0, transition: { duration: .8, ease } } }
const rightReveal = { hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: .9, ease } } }
const viewport = { once: true, amount: .2 }

function Reveal({ children, className = '', variants = reveal, delay = 0 }: { children: React.ReactNode; className?: string; variants?: Variants; delay?: number }) { return <motion.div className={className} variants={variants} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay }}>{children}</motion.div> }
function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) { return <span className="line-mask"><motion.span variants={reveal} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay }}>{children}</motion.span></span> }
function Photo({ label, className = '', src }: { label: string; className?: string; src?: string }) { return src ? <div className={`photo-placeholder photo-real ${className}`} role="img" aria-label={label} style={{ backgroundImage: `url(${src})` }} /> : <div className={`photo-placeholder ${className}`} role="img" aria-label={label}><span>Fotografia editorial</span></div> }
function Stagger({ items }: { items: string[] }) { return <div className="principle-grid">{items.map((item, i) => <motion.div key={item} variants={reveal} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay: i * .09 }}><span>0{i + 1}</span>{item}</motion.div>)}</div> }

function BrandLogo({ tone = 'responsive', className = '' }: { tone?: 'responsive' | 'ivory' | 'petrol'; className?: string }) {
  if (tone === 'ivory') return <img className={`brand-logo brand-logo-ivory ${className}`} src="/images/logo-ivory.png" alt="Logo Dr. Gabriel Santos" />
  if (tone === 'petrol') return <img className={`brand-logo brand-logo-petrol ${className}`} src="/images/logo-petrol.png" alt="Logo Dr. Gabriel Santos" />
  return <><img className={`logo logo-petrol ${className}`} src="/images/logo-petrol.png" alt="Monograma GS do Dr. Gabriel Santos" /><img className={`logo logo-ivory ${className}`} src="/images/logo-ivory.png" alt="" aria-hidden="true" /></>
}

function useHeaderTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    if (!hero) return
    const updateTheme = () => {
      const headerHeight = window.innerWidth <= 800 ? 75 : 90
      setTheme(hero.getBoundingClientRect().bottom > headerHeight ? 'light' : 'dark')
      setScrolled(window.scrollY > 12)
    }
    updateTheme()
    window.addEventListener('scroll', updateTheme, { passive: true })
    window.addEventListener('resize', updateTheme)
    return () => { window.removeEventListener('scroll', updateTheme); window.removeEventListener('resize', updateTheme) }
  }, [])

  return { theme, scrolled }
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [position, setPosition] = useState(50)
  const { theme, scrolled } = useHeaderTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: .001 })
  return <main>
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <section className="hero" id="inicio">
      <header className={`nav-wrap nav-${theme}${scrolled ? ' is-scrolled' : ''}`}><a href="#inicio" className="brand" aria-label="Dr. Gabriel Santos, início"><BrandLogo /></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button><nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a><a href="#cuidados" onClick={() => setMenuOpen(false)}>Cuidados</a><a href="#resultado" onClick={() => setMenuOpen(false)}>Resultados</a><a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></nav><a className="button button-light nav-cta" href={whatsapp()} target="_blank" rel="noopener noreferrer"><CalendarDays size={16} /> Agendar consulta</a></header>
      <div className="hero-content shell"><div className="hero-copy"><Reveal><p className="eyebrow">CIRURGIÃO-DENTISTA <span /> CRO-CE 18583</p></Reveal><h1><LineReveal>Odontologia com cuidado,</LineReveal> <LineReveal delay={.2}><em>precisão e propósito.</em></LineReveal></h1><Reveal delay={.2}><p className="hero-description">Atendimento odontológico personalizado, com atenção aos detalhes, respeito à individualidade e cuidado em cada etapa.</p></Reveal><Reveal delay={.3}><div className="hero-actions"><a className="button button-light" href={whatsapp()} target="_blank" rel="noopener noreferrer">Agendar consulta <ArrowUpRight size={17} /></a><a className="text-link" href="#sobre">Conheça meu trabalho <ChevronRight size={16} /></a></div></Reveal></div><Reveal className="hero-image-wrap" variants={rightReveal}><Photo label="Dr. Gabriel Santos sentado na poltrona, sorrindo" className="hero-photo" src={heroPhoto} /><div className="hero-caption">Cuidado individual<br /><strong>em cada detalhe.</strong></div></Reveal></div><div className="scroll-note">ROLE PARA EXPLORAR <span /></div>
    </section>
    <section className="credibility shell">{[['01', 'CRO-CE 18583', 'Registro profissional'], ['02', 'Universidade Christus', 'Formação'], ['03', 'Fortaleza - CE', 'Atendimento'], ['04', 'Atendimento', 'Personalizado e humanizado']].map(([n, title, text], i) => <motion.div className="cred-item" key={n} variants={reveal} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay: i * .1 }}><span>{n}</span><div><strong>{title}</strong><p>{text}</p></div></motion.div>)}</section>
    <section className="section about" id="sobre"><div className="shell split"><Reveal className="about-photo-wrap" variants={rightReveal}><Photo label="Dr. Gabriel Santos em camisa polo branca" className="about-photo photo-about" src={aboutPhoto} /></Reveal><div className="section-copy"><Reveal><p className="eyebrow dark">SOBRE O PROFISSIONAL</p></Reveal><h2><LineReveal>Dr. Gabriel Santos</LineReveal><LineReveal delay={.12}><em>cuidar de cada sorriso como único.</em></LineReveal></h2><Reveal delay={.2}><p>Cirurgião-Dentista formado pela Universidade Christus, Dr. Gabriel Santos acredita que a odontologia vai além do cuidado com os dentes.</p><p>Seu trabalho é guiado pela escuta, pelo acolhimento e pela atenção aos detalhes, respeitando as características e necessidades de cada paciente.</p><div className="signature">CRO-CE 18583 · FORTALEZA - CE</div></Reveal><Reveal delay={.25}><div className="principles"><p className="eyebrow dark">MINHA FORMA DE CUIDAR</p><Stagger items={principles} /></div></Reveal></div></div></section>
    <section className="section care-list" id="cuidados"><div className="shell"><Reveal><p className="eyebrow dark">CUIDADOS E TRATAMENTOS</p></Reveal><div className="heading-row"><h2><LineReveal>Cuidado pensado</LineReveal><LineReveal delay={.1}>para <em>cada sorriso.</em></LineReveal></h2><Reveal><p className="muted">Cada atendimento é planejado de forma individual, considerando as necessidades, características e objetivos de cada paciente.</p></Reveal></div><div className="care-grid">{services.map(([number, title, text, image, slug], i) => <motion.article className="care-card" key={number} variants={reveal} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay: i * .08 }}><div className={`care-art care-art-${slug}`} style={{ backgroundImage: `url(${image})` }} role="img" aria-label={`${title} — imagem ilustrativa`} /><p className="eyebrow dark">{number}</p><h3>{title}{title === 'Cirurgia de 3º molar' && <small>Siso</small>}</h3><p>{text}</p><a href={whatsapp(`Olá, Dr. Gabriel! Conheci seu trabalho pelo site e gostaria de saber mais sobre ${title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">Saiba mais <ChevronRight size={15} /></a></motion.article>)}</div><Reveal className="care-after"><h3>Não sabe qual cuidado é indicado para você?</h3><p>Uma avaliação individual permite compreender suas necessidades e orientar os próximos passos.</p><a className="button button-dark" href={whatsapp()} target="_blank" rel="noopener noreferrer">Agendar uma consulta <ArrowUpRight size={16} /></a></Reveal></div></section>
    <section className="section experience-steps"><div className="shell"><Reveal><p className="eyebrow dark">SUA EXPERIÊNCIA</p><h2><LineReveal>Cuidado em</LineReveal> <LineReveal delay={.1}><em>cada etapa.</em></LineReveal></h2><p className="muted">Uma experiência construída a partir da escuta, da atenção às necessidades individuais e de uma comunicação clara ao longo do atendimento.</p></Reveal><div className="steps-grid">{[['01','ESCUTA','Entender suas necessidades, expectativas e o que motivou sua busca por atendimento.'],['02','AVALIAÇÃO','Uma análise individual para compreender as particularidades de cada caso.'],['03','PLANEJAMENTO','Orientações claras e definição dos próximos passos de acordo com as necessidades identificadas.'],['04','ACOMPANHAMENTO','Cuidado e atenção ao longo das etapas do atendimento.']].map(([n,t,d],i)=><motion.div className="step-item" key={n} variants={reveal} initial="hidden" whileInView="show" viewport={viewport} transition={{delay:i*.1}}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></motion.div>)}</div></div></section>
    <section className="section care" id="experiencia"><div className="shell care-layout"><Reveal variants={leftReveal}><p className="eyebrow">A EXPERIÊNCIA DE CUIDAR</p><h2>Um atendimento que começa pela <em>confiança.</em></h2><p className="care-lead">Acredito que um atendimento de qualidade começa pela escuta, pela empatia e pelo respeito à individualidade de cada paciente.</p><p>Dedicação, estudo, ética, responsabilidade e atualização constante fazem parte do compromisso com um atendimento cuidadoso e humanizado.</p><p className="editorial-quote">Mais do que cuidar de dentes,<br />meu propósito é cuidar de pessoas.</p><a className="text-link light-link" href={instagram} target="_blank" rel="noopener noreferrer">Acompanhe meu trabalho <ArrowUpRight size={16} /></a></Reveal><Reveal className="mission-image" variants={rightReveal}><Photo label="Retrato editorial do Dr. Gabriel Santos" className="photo-tuxedo" src={tuxedoPhoto} /></Reveal></div></section>
    <section className="section results" id="resultado"><div className="shell"><div className="heading-row"><div><Reveal><p className="eyebrow dark">RESULTADOS</p></Reveal><h2><LineReveal>Harmonia é respeitar</LineReveal> <LineReveal delay={.12}><em>cada sorriso.</em></LineReveal></h2></div><Reveal><p className="muted">Harmonia não é padronizar. É respeitar cada sorriso e valorizar suas características únicas.</p></Reveal></div><Reveal className="before-after real-case"><div className="case-panel before-panel" style={{ backgroundImage: `url(${clinicalBefore})` }}></div><div className="case-panel after-panel" style={{ width: `${position}%`, backgroundImage: `url(${clinicalAfter})` }}></div><div className="divider" style={{ left: `${position}%` }}><span><MoveHorizontal size={16} /></span></div><input aria-label="Comparar antes e depois" type="range" min="2" max="98" value={position} onChange={(e) => setPosition(Number(e.target.value))} /></Reveal><p className="case-note">Cada caso possui características individuais.</p></div></section>
    <section className="contact" id="contato"><div className="shell contact-inner"><Reveal><p className="eyebrow">UM PRÓXIMO PASSO</p><h2><LineReveal>Seu sorriso merece</LineReveal><LineReveal delay={.1}><em>um cuidado individual.</em></LineReveal></h2><Reveal delay={.2}><p>Agende sua consulta e conheça uma abordagem baseada em escuta, planejamento, atenção e respeito às suas características.</p></Reveal><Reveal delay={.3}><a className="button button-light" href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Agendar pelo WhatsApp</a></Reveal></Reveal></div></section>
    <section className="content-section" id="conteudos"><div className="shell heading-row"><div><Reveal><p className="eyebrow dark">CONTEÚDOS</p></Reveal><h2><LineReveal>Informação também faz</LineReveal><LineReveal delay={.1}>parte do <em>cuidado.</em></LineReveal></h2></div><Reveal><a className="text-link dark-link" href={instagram} target="_blank" rel="noopener noreferrer">Acompanhar no Instagram <Camera size={16} /></a></Reveal></div><div className="shell content-grid">{articles.map(([cat, title], i) => <motion.article className="content-card" key={cat} variants={reveal} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay: i * .1 }}><div className={`content-art art-${i + 1}`} /><p className="eyebrow dark">{cat}</p><h3>{title}</h3><a href={instagram} target="_blank" rel="noopener noreferrer">Ver no Instagram <ChevronRight size={15} /></a></motion.article>)}</div></section>
    <section className="final-cta shell"><Reveal><p className="eyebrow dark">UM CUIDADO PARA VOCÊ</p><h2><LineReveal>Vamos cuidar</LineReveal><LineReveal delay={.1}>do seu <em>sorriso?</em></LineReveal></h2><Reveal delay={.2}><p>Entre em contato e agende sua consulta.</p></Reveal><Reveal delay={.3}><a className="button button-dark" href={whatsapp()} target="_blank" rel="noopener noreferrer">Agendar consulta <ArrowUpRight size={17} /></a></Reveal></Reveal></section>
    <footer id="footer"><div className="shell footer-top"><div><BrandLogo tone="ivory" className="footer-logo" /><p>Dr. Gabriel Santos<br />Cirurgião-Dentista<br /><span>CRO-CE 18583</span><br />Fortaleza - CE</p></div><div><p className="footer-label">NAVEGAÇÃO</p><a href="#inicio">Início</a><a href="#sobre">Sobre</a><a href="#cuidados">Cuidados</a><a href="#resultado">Resultados</a><a href="#conteudos">Conteúdos</a></div><div><p className="footer-label">CONTATO</p><a href={whatsapp()} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a></div><div><p className="footer-label">INSTAGRAM</p><a href={instagram} target="_blank" rel="noopener noreferrer">@dr.gabrielsantos__ <ArrowUpRight size={13} /></a></div></div><div className="shell footer-bottom"><span>© Dr. Gabriel Santos · CRO-CE 18583</span><span>Fortaleza - CE</span></div></footer>
  </main>
}
