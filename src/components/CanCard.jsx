import './CanCard.css'

/**
 * One card for one can in the collection.
 * Shows a small cropped thumbnail by default; tapping the card
 * switches the same image to its full, uncropped proportions so
 * you can check it against the real can. The card stays the same
 * size on the grid — only the photo's crop changes. The collection
 * itself is still edited in src/data/cans.js, not through the UI.
 *
 * Props:
 *  - name: string — the can's name (required)
 *  - flavor: string — optional subtitle/flavor note
 *  - image: string — path or url for the can photo
 *  - collected: boolean — whether you actually have this one
 *  - expanded: boolean — whether this card is showing the uncropped photo
 *  - onToggle: () => void — call when the card is tapped/activated
 */
export default function CanCard({ name, flavor, image, collected, expanded, onToggle }) {
  return (
    <div
      className={`can-card ${collected ? 'is-collected' : 'is-missing'} ${expanded ? 'is-expanded' : ''}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <div className="can-card__photo">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div className="can-card__photo-empty" aria-hidden="true">
            <span>NO PHOTO</span>
          </div>
        )}
        {collected && <div className="can-card__stamp">COLLECTED</div>}
      </div>

      <div className="can-card__body">
        <h3 className="can-card__name">{name}</h3>
        {flavor && <p className="can-card__flavor">{flavor}</p>}
      </div>
    </div>
  )
}
