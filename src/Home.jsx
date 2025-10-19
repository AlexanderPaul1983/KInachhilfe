import { useNavigate } from 'react-router-dom'
import './Home.css'

export function Home() {
  const navigate = useNavigate()

  const goToLesson = () => navigate('/starter')

  return (
    <div className="landing-wrapper">
      <div className="landing-frame">
        <header className="landing-header">
          <div className="brand">
            <img src="/icon/Logo_nachhilfeKI.png" alt="Nachhilfe KI Logo" />
          </div>
          <nav className="landing-nav">
            <span className="nav-link active">Home</span>
            <span className="nav-link">Fächer</span>
            <span className="nav-link">Info</span>
          </nav>
          <button className="login-button" type="button">Login</button>
        </header>

        <main className="landing-main">
          <section className="hero-left">
            <button className="cta-button" type="button" onClick={goToLesson}>
              Zum Unterricht <span aria-hidden>→</span>
            </button>
            <figure className="hero-image">
              <img
                src="/images/roboter_hand.jpg"
                alt="Industrieroboter in einem hellen Labor"
              />
              <figcaption>
                <strong>KI IST LEBENDIGER ALS</strong>
                <span>man denkt!</span>
              </figcaption>
            </figure>
          </section>

          <section className="hero-right">
            <h2 className="headline">LERNEN MIT KI</h2>
            <div className="info-columns">
              <article>
                <h3>Ablauf</h3>
                <p>
                  Unser KI-Tutor führt dich Schritt für Schritt durch dein Wunschthema.
                  Kurze Lektionen, schnelle Rückfragen und direkte Übungen halten dich am Ball.
                </p>
              </article>
              <article>
                <h3>Vorteile</h3>
                <p>
                  Passe Tempo und Tiefe flexibel an, erhalte sofort Feedback und lerne mit
                  Beispielen, die zu deinem Alltag passen. So bleibt jedes Thema greifbar.
                </p>
              </article>
            </div>
            <div className="contact-card">
              <img className="bot-avatar" src="/images/roboter.png" alt="Chatbot Icon" />
              <button className="question-button" type="button" onClick={goToLesson}>
                Fragen?
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
