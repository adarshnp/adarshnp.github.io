import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'

const CHANNEL_URL = 'https://www.youtube.com/@citybreathsgaming'

// A few favourite Shorts from the channel.
const VIDEOS = [
  { id: 'PDYywKXfstE', title: 'Night Cinematic – Tourist District' },
  { id: 'S_e4va0oxmk', title: 'Shallow Water Equals Angry Ferries' },
  { id: 'j1cn2l5H9Jc', title: 'The Canal That Feeds Life into the Lake' },
  { id: 'ZqOwg589EpI', title: 'Tram & Metro Transit Junction' },
]

const GAMES = ['Cities: Skylines', 'Valheim', 'The Sims', 'Tiny Glade']

// Shows a thumbnail until clicked, then swaps in the YouTube player,
// so nothing from YouTube loads unless the visitor asks for it.
function Short({ video }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="short">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="short-poster" onClick={() => setPlaying(true)} aria-label={`Play “${video.title}”`}>
          <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="short-play" aria-hidden="true"><i className="bi bi-play-fill" /></span>
          <span className="short-title">{video.title}</span>
        </button>
      )}
    </div>
  )
}

export default function Gaming() {
  return (
    <section id="gaming" className="section gaming">
      <div className="container gaming-grid">
        <div>
          <SectionTitle kicker="Beyond work" title="Gaming">
            When I&apos;m not building games, I&apos;m playing them. I run <strong>City Breaths</strong>, a YouTube
            channel of relaxed, aesthetic short-form city builds — mostly Cities: Skylines, plus other building
            games like Valheim, The Sims and Tiny Glade.
          </SectionTitle>

          <ul className="chips" aria-label="Games on the channel" data-reveal>
            {GAMES.map((g) => <li className="chip" key={g}>{g}</li>)}
          </ul>

          <div className="gaming-actions" data-reveal>
            <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
              <i className="bi bi-youtube" /> Watch on YouTube
            </a>
            <a href={`${CHANNEL_URL}?sub_confirmation=1`} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Subscribe
            </a>
          </div>
        </div>

        <div className="shorts" data-reveal>
          {VIDEOS.map((v) => <Short video={v} key={v.id} />)}
        </div>
      </div>
    </section>
  )
}
