import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { LuMail } from 'react-icons/lu'
import { profile } from '../data/portfolio'

const map = [
  { key: 'github', label: 'GitHub', Icon: FaGithub },
  { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'leetcode', label: 'LeetCode', Icon: SiLeetcode },
  { key: 'twitter', label: 'X / Twitter', Icon: FaXTwitter },
]

export default function Socials({ className = '', withEmail = true }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {map
        .filter((s) => profile.socials[s.key])
        .map(({ key, label, Icon }) => (
          <a key={key} href={profile.socials[key]} target="_blank" rel="noreferrer" aria-label={label} className="icon-btn">
            <Icon />
          </a>
        ))}
      {withEmail && (
        <a href={`mailto:${profile.email}`} aria-label="Email" className="icon-btn">
          <LuMail />
        </a>
      )}
    </div>
  )
}
